import { RequestHandler, Router } from "express";
import { AnySchema, isError as isValidationError } from "joi";
import RequestHandlerError from "../error/RequestHandlerError";
import logger from "../util/logger";

export type RequestHandlerRequest<Query, Params, ReqBody> = {
  query: Query
  params: Params
  body: ReqBody
}

export type RequestHandlerResponse<ResBody> = {
  status: number
  body: ResBody
}

export type UseRequestHandlerConfig<
  Query,
  Params,
  ReqBody,
  ResBody,
> = {
  router: Router
  path?: string
  // noAuth?: boolean
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
  requestHandler: (req: RequestHandlerRequest<Query, Params, ReqBody>) =>
    Promise<RequestHandlerResponse<ResBody>> | RequestHandlerResponse<ResBody>
  querySchema?: AnySchema<Query>
  paramsSchema?: AnySchema<Params>
  bodySchema?: AnySchema<ReqBody>
}

export const useRequestHandler = <
  Query,
  Params,
  ReqBody,
  ResBody,
>({
  router,
  path,
  // noAuth,
  method,
  requestHandler,
  querySchema, paramsSchema, bodySchema,
}: UseRequestHandlerConfig<Query, Params, ReqBody, ResBody>
) => {
  type _ResBody = ResBody | { message: string } | { messages: string[] };
  const handler: RequestHandler<Params, _ResBody, ReqBody, Query, {}> = async (req, res) => {
    try {
      // validation
      const option = { abortEarly: false };
      await Promise.all([
        querySchema?.validateAsync(req.query, option),
        paramsSchema?.validateAsync(req.params, option),
        bodySchema?.validateAsync(req.body, option),
      ]);

      // request handler
      const response = await requestHandler({
        query: req.query,
        params: req.params,
        body: req.body,
      });

      // send response
      res.status(response.status).send(response.body);
    } catch (error) {
      if (error instanceof RequestHandlerError) {
        // handle RequestHandlerError
        res.status(error.statusCode).send({
          message: error.responseMessage,
        });
        logger.error(error.message);

      } else if (isValidationError(error)) {
        // handle validation error
        const messages = error.details.map(({ message }) => message);

        res.status(400).send({ messages });
        logger.error("Validation error: " + messages);

      } else {
        // handle unknown error
        res.status(500).send({
          message: "An unknown error has occurred.",
        });
        logger.error("unknown error: " + error);
      }
    }
  }

  // if (noAuth)
  //   router[method](path || "", handler)
  // else
  //   router[method](path || "", passport, handler as any)
  router[method](path || "", handler);
};

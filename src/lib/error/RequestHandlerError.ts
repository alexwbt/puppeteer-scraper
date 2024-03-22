
export default class RequestHandlerError implements Error {

  public name: string
  public message: string
  public statusCode: number
  public responseMessage: string

  constructor(statusCode: number, message: string, responseMessage?: string) {
      this.name = "RouterError"
      this.message = message
      this.statusCode = statusCode
      this.responseMessage = responseMessage || message
  }

}

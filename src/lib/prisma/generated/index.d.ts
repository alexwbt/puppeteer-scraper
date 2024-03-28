// This file was overwritten by prisma-json-types-generator
// Report any issues to https://github.com/arthurfiorette/prisma-json-types-generator

declare global {
  namespace PrismaJson {
    // This namespace will always be empty. Definitions should be done by
    // you manually, and merged automatically by typescript. Make sure that
    // your declaration merging file is included in your tsconfig.json
    //
    // Learn more: https://github.com/arthurfiorette/prisma-json-types-generator/issues/143
    // Declaration Merging: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
  }
}

/** A filter to be used against nullable List types. */
export type NullableListFilter<T> = {
  equals?: T | T[] | null;
  has?: T | null;
  hasEvery?: T[];
  hasSome?: T[];
  isEmpty?: boolean;
};

/** A type to determine how to update a json field */
export type UpdateInput<T> = T extends object
  ? { [P in keyof T]?: UpdateInput<T[P]> }
  : T;

/** A type to determine how to update a json[] field */
export type UpdateManyInput<T> = T | T[] | { set?: T[]; push?: T | T[] };

/** A type to determine how to create a json[] input */
export type CreateManyInput<T> = T | T[] | { set?: T[] };

/**
 * A typed version of NestedStringFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of StringFilter, allowing narrowing of string types to discriminated
 * unions.
 */
export type TypedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of NestedStringWithAggregatesFilter, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedNestedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of StringWithAggregatesFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringWithAggregatesFilter is not present, this type is not used
  Prisma.StringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableWithAggregatesFilter, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNestedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableWithAggregatesFilter, allowing narrowing of string
 * types to discriminated unions.
 */
export type TypedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.StringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringFieldUpdateOperationsInput, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.StringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.StringFieldUpdateOperationsInput & {
    set?: S;
  };

/**
 * A typed version of NullableStringFieldUpdateOperationsInput, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNullableStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.NullableStringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.NullableStringFieldUpdateOperationsInput & {
    set?: S | null;
  };

/**
 * A typed version of StringNullableListFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableListFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableListFilter is not present, this type is not used
  Prisma.StringNullableListFilter & {
    equals?: S[] | null;
    has?: S | null;
    hasEvery?: S[];
    hasSome?: S[];
  };

/**
 * A typed version of the input type to update a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type UpdateStringArrayInput<S extends string> = {
  set?: S[];
  push?: S | S[];
};

/**
 * A typed version of the input type to create a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type CreateStringArrayInput<S extends string> = {
  set?: S[];
};

/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Crawl
 * 
 */
export type Crawl = $Result.DefaultSelection<Prisma.$CrawlPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CrawlState: {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR'
};

export type CrawlState = (typeof CrawlState)[keyof typeof CrawlState]

}

export type CrawlState = $Enums.CrawlState

export const CrawlState: typeof $Enums.CrawlState

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Crawls
 * const crawls = await prisma.crawl.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Crawls
   * const crawls = await prisma.crawl.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.crawl`: Exposes CRUD operations for the **Crawl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Crawls
    * const crawls = await prisma.crawl.findMany()
    * ```
    */
  get crawl(): Prisma.CrawlDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.11.0
   * Query Engine version: efd2449663b3d73d637ea1fd226bafbcf45b3102
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Crawl: 'Crawl'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'crawl'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Crawl: {
        payload: Prisma.$CrawlPayload<ExtArgs>
        fields: Prisma.CrawlFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          findFirst: {
            args: Prisma.CrawlFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          findMany: {
            args: Prisma.CrawlFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>[]
          }
          create: {
            args: Prisma.CrawlCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          createMany: {
            args: Prisma.CrawlCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CrawlDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          update: {
            args: Prisma.CrawlUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          deleteMany: {
            args: Prisma.CrawlDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CrawlUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CrawlPayload>
          }
          aggregate: {
            args: Prisma.CrawlAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCrawl>
          }
          groupBy: {
            args: Prisma.CrawlGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CrawlGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlCountArgs<ExtArgs>,
            result: $Utils.Optional<CrawlCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Crawl
   */

  export type AggregateCrawl = {
    _count: CrawlCountAggregateOutputType | null
    _avg: CrawlAvgAggregateOutputType | null
    _sum: CrawlSumAggregateOutputType | null
    _min: CrawlMinAggregateOutputType | null
    _max: CrawlMaxAggregateOutputType | null
  }

  export type CrawlAvgAggregateOutputType = {
    id: number | null
  }

  export type CrawlSumAggregateOutputType = {
    id: number | null
  }

  export type CrawlMinAggregateOutputType = {
    id: number | null
    createTime: Date | null
    updateTime: Date | null
    state: $Enums.CrawlState | null
  }

  export type CrawlMaxAggregateOutputType = {
    id: number | null
    createTime: Date | null
    updateTime: Date | null
    state: $Enums.CrawlState | null
  }

  export type CrawlCountAggregateOutputType = {
    id: number
    createTime: number
    updateTime: number
    state: number
    data: number
    option: number
    _all: number
  }


  export type CrawlAvgAggregateInputType = {
    id?: true
  }

  export type CrawlSumAggregateInputType = {
    id?: true
  }

  export type CrawlMinAggregateInputType = {
    id?: true
    createTime?: true
    updateTime?: true
    state?: true
  }

  export type CrawlMaxAggregateInputType = {
    id?: true
    createTime?: true
    updateTime?: true
    state?: true
  }

  export type CrawlCountAggregateInputType = {
    id?: true
    createTime?: true
    updateTime?: true
    state?: true
    data?: true
    option?: true
    _all?: true
  }

  export type CrawlAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crawl to aggregate.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Crawls
    **/
    _count?: true | CrawlCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlMaxAggregateInputType
  }

  export type GetCrawlAggregateType<T extends CrawlAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawl[P]>
      : GetScalarType<T[P], AggregateCrawl[P]>
  }




  export type CrawlGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlWhereInput
    orderBy?: CrawlOrderByWithAggregationInput | CrawlOrderByWithAggregationInput[]
    by: CrawlScalarFieldEnum[] | CrawlScalarFieldEnum
    having?: CrawlScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlCountAggregateInputType | true
    _avg?: CrawlAvgAggregateInputType
    _sum?: CrawlSumAggregateInputType
    _min?: CrawlMinAggregateInputType
    _max?: CrawlMaxAggregateInputType
  }

  export type CrawlGroupByOutputType = {
    id: number
    createTime: Date
    updateTime: Date
    state: $Enums.CrawlState
    data: PrismaJson.CrawlerState
    option: PrismaJson.RootCrawlerPageOption
    _count: CrawlCountAggregateOutputType | null
    _avg: CrawlAvgAggregateOutputType | null
    _sum: CrawlSumAggregateOutputType | null
    _min: CrawlMinAggregateOutputType | null
    _max: CrawlMaxAggregateOutputType | null
  }

  type GetCrawlGroupByPayload<T extends CrawlGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlGroupByOutputType[P]>
        }
      >
    >


  export type CrawlSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createTime?: boolean
    updateTime?: boolean
    state?: boolean
    data?: boolean
    option?: boolean
  }, ExtArgs["result"]["crawl"]>

  export type CrawlSelectScalar = {
    id?: boolean
    createTime?: boolean
    updateTime?: boolean
    state?: boolean
    data?: boolean
    option?: boolean
  }


  export type $CrawlPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Crawl"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createTime: Date
      updateTime: Date
      state: $Enums.CrawlState
      /**
       * [CrawlerState]
       */
      data: PrismaJson.CrawlerState
      /**
       * [RootCrawlerPageOption]
       */
      option: PrismaJson.RootCrawlerPageOption
    }, ExtArgs["result"]["crawl"]>
    composites: {}
  }


  type CrawlGetPayload<S extends boolean | null | undefined | CrawlDefaultArgs> = $Result.GetResult<Prisma.$CrawlPayload, S>

  type CrawlCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CrawlFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CrawlCountAggregateInputType | true
    }

  export interface CrawlDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Crawl'], meta: { name: 'Crawl' } }
    /**
     * Find zero or one Crawl that matches the filter.
     * @param {CrawlFindUniqueArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CrawlFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlFindUniqueArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Crawl that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CrawlFindUniqueOrThrowArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CrawlFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Crawl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindFirstArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CrawlFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlFindFirstArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Crawl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindFirstOrThrowArgs} args - Arguments to find a Crawl
     * @example
     * // Get one Crawl
     * const crawl = await prisma.crawl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CrawlFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Crawls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crawls
     * const crawls = await prisma.crawl.findMany()
     * 
     * // Get first 10 Crawls
     * const crawls = await prisma.crawl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlWithIdOnly = await prisma.crawl.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CrawlFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Crawl.
     * @param {CrawlCreateArgs} args - Arguments to create a Crawl.
     * @example
     * // Create one Crawl
     * const Crawl = await prisma.crawl.create({
     *   data: {
     *     // ... data to create a Crawl
     *   }
     * })
     * 
    **/
    create<T extends CrawlCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlCreateArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Crawls.
     *     @param {CrawlCreateManyArgs} args - Arguments to create many Crawls.
     *     @example
     *     // Create many Crawls
     *     const crawl = await prisma.crawl.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CrawlCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Crawl.
     * @param {CrawlDeleteArgs} args - Arguments to delete one Crawl.
     * @example
     * // Delete one Crawl
     * const Crawl = await prisma.crawl.delete({
     *   where: {
     *     // ... filter to delete one Crawl
     *   }
     * })
     * 
    **/
    delete<T extends CrawlDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlDeleteArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Crawl.
     * @param {CrawlUpdateArgs} args - Arguments to update one Crawl.
     * @example
     * // Update one Crawl
     * const crawl = await prisma.crawl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CrawlUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlUpdateArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Crawls.
     * @param {CrawlDeleteManyArgs} args - Arguments to filter Crawls to delete.
     * @example
     * // Delete a few Crawls
     * const { count } = await prisma.crawl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CrawlDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CrawlDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Crawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crawls
     * const crawl = await prisma.crawl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CrawlUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Crawl.
     * @param {CrawlUpsertArgs} args - Arguments to update or create a Crawl.
     * @example
     * // Update or create a Crawl
     * const crawl = await prisma.crawl.upsert({
     *   create: {
     *     // ... data to create a Crawl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crawl we want to update
     *   }
     * })
    **/
    upsert<T extends CrawlUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CrawlUpsertArgs<ExtArgs>>
    ): Prisma__CrawlClient<$Result.GetResult<Prisma.$CrawlPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Crawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlCountArgs} args - Arguments to filter Crawls to count.
     * @example
     * // Count the number of Crawls
     * const count = await prisma.crawl.count({
     *   where: {
     *     // ... the filter for the Crawls we want to count
     *   }
     * })
    **/
    count<T extends CrawlCountArgs>(
      args?: Subset<T, CrawlCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Crawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlAggregateArgs>(args: Subset<T, CrawlAggregateArgs>): Prisma.PrismaPromise<GetCrawlAggregateType<T>>

    /**
     * Group by Crawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlGroupByArgs['orderBy'] }
        : { orderBy?: CrawlGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Crawl model
   */
  readonly fields: CrawlFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Crawl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Crawl model
   */ 
  interface CrawlFieldRefs {
    readonly id: FieldRef<"Crawl", 'Int'>
    readonly createTime: FieldRef<"Crawl", 'DateTime'>
    readonly updateTime: FieldRef<"Crawl", 'DateTime'>
    readonly state: FieldRef<"Crawl", 'CrawlState'>
    readonly data: FieldRef<"Crawl", 'Json'>
    readonly option: FieldRef<"Crawl", 'Json'>
  }
    

  // Custom InputTypes

  /**
   * Crawl findUnique
   */
  export type CrawlFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where: CrawlWhereUniqueInput
  }


  /**
   * Crawl findUniqueOrThrow
   */
  export type CrawlFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where: CrawlWhereUniqueInput
  }


  /**
   * Crawl findFirst
   */
  export type CrawlFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crawls.
     */
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }


  /**
   * Crawl findFirstOrThrow
   */
  export type CrawlFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter, which Crawl to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Crawls.
     */
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }


  /**
   * Crawl findMany
   */
  export type CrawlFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter, which Crawls to fetch.
     */
    where?: CrawlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Crawls to fetch.
     */
    orderBy?: CrawlOrderByWithRelationInput | CrawlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Crawls.
     */
    cursor?: CrawlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Crawls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Crawls.
     */
    skip?: number
    distinct?: CrawlScalarFieldEnum | CrawlScalarFieldEnum[]
  }


  /**
   * Crawl create
   */
  export type CrawlCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * The data needed to create a Crawl.
     */
    data: XOR<CrawlCreateInput, CrawlUncheckedCreateInput>
  }


  /**
   * Crawl createMany
   */
  export type CrawlCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Crawls.
     */
    data: CrawlCreateManyInput | CrawlCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Crawl update
   */
  export type CrawlUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * The data needed to update a Crawl.
     */
    data: XOR<CrawlUpdateInput, CrawlUncheckedUpdateInput>
    /**
     * Choose, which Crawl to update.
     */
    where: CrawlWhereUniqueInput
  }


  /**
   * Crawl updateMany
   */
  export type CrawlUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Crawls.
     */
    data: XOR<CrawlUpdateManyMutationInput, CrawlUncheckedUpdateManyInput>
    /**
     * Filter which Crawls to update
     */
    where?: CrawlWhereInput
  }


  /**
   * Crawl upsert
   */
  export type CrawlUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * The filter to search for the Crawl to update in case it exists.
     */
    where: CrawlWhereUniqueInput
    /**
     * In case the Crawl found by the `where` argument doesn't exist, create a new Crawl with this data.
     */
    create: XOR<CrawlCreateInput, CrawlUncheckedCreateInput>
    /**
     * In case the Crawl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlUpdateInput, CrawlUncheckedUpdateInput>
  }


  /**
   * Crawl delete
   */
  export type CrawlDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
    /**
     * Filter which Crawl to delete.
     */
    where: CrawlWhereUniqueInput
  }


  /**
   * Crawl deleteMany
   */
  export type CrawlDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Crawls to delete
     */
    where?: CrawlWhereInput
  }


  /**
   * Crawl without action
   */
  export type CrawlDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Crawl
     */
    select?: CrawlSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CrawlScalarFieldEnum: {
    id: 'id',
    createTime: 'createTime',
    updateTime: 'updateTime',
    state: 'state',
    data: 'data',
    option: 'option'
  };

  export type CrawlScalarFieldEnum = (typeof CrawlScalarFieldEnum)[keyof typeof CrawlScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'CrawlState'
   */
  export type EnumCrawlStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CrawlState'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CrawlWhereInput = {
    AND?: CrawlWhereInput | CrawlWhereInput[]
    OR?: CrawlWhereInput[]
    NOT?: CrawlWhereInput | CrawlWhereInput[]
    id?: IntFilter<"Crawl"> | number
    createTime?: DateTimeFilter<"Crawl"> | Date | string
    updateTime?: DateTimeFilter<"Crawl"> | Date | string
    state?: EnumCrawlStateFilter<"Crawl"> | $Enums.CrawlState
    data?: JsonFilter<"Crawl">
    option?: JsonFilter<"Crawl">
  }

  export type CrawlOrderByWithRelationInput = {
    id?: SortOrder
    createTime?: SortOrder
    updateTime?: SortOrder
    state?: SortOrder
    data?: SortOrder
    option?: SortOrder
  }

  export type CrawlWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CrawlWhereInput | CrawlWhereInput[]
    OR?: CrawlWhereInput[]
    NOT?: CrawlWhereInput | CrawlWhereInput[]
    createTime?: DateTimeFilter<"Crawl"> | Date | string
    updateTime?: DateTimeFilter<"Crawl"> | Date | string
    state?: EnumCrawlStateFilter<"Crawl"> | $Enums.CrawlState
    data?: JsonFilter<"Crawl">
    option?: JsonFilter<"Crawl">
  }, "id">

  export type CrawlOrderByWithAggregationInput = {
    id?: SortOrder
    createTime?: SortOrder
    updateTime?: SortOrder
    state?: SortOrder
    data?: SortOrder
    option?: SortOrder
    _count?: CrawlCountOrderByAggregateInput
    _avg?: CrawlAvgOrderByAggregateInput
    _max?: CrawlMaxOrderByAggregateInput
    _min?: CrawlMinOrderByAggregateInput
    _sum?: CrawlSumOrderByAggregateInput
  }

  export type CrawlScalarWhereWithAggregatesInput = {
    AND?: CrawlScalarWhereWithAggregatesInput | CrawlScalarWhereWithAggregatesInput[]
    OR?: CrawlScalarWhereWithAggregatesInput[]
    NOT?: CrawlScalarWhereWithAggregatesInput | CrawlScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Crawl"> | number
    createTime?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    updateTime?: DateTimeWithAggregatesFilter<"Crawl"> | Date | string
    state?: EnumCrawlStateWithAggregatesFilter<"Crawl"> | $Enums.CrawlState
    data?: JsonWithAggregatesFilter<"Crawl">
    option?: JsonWithAggregatesFilter<"Crawl">
  }

  export type CrawlCreateInput = {
    createTime?: Date | string
    updateTime?: Date | string
    state?: $Enums.CrawlState
    data: PrismaJson.CrawlerState
    option: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlUncheckedCreateInput = {
    id?: number
    createTime?: Date | string
    updateTime?: Date | string
    state?: $Enums.CrawlState
    data: PrismaJson.CrawlerState
    option: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlUpdateInput = {
    createTime?: DateTimeFieldUpdateOperationsInput | Date | string
    updateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumCrawlStateFieldUpdateOperationsInput | $Enums.CrawlState
    data?: PrismaJson.CrawlerState
    option?: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createTime?: DateTimeFieldUpdateOperationsInput | Date | string
    updateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumCrawlStateFieldUpdateOperationsInput | $Enums.CrawlState
    data?: PrismaJson.CrawlerState
    option?: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlCreateManyInput = {
    id?: number
    createTime?: Date | string
    updateTime?: Date | string
    state?: $Enums.CrawlState
    data: PrismaJson.CrawlerState
    option: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlUpdateManyMutationInput = {
    createTime?: DateTimeFieldUpdateOperationsInput | Date | string
    updateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumCrawlStateFieldUpdateOperationsInput | $Enums.CrawlState
    data?: PrismaJson.CrawlerState
    option?: PrismaJson.RootCrawlerPageOption
  }

  export type CrawlUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createTime?: DateTimeFieldUpdateOperationsInput | Date | string
    updateTime?: DateTimeFieldUpdateOperationsInput | Date | string
    state?: EnumCrawlStateFieldUpdateOperationsInput | $Enums.CrawlState
    data?: PrismaJson.CrawlerState
    option?: PrismaJson.RootCrawlerPageOption
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumCrawlStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CrawlState | EnumCrawlStateFieldRefInput<$PrismaModel>
    in?: $Enums.CrawlState[]
    notIn?: $Enums.CrawlState[]
    not?: NestedEnumCrawlStateFilter<$PrismaModel> | $Enums.CrawlState
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CrawlCountOrderByAggregateInput = {
    id?: SortOrder
    createTime?: SortOrder
    updateTime?: SortOrder
    state?: SortOrder
    data?: SortOrder
    option?: SortOrder
  }

  export type CrawlAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CrawlMaxOrderByAggregateInput = {
    id?: SortOrder
    createTime?: SortOrder
    updateTime?: SortOrder
    state?: SortOrder
  }

  export type CrawlMinOrderByAggregateInput = {
    id?: SortOrder
    createTime?: SortOrder
    updateTime?: SortOrder
    state?: SortOrder
  }

  export type CrawlSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCrawlStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CrawlState | EnumCrawlStateFieldRefInput<$PrismaModel>
    in?: $Enums.CrawlState[]
    notIn?: $Enums.CrawlState[]
    not?: NestedEnumCrawlStateWithAggregatesFilter<$PrismaModel> | $Enums.CrawlState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCrawlStateFilter<$PrismaModel>
    _max?: NestedEnumCrawlStateFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumCrawlStateFieldUpdateOperationsInput = {
    set?: $Enums.CrawlState
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumCrawlStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CrawlState | EnumCrawlStateFieldRefInput<$PrismaModel>
    in?: $Enums.CrawlState[]
    notIn?: $Enums.CrawlState[]
    not?: NestedEnumCrawlStateFilter<$PrismaModel> | $Enums.CrawlState
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCrawlStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CrawlState | EnumCrawlStateFieldRefInput<$PrismaModel>
    in?: $Enums.CrawlState[]
    notIn?: $Enums.CrawlState[]
    not?: NestedEnumCrawlStateWithAggregatesFilter<$PrismaModel> | $Enums.CrawlState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCrawlStateFilter<$PrismaModel>
    _max?: NestedEnumCrawlStateFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CrawlDefaultArgs instead
     */
    export type CrawlArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CrawlDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
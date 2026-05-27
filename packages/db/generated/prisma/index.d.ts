
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model WeddingIntake
 * 
 */
export type WeddingIntake = $Result.DefaultSelection<Prisma.$WeddingIntakePayload>
/**
 * Model Recommendation
 * 
 */
export type Recommendation = $Result.DefaultSelection<Prisma.$RecommendationPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more WeddingIntakes
 * const weddingIntakes = await prisma.weddingIntake.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more WeddingIntakes
   * const weddingIntakes = await prisma.weddingIntake.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.weddingIntake`: Exposes CRUD operations for the **WeddingIntake** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeddingIntakes
    * const weddingIntakes = await prisma.weddingIntake.findMany()
    * ```
    */
  get weddingIntake(): Prisma.WeddingIntakeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recommendation`: Exposes CRUD operations for the **Recommendation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recommendations
    * const recommendations = await prisma.recommendation.findMany()
    * ```
    */
  get recommendation(): Prisma.RecommendationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    WeddingIntake: 'WeddingIntake',
    Recommendation: 'Recommendation',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "weddingIntake" | "recommendation" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      WeddingIntake: {
        payload: Prisma.$WeddingIntakePayload<ExtArgs>
        fields: Prisma.WeddingIntakeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeddingIntakeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeddingIntakeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          findFirst: {
            args: Prisma.WeddingIntakeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeddingIntakeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          findMany: {
            args: Prisma.WeddingIntakeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>[]
          }
          create: {
            args: Prisma.WeddingIntakeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          createMany: {
            args: Prisma.WeddingIntakeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeddingIntakeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>[]
          }
          delete: {
            args: Prisma.WeddingIntakeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          update: {
            args: Prisma.WeddingIntakeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          deleteMany: {
            args: Prisma.WeddingIntakeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeddingIntakeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeddingIntakeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>[]
          }
          upsert: {
            args: Prisma.WeddingIntakeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeddingIntakePayload>
          }
          aggregate: {
            args: Prisma.WeddingIntakeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeddingIntake>
          }
          groupBy: {
            args: Prisma.WeddingIntakeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeddingIntakeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeddingIntakeCountArgs<ExtArgs>
            result: $Utils.Optional<WeddingIntakeCountAggregateOutputType> | number
          }
        }
      }
      Recommendation: {
        payload: Prisma.$RecommendationPayload<ExtArgs>
        fields: Prisma.RecommendationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecommendationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecommendationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findFirst: {
            args: Prisma.RecommendationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecommendationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          findMany: {
            args: Prisma.RecommendationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          create: {
            args: Prisma.RecommendationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          createMany: {
            args: Prisma.RecommendationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecommendationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          delete: {
            args: Prisma.RecommendationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          update: {
            args: Prisma.RecommendationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          deleteMany: {
            args: Prisma.RecommendationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecommendationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecommendationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>[]
          }
          upsert: {
            args: Prisma.RecommendationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationPayload>
          }
          aggregate: {
            args: Prisma.RecommendationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecommendation>
          }
          groupBy: {
            args: Prisma.RecommendationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecommendationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecommendationCountArgs<ExtArgs>
            result: $Utils.Optional<RecommendationCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    weddingIntake?: WeddingIntakeOmit
    recommendation?: RecommendationOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Count Type WeddingIntakeCountOutputType
   */

  export type WeddingIntakeCountOutputType = {
    recommendations: number
    payments: number
  }

  export type WeddingIntakeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recommendations?: boolean | WeddingIntakeCountOutputTypeCountRecommendationsArgs
    payments?: boolean | WeddingIntakeCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * WeddingIntakeCountOutputType without action
   */
  export type WeddingIntakeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntakeCountOutputType
     */
    select?: WeddingIntakeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WeddingIntakeCountOutputType without action
   */
  export type WeddingIntakeCountOutputTypeCountRecommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
  }

  /**
   * WeddingIntakeCountOutputType without action
   */
  export type WeddingIntakeCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model WeddingIntake
   */

  export type AggregateWeddingIntake = {
    _count: WeddingIntakeCountAggregateOutputType | null
    _avg: WeddingIntakeAvgAggregateOutputType | null
    _sum: WeddingIntakeSumAggregateOutputType | null
    _min: WeddingIntakeMinAggregateOutputType | null
    _max: WeddingIntakeMaxAggregateOutputType | null
  }

  export type WeddingIntakeAvgAggregateOutputType = {
    guestCount: number | null
    budgetMidpoint: number | null
  }

  export type WeddingIntakeSumAggregateOutputType = {
    guestCount: number | null
    budgetMidpoint: number | null
  }

  export type WeddingIntakeMinAggregateOutputType = {
    id: string | null
    weddingDate: Date | null
    guestCount: number | null
    city: string | null
    venueType: string | null
    budgetBracket: string | null
    budgetMidpoint: number | null
    createdAt: Date | null
  }

  export type WeddingIntakeMaxAggregateOutputType = {
    id: string | null
    weddingDate: Date | null
    guestCount: number | null
    city: string | null
    venueType: string | null
    budgetBracket: string | null
    budgetMidpoint: number | null
    createdAt: Date | null
  }

  export type WeddingIntakeCountAggregateOutputType = {
    id: number
    weddingDate: number
    guestCount: number
    city: number
    venueType: number
    budgetBracket: number
    budgetMidpoint: number
    priorities: number
    createdAt: number
    _all: number
  }


  export type WeddingIntakeAvgAggregateInputType = {
    guestCount?: true
    budgetMidpoint?: true
  }

  export type WeddingIntakeSumAggregateInputType = {
    guestCount?: true
    budgetMidpoint?: true
  }

  export type WeddingIntakeMinAggregateInputType = {
    id?: true
    weddingDate?: true
    guestCount?: true
    city?: true
    venueType?: true
    budgetBracket?: true
    budgetMidpoint?: true
    createdAt?: true
  }

  export type WeddingIntakeMaxAggregateInputType = {
    id?: true
    weddingDate?: true
    guestCount?: true
    city?: true
    venueType?: true
    budgetBracket?: true
    budgetMidpoint?: true
    createdAt?: true
  }

  export type WeddingIntakeCountAggregateInputType = {
    id?: true
    weddingDate?: true
    guestCount?: true
    city?: true
    venueType?: true
    budgetBracket?: true
    budgetMidpoint?: true
    priorities?: true
    createdAt?: true
    _all?: true
  }

  export type WeddingIntakeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeddingIntake to aggregate.
     */
    where?: WeddingIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeddingIntakes to fetch.
     */
    orderBy?: WeddingIntakeOrderByWithRelationInput | WeddingIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeddingIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeddingIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeddingIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeddingIntakes
    **/
    _count?: true | WeddingIntakeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeddingIntakeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeddingIntakeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeddingIntakeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeddingIntakeMaxAggregateInputType
  }

  export type GetWeddingIntakeAggregateType<T extends WeddingIntakeAggregateArgs> = {
        [P in keyof T & keyof AggregateWeddingIntake]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeddingIntake[P]>
      : GetScalarType<T[P], AggregateWeddingIntake[P]>
  }




  export type WeddingIntakeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeddingIntakeWhereInput
    orderBy?: WeddingIntakeOrderByWithAggregationInput | WeddingIntakeOrderByWithAggregationInput[]
    by: WeddingIntakeScalarFieldEnum[] | WeddingIntakeScalarFieldEnum
    having?: WeddingIntakeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeddingIntakeCountAggregateInputType | true
    _avg?: WeddingIntakeAvgAggregateInputType
    _sum?: WeddingIntakeSumAggregateInputType
    _min?: WeddingIntakeMinAggregateInputType
    _max?: WeddingIntakeMaxAggregateInputType
  }

  export type WeddingIntakeGroupByOutputType = {
    id: string
    weddingDate: Date
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities: string[]
    createdAt: Date
    _count: WeddingIntakeCountAggregateOutputType | null
    _avg: WeddingIntakeAvgAggregateOutputType | null
    _sum: WeddingIntakeSumAggregateOutputType | null
    _min: WeddingIntakeMinAggregateOutputType | null
    _max: WeddingIntakeMaxAggregateOutputType | null
  }

  type GetWeddingIntakeGroupByPayload<T extends WeddingIntakeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeddingIntakeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeddingIntakeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeddingIntakeGroupByOutputType[P]>
            : GetScalarType<T[P], WeddingIntakeGroupByOutputType[P]>
        }
      >
    >


  export type WeddingIntakeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weddingDate?: boolean
    guestCount?: boolean
    city?: boolean
    venueType?: boolean
    budgetBracket?: boolean
    budgetMidpoint?: boolean
    priorities?: boolean
    createdAt?: boolean
    recommendations?: boolean | WeddingIntake$recommendationsArgs<ExtArgs>
    payments?: boolean | WeddingIntake$paymentsArgs<ExtArgs>
    _count?: boolean | WeddingIntakeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weddingIntake"]>

  export type WeddingIntakeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weddingDate?: boolean
    guestCount?: boolean
    city?: boolean
    venueType?: boolean
    budgetBracket?: boolean
    budgetMidpoint?: boolean
    priorities?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["weddingIntake"]>

  export type WeddingIntakeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    weddingDate?: boolean
    guestCount?: boolean
    city?: boolean
    venueType?: boolean
    budgetBracket?: boolean
    budgetMidpoint?: boolean
    priorities?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["weddingIntake"]>

  export type WeddingIntakeSelectScalar = {
    id?: boolean
    weddingDate?: boolean
    guestCount?: boolean
    city?: boolean
    venueType?: boolean
    budgetBracket?: boolean
    budgetMidpoint?: boolean
    priorities?: boolean
    createdAt?: boolean
  }

  export type WeddingIntakeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "weddingDate" | "guestCount" | "city" | "venueType" | "budgetBracket" | "budgetMidpoint" | "priorities" | "createdAt", ExtArgs["result"]["weddingIntake"]>
  export type WeddingIntakeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recommendations?: boolean | WeddingIntake$recommendationsArgs<ExtArgs>
    payments?: boolean | WeddingIntake$paymentsArgs<ExtArgs>
    _count?: boolean | WeddingIntakeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WeddingIntakeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WeddingIntakeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WeddingIntakePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeddingIntake"
    objects: {
      recommendations: Prisma.$RecommendationPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      weddingDate: Date
      guestCount: number
      city: string
      venueType: string
      budgetBracket: string
      budgetMidpoint: number
      priorities: string[]
      createdAt: Date
    }, ExtArgs["result"]["weddingIntake"]>
    composites: {}
  }

  type WeddingIntakeGetPayload<S extends boolean | null | undefined | WeddingIntakeDefaultArgs> = $Result.GetResult<Prisma.$WeddingIntakePayload, S>

  type WeddingIntakeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeddingIntakeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeddingIntakeCountAggregateInputType | true
    }

  export interface WeddingIntakeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeddingIntake'], meta: { name: 'WeddingIntake' } }
    /**
     * Find zero or one WeddingIntake that matches the filter.
     * @param {WeddingIntakeFindUniqueArgs} args - Arguments to find a WeddingIntake
     * @example
     * // Get one WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeddingIntakeFindUniqueArgs>(args: SelectSubset<T, WeddingIntakeFindUniqueArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeddingIntake that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeddingIntakeFindUniqueOrThrowArgs} args - Arguments to find a WeddingIntake
     * @example
     * // Get one WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeddingIntakeFindUniqueOrThrowArgs>(args: SelectSubset<T, WeddingIntakeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeddingIntake that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeFindFirstArgs} args - Arguments to find a WeddingIntake
     * @example
     * // Get one WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeddingIntakeFindFirstArgs>(args?: SelectSubset<T, WeddingIntakeFindFirstArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeddingIntake that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeFindFirstOrThrowArgs} args - Arguments to find a WeddingIntake
     * @example
     * // Get one WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeddingIntakeFindFirstOrThrowArgs>(args?: SelectSubset<T, WeddingIntakeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeddingIntakes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeddingIntakes
     * const weddingIntakes = await prisma.weddingIntake.findMany()
     * 
     * // Get first 10 WeddingIntakes
     * const weddingIntakes = await prisma.weddingIntake.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weddingIntakeWithIdOnly = await prisma.weddingIntake.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeddingIntakeFindManyArgs>(args?: SelectSubset<T, WeddingIntakeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeddingIntake.
     * @param {WeddingIntakeCreateArgs} args - Arguments to create a WeddingIntake.
     * @example
     * // Create one WeddingIntake
     * const WeddingIntake = await prisma.weddingIntake.create({
     *   data: {
     *     // ... data to create a WeddingIntake
     *   }
     * })
     * 
     */
    create<T extends WeddingIntakeCreateArgs>(args: SelectSubset<T, WeddingIntakeCreateArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeddingIntakes.
     * @param {WeddingIntakeCreateManyArgs} args - Arguments to create many WeddingIntakes.
     * @example
     * // Create many WeddingIntakes
     * const weddingIntake = await prisma.weddingIntake.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeddingIntakeCreateManyArgs>(args?: SelectSubset<T, WeddingIntakeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeddingIntakes and returns the data saved in the database.
     * @param {WeddingIntakeCreateManyAndReturnArgs} args - Arguments to create many WeddingIntakes.
     * @example
     * // Create many WeddingIntakes
     * const weddingIntake = await prisma.weddingIntake.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeddingIntakes and only return the `id`
     * const weddingIntakeWithIdOnly = await prisma.weddingIntake.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeddingIntakeCreateManyAndReturnArgs>(args?: SelectSubset<T, WeddingIntakeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeddingIntake.
     * @param {WeddingIntakeDeleteArgs} args - Arguments to delete one WeddingIntake.
     * @example
     * // Delete one WeddingIntake
     * const WeddingIntake = await prisma.weddingIntake.delete({
     *   where: {
     *     // ... filter to delete one WeddingIntake
     *   }
     * })
     * 
     */
    delete<T extends WeddingIntakeDeleteArgs>(args: SelectSubset<T, WeddingIntakeDeleteArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeddingIntake.
     * @param {WeddingIntakeUpdateArgs} args - Arguments to update one WeddingIntake.
     * @example
     * // Update one WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeddingIntakeUpdateArgs>(args: SelectSubset<T, WeddingIntakeUpdateArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeddingIntakes.
     * @param {WeddingIntakeDeleteManyArgs} args - Arguments to filter WeddingIntakes to delete.
     * @example
     * // Delete a few WeddingIntakes
     * const { count } = await prisma.weddingIntake.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeddingIntakeDeleteManyArgs>(args?: SelectSubset<T, WeddingIntakeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeddingIntakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeddingIntakes
     * const weddingIntake = await prisma.weddingIntake.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeddingIntakeUpdateManyArgs>(args: SelectSubset<T, WeddingIntakeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeddingIntakes and returns the data updated in the database.
     * @param {WeddingIntakeUpdateManyAndReturnArgs} args - Arguments to update many WeddingIntakes.
     * @example
     * // Update many WeddingIntakes
     * const weddingIntake = await prisma.weddingIntake.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeddingIntakes and only return the `id`
     * const weddingIntakeWithIdOnly = await prisma.weddingIntake.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeddingIntakeUpdateManyAndReturnArgs>(args: SelectSubset<T, WeddingIntakeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeddingIntake.
     * @param {WeddingIntakeUpsertArgs} args - Arguments to update or create a WeddingIntake.
     * @example
     * // Update or create a WeddingIntake
     * const weddingIntake = await prisma.weddingIntake.upsert({
     *   create: {
     *     // ... data to create a WeddingIntake
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeddingIntake we want to update
     *   }
     * })
     */
    upsert<T extends WeddingIntakeUpsertArgs>(args: SelectSubset<T, WeddingIntakeUpsertArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeddingIntakes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeCountArgs} args - Arguments to filter WeddingIntakes to count.
     * @example
     * // Count the number of WeddingIntakes
     * const count = await prisma.weddingIntake.count({
     *   where: {
     *     // ... the filter for the WeddingIntakes we want to count
     *   }
     * })
    **/
    count<T extends WeddingIntakeCountArgs>(
      args?: Subset<T, WeddingIntakeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeddingIntakeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeddingIntake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WeddingIntakeAggregateArgs>(args: Subset<T, WeddingIntakeAggregateArgs>): Prisma.PrismaPromise<GetWeddingIntakeAggregateType<T>>

    /**
     * Group by WeddingIntake.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeddingIntakeGroupByArgs} args - Group by arguments.
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
      T extends WeddingIntakeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeddingIntakeGroupByArgs['orderBy'] }
        : { orderBy?: WeddingIntakeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WeddingIntakeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeddingIntakeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeddingIntake model
   */
  readonly fields: WeddingIntakeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeddingIntake.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeddingIntakeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recommendations<T extends WeddingIntake$recommendationsArgs<ExtArgs> = {}>(args?: Subset<T, WeddingIntake$recommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends WeddingIntake$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, WeddingIntake$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeddingIntake model
   */
  interface WeddingIntakeFieldRefs {
    readonly id: FieldRef<"WeddingIntake", 'String'>
    readonly weddingDate: FieldRef<"WeddingIntake", 'DateTime'>
    readonly guestCount: FieldRef<"WeddingIntake", 'Int'>
    readonly city: FieldRef<"WeddingIntake", 'String'>
    readonly venueType: FieldRef<"WeddingIntake", 'String'>
    readonly budgetBracket: FieldRef<"WeddingIntake", 'String'>
    readonly budgetMidpoint: FieldRef<"WeddingIntake", 'Int'>
    readonly priorities: FieldRef<"WeddingIntake", 'String[]'>
    readonly createdAt: FieldRef<"WeddingIntake", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeddingIntake findUnique
   */
  export type WeddingIntakeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WeddingIntake to fetch.
     */
    where: WeddingIntakeWhereUniqueInput
  }

  /**
   * WeddingIntake findUniqueOrThrow
   */
  export type WeddingIntakeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WeddingIntake to fetch.
     */
    where: WeddingIntakeWhereUniqueInput
  }

  /**
   * WeddingIntake findFirst
   */
  export type WeddingIntakeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WeddingIntake to fetch.
     */
    where?: WeddingIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeddingIntakes to fetch.
     */
    orderBy?: WeddingIntakeOrderByWithRelationInput | WeddingIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeddingIntakes.
     */
    cursor?: WeddingIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeddingIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeddingIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeddingIntakes.
     */
    distinct?: WeddingIntakeScalarFieldEnum | WeddingIntakeScalarFieldEnum[]
  }

  /**
   * WeddingIntake findFirstOrThrow
   */
  export type WeddingIntakeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WeddingIntake to fetch.
     */
    where?: WeddingIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeddingIntakes to fetch.
     */
    orderBy?: WeddingIntakeOrderByWithRelationInput | WeddingIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeddingIntakes.
     */
    cursor?: WeddingIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeddingIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeddingIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeddingIntakes.
     */
    distinct?: WeddingIntakeScalarFieldEnum | WeddingIntakeScalarFieldEnum[]
  }

  /**
   * WeddingIntake findMany
   */
  export type WeddingIntakeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter, which WeddingIntakes to fetch.
     */
    where?: WeddingIntakeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeddingIntakes to fetch.
     */
    orderBy?: WeddingIntakeOrderByWithRelationInput | WeddingIntakeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeddingIntakes.
     */
    cursor?: WeddingIntakeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeddingIntakes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeddingIntakes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeddingIntakes.
     */
    distinct?: WeddingIntakeScalarFieldEnum | WeddingIntakeScalarFieldEnum[]
  }

  /**
   * WeddingIntake create
   */
  export type WeddingIntakeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * The data needed to create a WeddingIntake.
     */
    data: XOR<WeddingIntakeCreateInput, WeddingIntakeUncheckedCreateInput>
  }

  /**
   * WeddingIntake createMany
   */
  export type WeddingIntakeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeddingIntakes.
     */
    data: WeddingIntakeCreateManyInput | WeddingIntakeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeddingIntake createManyAndReturn
   */
  export type WeddingIntakeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * The data used to create many WeddingIntakes.
     */
    data: WeddingIntakeCreateManyInput | WeddingIntakeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeddingIntake update
   */
  export type WeddingIntakeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * The data needed to update a WeddingIntake.
     */
    data: XOR<WeddingIntakeUpdateInput, WeddingIntakeUncheckedUpdateInput>
    /**
     * Choose, which WeddingIntake to update.
     */
    where: WeddingIntakeWhereUniqueInput
  }

  /**
   * WeddingIntake updateMany
   */
  export type WeddingIntakeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeddingIntakes.
     */
    data: XOR<WeddingIntakeUpdateManyMutationInput, WeddingIntakeUncheckedUpdateManyInput>
    /**
     * Filter which WeddingIntakes to update
     */
    where?: WeddingIntakeWhereInput
    /**
     * Limit how many WeddingIntakes to update.
     */
    limit?: number
  }

  /**
   * WeddingIntake updateManyAndReturn
   */
  export type WeddingIntakeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * The data used to update WeddingIntakes.
     */
    data: XOR<WeddingIntakeUpdateManyMutationInput, WeddingIntakeUncheckedUpdateManyInput>
    /**
     * Filter which WeddingIntakes to update
     */
    where?: WeddingIntakeWhereInput
    /**
     * Limit how many WeddingIntakes to update.
     */
    limit?: number
  }

  /**
   * WeddingIntake upsert
   */
  export type WeddingIntakeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * The filter to search for the WeddingIntake to update in case it exists.
     */
    where: WeddingIntakeWhereUniqueInput
    /**
     * In case the WeddingIntake found by the `where` argument doesn't exist, create a new WeddingIntake with this data.
     */
    create: XOR<WeddingIntakeCreateInput, WeddingIntakeUncheckedCreateInput>
    /**
     * In case the WeddingIntake was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeddingIntakeUpdateInput, WeddingIntakeUncheckedUpdateInput>
  }

  /**
   * WeddingIntake delete
   */
  export type WeddingIntakeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
    /**
     * Filter which WeddingIntake to delete.
     */
    where: WeddingIntakeWhereUniqueInput
  }

  /**
   * WeddingIntake deleteMany
   */
  export type WeddingIntakeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeddingIntakes to delete
     */
    where?: WeddingIntakeWhereInput
    /**
     * Limit how many WeddingIntakes to delete.
     */
    limit?: number
  }

  /**
   * WeddingIntake.recommendations
   */
  export type WeddingIntake$recommendationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    cursor?: RecommendationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * WeddingIntake.payments
   */
  export type WeddingIntake$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * WeddingIntake without action
   */
  export type WeddingIntakeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeddingIntake
     */
    select?: WeddingIntakeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeddingIntake
     */
    omit?: WeddingIntakeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeddingIntakeInclude<ExtArgs> | null
  }


  /**
   * Model Recommendation
   */

  export type AggregateRecommendation = {
    _count: RecommendationCountAggregateOutputType | null
    _avg: RecommendationAvgAggregateOutputType | null
    _sum: RecommendationSumAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  export type RecommendationAvgAggregateOutputType = {
    priorityRank: number | null
    allocatedBudget: number | null
  }

  export type RecommendationSumAggregateOutputType = {
    priorityRank: number | null
    allocatedBudget: number | null
  }

  export type RecommendationMinAggregateOutputType = {
    id: string | null
    intakeId: string | null
    vendorCategory: string | null
    priorityRank: number | null
    allocatedBudget: number | null
    rationale: string | null
    createdAt: Date | null
  }

  export type RecommendationMaxAggregateOutputType = {
    id: string | null
    intakeId: string | null
    vendorCategory: string | null
    priorityRank: number | null
    allocatedBudget: number | null
    rationale: string | null
    createdAt: Date | null
  }

  export type RecommendationCountAggregateOutputType = {
    id: number
    intakeId: number
    vendorCategory: number
    priorityRank: number
    allocatedBudget: number
    rationale: number
    createdAt: number
    _all: number
  }


  export type RecommendationAvgAggregateInputType = {
    priorityRank?: true
    allocatedBudget?: true
  }

  export type RecommendationSumAggregateInputType = {
    priorityRank?: true
    allocatedBudget?: true
  }

  export type RecommendationMinAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    priorityRank?: true
    allocatedBudget?: true
    rationale?: true
    createdAt?: true
  }

  export type RecommendationMaxAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    priorityRank?: true
    allocatedBudget?: true
    rationale?: true
    createdAt?: true
  }

  export type RecommendationCountAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    priorityRank?: true
    allocatedBudget?: true
    rationale?: true
    createdAt?: true
    _all?: true
  }

  export type RecommendationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendation to aggregate.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recommendations
    **/
    _count?: true | RecommendationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecommendationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecommendationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecommendationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecommendationMaxAggregateInputType
  }

  export type GetRecommendationAggregateType<T extends RecommendationAggregateArgs> = {
        [P in keyof T & keyof AggregateRecommendation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecommendation[P]>
      : GetScalarType<T[P], AggregateRecommendation[P]>
  }




  export type RecommendationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationWhereInput
    orderBy?: RecommendationOrderByWithAggregationInput | RecommendationOrderByWithAggregationInput[]
    by: RecommendationScalarFieldEnum[] | RecommendationScalarFieldEnum
    having?: RecommendationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecommendationCountAggregateInputType | true
    _avg?: RecommendationAvgAggregateInputType
    _sum?: RecommendationSumAggregateInputType
    _min?: RecommendationMinAggregateInputType
    _max?: RecommendationMaxAggregateInputType
  }

  export type RecommendationGroupByOutputType = {
    id: string
    intakeId: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt: Date
    _count: RecommendationCountAggregateOutputType | null
    _avg: RecommendationAvgAggregateOutputType | null
    _sum: RecommendationSumAggregateOutputType | null
    _min: RecommendationMinAggregateOutputType | null
    _max: RecommendationMaxAggregateOutputType | null
  }

  type GetRecommendationGroupByPayload<T extends RecommendationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecommendationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecommendationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
            : GetScalarType<T[P], RecommendationGroupByOutputType[P]>
        }
      >
    >


  export type RecommendationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    priorityRank?: boolean
    allocatedBudget?: boolean
    rationale?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    priorityRank?: boolean
    allocatedBudget?: boolean
    rationale?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    priorityRank?: boolean
    allocatedBudget?: boolean
    rationale?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendation"]>

  export type RecommendationSelectScalar = {
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    priorityRank?: boolean
    allocatedBudget?: boolean
    rationale?: boolean
    createdAt?: boolean
  }

  export type RecommendationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "intakeId" | "vendorCategory" | "priorityRank" | "allocatedBudget" | "rationale" | "createdAt", ExtArgs["result"]["recommendation"]>
  export type RecommendationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }
  export type RecommendationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }
  export type RecommendationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }

  export type $RecommendationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recommendation"
    objects: {
      intake: Prisma.$WeddingIntakePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      intakeId: string
      vendorCategory: string
      priorityRank: number
      allocatedBudget: number
      rationale: string
      createdAt: Date
    }, ExtArgs["result"]["recommendation"]>
    composites: {}
  }

  type RecommendationGetPayload<S extends boolean | null | undefined | RecommendationDefaultArgs> = $Result.GetResult<Prisma.$RecommendationPayload, S>

  type RecommendationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecommendationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecommendationCountAggregateInputType | true
    }

  export interface RecommendationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recommendation'], meta: { name: 'Recommendation' } }
    /**
     * Find zero or one Recommendation that matches the filter.
     * @param {RecommendationFindUniqueArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecommendationFindUniqueArgs>(args: SelectSubset<T, RecommendationFindUniqueArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recommendation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecommendationFindUniqueOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecommendationFindUniqueOrThrowArgs>(args: SelectSubset<T, RecommendationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecommendationFindFirstArgs>(args?: SelectSubset<T, RecommendationFindFirstArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recommendation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindFirstOrThrowArgs} args - Arguments to find a Recommendation
     * @example
     * // Get one Recommendation
     * const recommendation = await prisma.recommendation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecommendationFindFirstOrThrowArgs>(args?: SelectSubset<T, RecommendationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recommendations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recommendations
     * const recommendations = await prisma.recommendation.findMany()
     * 
     * // Get first 10 Recommendations
     * const recommendations = await prisma.recommendation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecommendationFindManyArgs>(args?: SelectSubset<T, RecommendationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recommendation.
     * @param {RecommendationCreateArgs} args - Arguments to create a Recommendation.
     * @example
     * // Create one Recommendation
     * const Recommendation = await prisma.recommendation.create({
     *   data: {
     *     // ... data to create a Recommendation
     *   }
     * })
     * 
     */
    create<T extends RecommendationCreateArgs>(args: SelectSubset<T, RecommendationCreateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recommendations.
     * @param {RecommendationCreateManyArgs} args - Arguments to create many Recommendations.
     * @example
     * // Create many Recommendations
     * const recommendation = await prisma.recommendation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecommendationCreateManyArgs>(args?: SelectSubset<T, RecommendationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recommendations and returns the data saved in the database.
     * @param {RecommendationCreateManyAndReturnArgs} args - Arguments to create many Recommendations.
     * @example
     * // Create many Recommendations
     * const recommendation = await prisma.recommendation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recommendations and only return the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecommendationCreateManyAndReturnArgs>(args?: SelectSubset<T, RecommendationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recommendation.
     * @param {RecommendationDeleteArgs} args - Arguments to delete one Recommendation.
     * @example
     * // Delete one Recommendation
     * const Recommendation = await prisma.recommendation.delete({
     *   where: {
     *     // ... filter to delete one Recommendation
     *   }
     * })
     * 
     */
    delete<T extends RecommendationDeleteArgs>(args: SelectSubset<T, RecommendationDeleteArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recommendation.
     * @param {RecommendationUpdateArgs} args - Arguments to update one Recommendation.
     * @example
     * // Update one Recommendation
     * const recommendation = await prisma.recommendation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecommendationUpdateArgs>(args: SelectSubset<T, RecommendationUpdateArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recommendations.
     * @param {RecommendationDeleteManyArgs} args - Arguments to filter Recommendations to delete.
     * @example
     * // Delete a few Recommendations
     * const { count } = await prisma.recommendation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecommendationDeleteManyArgs>(args?: SelectSubset<T, RecommendationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recommendations
     * const recommendation = await prisma.recommendation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecommendationUpdateManyArgs>(args: SelectSubset<T, RecommendationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recommendations and returns the data updated in the database.
     * @param {RecommendationUpdateManyAndReturnArgs} args - Arguments to update many Recommendations.
     * @example
     * // Update many Recommendations
     * const recommendation = await prisma.recommendation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recommendations and only return the `id`
     * const recommendationWithIdOnly = await prisma.recommendation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecommendationUpdateManyAndReturnArgs>(args: SelectSubset<T, RecommendationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recommendation.
     * @param {RecommendationUpsertArgs} args - Arguments to update or create a Recommendation.
     * @example
     * // Update or create a Recommendation
     * const recommendation = await prisma.recommendation.upsert({
     *   create: {
     *     // ... data to create a Recommendation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recommendation we want to update
     *   }
     * })
     */
    upsert<T extends RecommendationUpsertArgs>(args: SelectSubset<T, RecommendationUpsertArgs<ExtArgs>>): Prisma__RecommendationClient<$Result.GetResult<Prisma.$RecommendationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recommendations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationCountArgs} args - Arguments to filter Recommendations to count.
     * @example
     * // Count the number of Recommendations
     * const count = await prisma.recommendation.count({
     *   where: {
     *     // ... the filter for the Recommendations we want to count
     *   }
     * })
    **/
    count<T extends RecommendationCountArgs>(
      args?: Subset<T, RecommendationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecommendationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecommendationAggregateArgs>(args: Subset<T, RecommendationAggregateArgs>): Prisma.PrismaPromise<GetRecommendationAggregateType<T>>

    /**
     * Group by Recommendation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationGroupByArgs} args - Group by arguments.
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
      T extends RecommendationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecommendationGroupByArgs['orderBy'] }
        : { orderBy?: RecommendationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecommendationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recommendation model
   */
  readonly fields: RecommendationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recommendation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecommendationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    intake<T extends WeddingIntakeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WeddingIntakeDefaultArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recommendation model
   */
  interface RecommendationFieldRefs {
    readonly id: FieldRef<"Recommendation", 'String'>
    readonly intakeId: FieldRef<"Recommendation", 'String'>
    readonly vendorCategory: FieldRef<"Recommendation", 'String'>
    readonly priorityRank: FieldRef<"Recommendation", 'Int'>
    readonly allocatedBudget: FieldRef<"Recommendation", 'Int'>
    readonly rationale: FieldRef<"Recommendation", 'String'>
    readonly createdAt: FieldRef<"Recommendation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recommendation findUnique
   */
  export type RecommendationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findUniqueOrThrow
   */
  export type RecommendationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation findFirst
   */
  export type RecommendationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findFirstOrThrow
   */
  export type RecommendationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendation to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation findMany
   */
  export type RecommendationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter, which Recommendations to fetch.
     */
    where?: RecommendationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recommendations to fetch.
     */
    orderBy?: RecommendationOrderByWithRelationInput | RecommendationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recommendations.
     */
    cursor?: RecommendationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recommendations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recommendations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recommendations.
     */
    distinct?: RecommendationScalarFieldEnum | RecommendationScalarFieldEnum[]
  }

  /**
   * Recommendation create
   */
  export type RecommendationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to create a Recommendation.
     */
    data: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
  }

  /**
   * Recommendation createMany
   */
  export type RecommendationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recommendations.
     */
    data: RecommendationCreateManyInput | RecommendationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recommendation createManyAndReturn
   */
  export type RecommendationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * The data used to create many Recommendations.
     */
    data: RecommendationCreateManyInput | RecommendationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommendation update
   */
  export type RecommendationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The data needed to update a Recommendation.
     */
    data: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
    /**
     * Choose, which Recommendation to update.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation updateMany
   */
  export type RecommendationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recommendations.
     */
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyInput>
    /**
     * Filter which Recommendations to update
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to update.
     */
    limit?: number
  }

  /**
   * Recommendation updateManyAndReturn
   */
  export type RecommendationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * The data used to update Recommendations.
     */
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyInput>
    /**
     * Filter which Recommendations to update
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recommendation upsert
   */
  export type RecommendationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * The filter to search for the Recommendation to update in case it exists.
     */
    where: RecommendationWhereUniqueInput
    /**
     * In case the Recommendation found by the `where` argument doesn't exist, create a new Recommendation with this data.
     */
    create: XOR<RecommendationCreateInput, RecommendationUncheckedCreateInput>
    /**
     * In case the Recommendation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecommendationUpdateInput, RecommendationUncheckedUpdateInput>
  }

  /**
   * Recommendation delete
   */
  export type RecommendationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
    /**
     * Filter which Recommendation to delete.
     */
    where: RecommendationWhereUniqueInput
  }

  /**
   * Recommendation deleteMany
   */
  export type RecommendationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recommendations to delete
     */
    where?: RecommendationWhereInput
    /**
     * Limit how many Recommendations to delete.
     */
    limit?: number
  }

  /**
   * Recommendation without action
   */
  export type RecommendationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recommendation
     */
    select?: RecommendationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recommendation
     */
    omit?: RecommendationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amountPaid: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amountPaid: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    intakeId: string | null
    vendorCategory: string | null
    vendorName: string | null
    amountPaid: number | null
    paymentDate: Date | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    intakeId: string | null
    vendorCategory: string | null
    vendorName: string | null
    amountPaid: number | null
    paymentDate: Date | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    intakeId: number
    vendorCategory: number
    vendorName: number
    amountPaid: number
    paymentDate: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amountPaid?: true
  }

  export type PaymentSumAggregateInputType = {
    amountPaid?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    vendorName?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    vendorName?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    intakeId?: true
    vendorCategory?: true
    vendorName?: true
    amountPaid?: true
    paymentDate?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    intakeId: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    vendorName?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    vendorName?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    vendorName?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    intakeId?: boolean
    vendorCategory?: boolean
    vendorName?: boolean
    amountPaid?: boolean
    paymentDate?: boolean
    createdAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "intakeId" | "vendorCategory" | "vendorName" | "amountPaid" | "paymentDate" | "createdAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    intake?: boolean | WeddingIntakeDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      intake: Prisma.$WeddingIntakePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      intakeId: string
      vendorCategory: string
      vendorName: string
      amountPaid: number
      paymentDate: Date
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    intake<T extends WeddingIntakeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WeddingIntakeDefaultArgs<ExtArgs>>): Prisma__WeddingIntakeClient<$Result.GetResult<Prisma.$WeddingIntakePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly intakeId: FieldRef<"Payment", 'String'>
    readonly vendorCategory: FieldRef<"Payment", 'String'>
    readonly vendorName: FieldRef<"Payment", 'String'>
    readonly amountPaid: FieldRef<"Payment", 'Int'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
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


  export const WeddingIntakeScalarFieldEnum: {
    id: 'id',
    weddingDate: 'weddingDate',
    guestCount: 'guestCount',
    city: 'city',
    venueType: 'venueType',
    budgetBracket: 'budgetBracket',
    budgetMidpoint: 'budgetMidpoint',
    priorities: 'priorities',
    createdAt: 'createdAt'
  };

  export type WeddingIntakeScalarFieldEnum = (typeof WeddingIntakeScalarFieldEnum)[keyof typeof WeddingIntakeScalarFieldEnum]


  export const RecommendationScalarFieldEnum: {
    id: 'id',
    intakeId: 'intakeId',
    vendorCategory: 'vendorCategory',
    priorityRank: 'priorityRank',
    allocatedBudget: 'allocatedBudget',
    rationale: 'rationale',
    createdAt: 'createdAt'
  };

  export type RecommendationScalarFieldEnum = (typeof RecommendationScalarFieldEnum)[keyof typeof RecommendationScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    intakeId: 'intakeId',
    vendorCategory: 'vendorCategory',
    vendorName: 'vendorName',
    amountPaid: 'amountPaid',
    paymentDate: 'paymentDate',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type WeddingIntakeWhereInput = {
    AND?: WeddingIntakeWhereInput | WeddingIntakeWhereInput[]
    OR?: WeddingIntakeWhereInput[]
    NOT?: WeddingIntakeWhereInput | WeddingIntakeWhereInput[]
    id?: UuidFilter<"WeddingIntake"> | string
    weddingDate?: DateTimeFilter<"WeddingIntake"> | Date | string
    guestCount?: IntFilter<"WeddingIntake"> | number
    city?: StringFilter<"WeddingIntake"> | string
    venueType?: StringFilter<"WeddingIntake"> | string
    budgetBracket?: StringFilter<"WeddingIntake"> | string
    budgetMidpoint?: IntFilter<"WeddingIntake"> | number
    priorities?: StringNullableListFilter<"WeddingIntake">
    createdAt?: DateTimeFilter<"WeddingIntake"> | Date | string
    recommendations?: RecommendationListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type WeddingIntakeOrderByWithRelationInput = {
    id?: SortOrder
    weddingDate?: SortOrder
    guestCount?: SortOrder
    city?: SortOrder
    venueType?: SortOrder
    budgetBracket?: SortOrder
    budgetMidpoint?: SortOrder
    priorities?: SortOrder
    createdAt?: SortOrder
    recommendations?: RecommendationOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type WeddingIntakeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeddingIntakeWhereInput | WeddingIntakeWhereInput[]
    OR?: WeddingIntakeWhereInput[]
    NOT?: WeddingIntakeWhereInput | WeddingIntakeWhereInput[]
    weddingDate?: DateTimeFilter<"WeddingIntake"> | Date | string
    guestCount?: IntFilter<"WeddingIntake"> | number
    city?: StringFilter<"WeddingIntake"> | string
    venueType?: StringFilter<"WeddingIntake"> | string
    budgetBracket?: StringFilter<"WeddingIntake"> | string
    budgetMidpoint?: IntFilter<"WeddingIntake"> | number
    priorities?: StringNullableListFilter<"WeddingIntake">
    createdAt?: DateTimeFilter<"WeddingIntake"> | Date | string
    recommendations?: RecommendationListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id">

  export type WeddingIntakeOrderByWithAggregationInput = {
    id?: SortOrder
    weddingDate?: SortOrder
    guestCount?: SortOrder
    city?: SortOrder
    venueType?: SortOrder
    budgetBracket?: SortOrder
    budgetMidpoint?: SortOrder
    priorities?: SortOrder
    createdAt?: SortOrder
    _count?: WeddingIntakeCountOrderByAggregateInput
    _avg?: WeddingIntakeAvgOrderByAggregateInput
    _max?: WeddingIntakeMaxOrderByAggregateInput
    _min?: WeddingIntakeMinOrderByAggregateInput
    _sum?: WeddingIntakeSumOrderByAggregateInput
  }

  export type WeddingIntakeScalarWhereWithAggregatesInput = {
    AND?: WeddingIntakeScalarWhereWithAggregatesInput | WeddingIntakeScalarWhereWithAggregatesInput[]
    OR?: WeddingIntakeScalarWhereWithAggregatesInput[]
    NOT?: WeddingIntakeScalarWhereWithAggregatesInput | WeddingIntakeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"WeddingIntake"> | string
    weddingDate?: DateTimeWithAggregatesFilter<"WeddingIntake"> | Date | string
    guestCount?: IntWithAggregatesFilter<"WeddingIntake"> | number
    city?: StringWithAggregatesFilter<"WeddingIntake"> | string
    venueType?: StringWithAggregatesFilter<"WeddingIntake"> | string
    budgetBracket?: StringWithAggregatesFilter<"WeddingIntake"> | string
    budgetMidpoint?: IntWithAggregatesFilter<"WeddingIntake"> | number
    priorities?: StringNullableListFilter<"WeddingIntake">
    createdAt?: DateTimeWithAggregatesFilter<"WeddingIntake"> | Date | string
  }

  export type RecommendationWhereInput = {
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    id?: UuidFilter<"Recommendation"> | string
    intakeId?: UuidFilter<"Recommendation"> | string
    vendorCategory?: StringFilter<"Recommendation"> | string
    priorityRank?: IntFilter<"Recommendation"> | number
    allocatedBudget?: IntFilter<"Recommendation"> | number
    rationale?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    intake?: XOR<WeddingIntakeScalarRelationFilter, WeddingIntakeWhereInput>
  }

  export type RecommendationOrderByWithRelationInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
    intake?: WeddingIntakeOrderByWithRelationInput
  }

  export type RecommendationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecommendationWhereInput | RecommendationWhereInput[]
    OR?: RecommendationWhereInput[]
    NOT?: RecommendationWhereInput | RecommendationWhereInput[]
    intakeId?: UuidFilter<"Recommendation"> | string
    vendorCategory?: StringFilter<"Recommendation"> | string
    priorityRank?: IntFilter<"Recommendation"> | number
    allocatedBudget?: IntFilter<"Recommendation"> | number
    rationale?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
    intake?: XOR<WeddingIntakeScalarRelationFilter, WeddingIntakeWhereInput>
  }, "id">

  export type RecommendationOrderByWithAggregationInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
    _count?: RecommendationCountOrderByAggregateInput
    _avg?: RecommendationAvgOrderByAggregateInput
    _max?: RecommendationMaxOrderByAggregateInput
    _min?: RecommendationMinOrderByAggregateInput
    _sum?: RecommendationSumOrderByAggregateInput
  }

  export type RecommendationScalarWhereWithAggregatesInput = {
    AND?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    OR?: RecommendationScalarWhereWithAggregatesInput[]
    NOT?: RecommendationScalarWhereWithAggregatesInput | RecommendationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Recommendation"> | string
    intakeId?: UuidWithAggregatesFilter<"Recommendation"> | string
    vendorCategory?: StringWithAggregatesFilter<"Recommendation"> | string
    priorityRank?: IntWithAggregatesFilter<"Recommendation"> | number
    allocatedBudget?: IntWithAggregatesFilter<"Recommendation"> | number
    rationale?: StringWithAggregatesFilter<"Recommendation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Recommendation"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: UuidFilter<"Payment"> | string
    intakeId?: UuidFilter<"Payment"> | string
    vendorCategory?: StringFilter<"Payment"> | string
    vendorName?: StringFilter<"Payment"> | string
    amountPaid?: IntFilter<"Payment"> | number
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    intake?: XOR<WeddingIntakeScalarRelationFilter, WeddingIntakeWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    vendorName?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
    intake?: WeddingIntakeOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    intakeId?: UuidFilter<"Payment"> | string
    vendorCategory?: StringFilter<"Payment"> | string
    vendorName?: StringFilter<"Payment"> | string
    amountPaid?: IntFilter<"Payment"> | number
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    intake?: XOR<WeddingIntakeScalarRelationFilter, WeddingIntakeWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    vendorName?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Payment"> | string
    intakeId?: UuidWithAggregatesFilter<"Payment"> | string
    vendorCategory?: StringWithAggregatesFilter<"Payment"> | string
    vendorName?: StringWithAggregatesFilter<"Payment"> | string
    amountPaid?: IntWithAggregatesFilter<"Payment"> | number
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type WeddingIntakeCreateInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    recommendations?: RecommendationCreateNestedManyWithoutIntakeInput
    payments?: PaymentCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeUncheckedCreateInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    recommendations?: RecommendationUncheckedCreateNestedManyWithoutIntakeInput
    payments?: PaymentUncheckedCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendations?: RecommendationUpdateManyWithoutIntakeNestedInput
    payments?: PaymentUpdateManyWithoutIntakeNestedInput
  }

  export type WeddingIntakeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendations?: RecommendationUncheckedUpdateManyWithoutIntakeNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutIntakeNestedInput
  }

  export type WeddingIntakeCreateManyInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
  }

  export type WeddingIntakeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeddingIntakeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationCreateInput = {
    id?: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
    intake: WeddingIntakeCreateNestedOneWithoutRecommendationsInput
  }

  export type RecommendationUncheckedCreateInput = {
    id?: string
    intakeId: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
  }

  export type RecommendationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intake?: WeddingIntakeUpdateOneRequiredWithoutRecommendationsNestedInput
  }

  export type RecommendationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intakeId?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationCreateManyInput = {
    id?: string
    intakeId: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
  }

  export type RecommendationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    intakeId?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
    intake: WeddingIntakeCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    intakeId: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    intake?: WeddingIntakeUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intakeId?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    intakeId: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    intakeId?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RecommendationListRelationFilter = {
    every?: RecommendationWhereInput
    some?: RecommendationWhereInput
    none?: RecommendationWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type RecommendationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeddingIntakeCountOrderByAggregateInput = {
    id?: SortOrder
    weddingDate?: SortOrder
    guestCount?: SortOrder
    city?: SortOrder
    venueType?: SortOrder
    budgetBracket?: SortOrder
    budgetMidpoint?: SortOrder
    priorities?: SortOrder
    createdAt?: SortOrder
  }

  export type WeddingIntakeAvgOrderByAggregateInput = {
    guestCount?: SortOrder
    budgetMidpoint?: SortOrder
  }

  export type WeddingIntakeMaxOrderByAggregateInput = {
    id?: SortOrder
    weddingDate?: SortOrder
    guestCount?: SortOrder
    city?: SortOrder
    venueType?: SortOrder
    budgetBracket?: SortOrder
    budgetMidpoint?: SortOrder
    createdAt?: SortOrder
  }

  export type WeddingIntakeMinOrderByAggregateInput = {
    id?: SortOrder
    weddingDate?: SortOrder
    guestCount?: SortOrder
    city?: SortOrder
    venueType?: SortOrder
    budgetBracket?: SortOrder
    budgetMidpoint?: SortOrder
    createdAt?: SortOrder
  }

  export type WeddingIntakeSumOrderByAggregateInput = {
    guestCount?: SortOrder
    budgetMidpoint?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type WeddingIntakeScalarRelationFilter = {
    is?: WeddingIntakeWhereInput
    isNot?: WeddingIntakeWhereInput
  }

  export type RecommendationCountOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
  }

  export type RecommendationAvgOrderByAggregateInput = {
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
  }

  export type RecommendationMaxOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
  }

  export type RecommendationMinOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
  }

  export type RecommendationSumOrderByAggregateInput = {
    priorityRank?: SortOrder
    allocatedBudget?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    vendorName?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amountPaid?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    vendorName?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    intakeId?: SortOrder
    vendorCategory?: SortOrder
    vendorName?: SortOrder
    amountPaid?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amountPaid?: SortOrder
  }

  export type WeddingIntakeCreateprioritiesInput = {
    set: string[]
  }

  export type RecommendationCreateNestedManyWithoutIntakeInput = {
    create?: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput> | RecommendationCreateWithoutIntakeInput[] | RecommendationUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutIntakeInput | RecommendationCreateOrConnectWithoutIntakeInput[]
    createMany?: RecommendationCreateManyIntakeInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutIntakeInput = {
    create?: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput> | PaymentCreateWithoutIntakeInput[] | PaymentUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutIntakeInput | PaymentCreateOrConnectWithoutIntakeInput[]
    createMany?: PaymentCreateManyIntakeInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type RecommendationUncheckedCreateNestedManyWithoutIntakeInput = {
    create?: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput> | RecommendationCreateWithoutIntakeInput[] | RecommendationUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutIntakeInput | RecommendationCreateOrConnectWithoutIntakeInput[]
    createMany?: RecommendationCreateManyIntakeInputEnvelope
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutIntakeInput = {
    create?: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput> | PaymentCreateWithoutIntakeInput[] | PaymentUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutIntakeInput | PaymentCreateOrConnectWithoutIntakeInput[]
    createMany?: PaymentCreateManyIntakeInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WeddingIntakeUpdateprioritiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecommendationUpdateManyWithoutIntakeNestedInput = {
    create?: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput> | RecommendationCreateWithoutIntakeInput[] | RecommendationUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutIntakeInput | RecommendationCreateOrConnectWithoutIntakeInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutIntakeInput | RecommendationUpsertWithWhereUniqueWithoutIntakeInput[]
    createMany?: RecommendationCreateManyIntakeInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutIntakeInput | RecommendationUpdateWithWhereUniqueWithoutIntakeInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutIntakeInput | RecommendationUpdateManyWithWhereWithoutIntakeInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutIntakeNestedInput = {
    create?: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput> | PaymentCreateWithoutIntakeInput[] | PaymentUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutIntakeInput | PaymentCreateOrConnectWithoutIntakeInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutIntakeInput | PaymentUpsertWithWhereUniqueWithoutIntakeInput[]
    createMany?: PaymentCreateManyIntakeInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutIntakeInput | PaymentUpdateWithWhereUniqueWithoutIntakeInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutIntakeInput | PaymentUpdateManyWithWhereWithoutIntakeInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type RecommendationUncheckedUpdateManyWithoutIntakeNestedInput = {
    create?: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput> | RecommendationCreateWithoutIntakeInput[] | RecommendationUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: RecommendationCreateOrConnectWithoutIntakeInput | RecommendationCreateOrConnectWithoutIntakeInput[]
    upsert?: RecommendationUpsertWithWhereUniqueWithoutIntakeInput | RecommendationUpsertWithWhereUniqueWithoutIntakeInput[]
    createMany?: RecommendationCreateManyIntakeInputEnvelope
    set?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    disconnect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    delete?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    connect?: RecommendationWhereUniqueInput | RecommendationWhereUniqueInput[]
    update?: RecommendationUpdateWithWhereUniqueWithoutIntakeInput | RecommendationUpdateWithWhereUniqueWithoutIntakeInput[]
    updateMany?: RecommendationUpdateManyWithWhereWithoutIntakeInput | RecommendationUpdateManyWithWhereWithoutIntakeInput[]
    deleteMany?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutIntakeNestedInput = {
    create?: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput> | PaymentCreateWithoutIntakeInput[] | PaymentUncheckedCreateWithoutIntakeInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutIntakeInput | PaymentCreateOrConnectWithoutIntakeInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutIntakeInput | PaymentUpsertWithWhereUniqueWithoutIntakeInput[]
    createMany?: PaymentCreateManyIntakeInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutIntakeInput | PaymentUpdateWithWhereUniqueWithoutIntakeInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutIntakeInput | PaymentUpdateManyWithWhereWithoutIntakeInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type WeddingIntakeCreateNestedOneWithoutRecommendationsInput = {
    create?: XOR<WeddingIntakeCreateWithoutRecommendationsInput, WeddingIntakeUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: WeddingIntakeCreateOrConnectWithoutRecommendationsInput
    connect?: WeddingIntakeWhereUniqueInput
  }

  export type WeddingIntakeUpdateOneRequiredWithoutRecommendationsNestedInput = {
    create?: XOR<WeddingIntakeCreateWithoutRecommendationsInput, WeddingIntakeUncheckedCreateWithoutRecommendationsInput>
    connectOrCreate?: WeddingIntakeCreateOrConnectWithoutRecommendationsInput
    upsert?: WeddingIntakeUpsertWithoutRecommendationsInput
    connect?: WeddingIntakeWhereUniqueInput
    update?: XOR<XOR<WeddingIntakeUpdateToOneWithWhereWithoutRecommendationsInput, WeddingIntakeUpdateWithoutRecommendationsInput>, WeddingIntakeUncheckedUpdateWithoutRecommendationsInput>
  }

  export type WeddingIntakeCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<WeddingIntakeCreateWithoutPaymentsInput, WeddingIntakeUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: WeddingIntakeCreateOrConnectWithoutPaymentsInput
    connect?: WeddingIntakeWhereUniqueInput
  }

  export type WeddingIntakeUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<WeddingIntakeCreateWithoutPaymentsInput, WeddingIntakeUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: WeddingIntakeCreateOrConnectWithoutPaymentsInput
    upsert?: WeddingIntakeUpsertWithoutPaymentsInput
    connect?: WeddingIntakeWhereUniqueInput
    update?: XOR<XOR<WeddingIntakeUpdateToOneWithWhereWithoutPaymentsInput, WeddingIntakeUpdateWithoutPaymentsInput>, WeddingIntakeUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type RecommendationCreateWithoutIntakeInput = {
    id?: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
  }

  export type RecommendationUncheckedCreateWithoutIntakeInput = {
    id?: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
  }

  export type RecommendationCreateOrConnectWithoutIntakeInput = {
    where: RecommendationWhereUniqueInput
    create: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput>
  }

  export type RecommendationCreateManyIntakeInputEnvelope = {
    data: RecommendationCreateManyIntakeInput | RecommendationCreateManyIntakeInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutIntakeInput = {
    id?: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutIntakeInput = {
    id?: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutIntakeInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput>
  }

  export type PaymentCreateManyIntakeInputEnvelope = {
    data: PaymentCreateManyIntakeInput | PaymentCreateManyIntakeInput[]
    skipDuplicates?: boolean
  }

  export type RecommendationUpsertWithWhereUniqueWithoutIntakeInput = {
    where: RecommendationWhereUniqueInput
    update: XOR<RecommendationUpdateWithoutIntakeInput, RecommendationUncheckedUpdateWithoutIntakeInput>
    create: XOR<RecommendationCreateWithoutIntakeInput, RecommendationUncheckedCreateWithoutIntakeInput>
  }

  export type RecommendationUpdateWithWhereUniqueWithoutIntakeInput = {
    where: RecommendationWhereUniqueInput
    data: XOR<RecommendationUpdateWithoutIntakeInput, RecommendationUncheckedUpdateWithoutIntakeInput>
  }

  export type RecommendationUpdateManyWithWhereWithoutIntakeInput = {
    where: RecommendationScalarWhereInput
    data: XOR<RecommendationUpdateManyMutationInput, RecommendationUncheckedUpdateManyWithoutIntakeInput>
  }

  export type RecommendationScalarWhereInput = {
    AND?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
    OR?: RecommendationScalarWhereInput[]
    NOT?: RecommendationScalarWhereInput | RecommendationScalarWhereInput[]
    id?: UuidFilter<"Recommendation"> | string
    intakeId?: UuidFilter<"Recommendation"> | string
    vendorCategory?: StringFilter<"Recommendation"> | string
    priorityRank?: IntFilter<"Recommendation"> | number
    allocatedBudget?: IntFilter<"Recommendation"> | number
    rationale?: StringFilter<"Recommendation"> | string
    createdAt?: DateTimeFilter<"Recommendation"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutIntakeInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutIntakeInput, PaymentUncheckedUpdateWithoutIntakeInput>
    create: XOR<PaymentCreateWithoutIntakeInput, PaymentUncheckedCreateWithoutIntakeInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutIntakeInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutIntakeInput, PaymentUncheckedUpdateWithoutIntakeInput>
  }

  export type PaymentUpdateManyWithWhereWithoutIntakeInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutIntakeInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: UuidFilter<"Payment"> | string
    intakeId?: UuidFilter<"Payment"> | string
    vendorCategory?: StringFilter<"Payment"> | string
    vendorName?: StringFilter<"Payment"> | string
    amountPaid?: IntFilter<"Payment"> | number
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type WeddingIntakeCreateWithoutRecommendationsInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeUncheckedCreateWithoutRecommendationsInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeCreateOrConnectWithoutRecommendationsInput = {
    where: WeddingIntakeWhereUniqueInput
    create: XOR<WeddingIntakeCreateWithoutRecommendationsInput, WeddingIntakeUncheckedCreateWithoutRecommendationsInput>
  }

  export type WeddingIntakeUpsertWithoutRecommendationsInput = {
    update: XOR<WeddingIntakeUpdateWithoutRecommendationsInput, WeddingIntakeUncheckedUpdateWithoutRecommendationsInput>
    create: XOR<WeddingIntakeCreateWithoutRecommendationsInput, WeddingIntakeUncheckedCreateWithoutRecommendationsInput>
    where?: WeddingIntakeWhereInput
  }

  export type WeddingIntakeUpdateToOneWithWhereWithoutRecommendationsInput = {
    where?: WeddingIntakeWhereInput
    data: XOR<WeddingIntakeUpdateWithoutRecommendationsInput, WeddingIntakeUncheckedUpdateWithoutRecommendationsInput>
  }

  export type WeddingIntakeUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutIntakeNestedInput
  }

  export type WeddingIntakeUncheckedUpdateWithoutRecommendationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutIntakeNestedInput
  }

  export type WeddingIntakeCreateWithoutPaymentsInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    recommendations?: RecommendationCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeUncheckedCreateWithoutPaymentsInput = {
    id?: string
    weddingDate: Date | string
    guestCount: number
    city: string
    venueType: string
    budgetBracket: string
    budgetMidpoint: number
    priorities?: WeddingIntakeCreateprioritiesInput | string[]
    createdAt?: Date | string
    recommendations?: RecommendationUncheckedCreateNestedManyWithoutIntakeInput
  }

  export type WeddingIntakeCreateOrConnectWithoutPaymentsInput = {
    where: WeddingIntakeWhereUniqueInput
    create: XOR<WeddingIntakeCreateWithoutPaymentsInput, WeddingIntakeUncheckedCreateWithoutPaymentsInput>
  }

  export type WeddingIntakeUpsertWithoutPaymentsInput = {
    update: XOR<WeddingIntakeUpdateWithoutPaymentsInput, WeddingIntakeUncheckedUpdateWithoutPaymentsInput>
    create: XOR<WeddingIntakeCreateWithoutPaymentsInput, WeddingIntakeUncheckedCreateWithoutPaymentsInput>
    where?: WeddingIntakeWhereInput
  }

  export type WeddingIntakeUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: WeddingIntakeWhereInput
    data: XOR<WeddingIntakeUpdateWithoutPaymentsInput, WeddingIntakeUncheckedUpdateWithoutPaymentsInput>
  }

  export type WeddingIntakeUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendations?: RecommendationUpdateManyWithoutIntakeNestedInput
  }

  export type WeddingIntakeUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weddingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestCount?: IntFieldUpdateOperationsInput | number
    city?: StringFieldUpdateOperationsInput | string
    venueType?: StringFieldUpdateOperationsInput | string
    budgetBracket?: StringFieldUpdateOperationsInput | string
    budgetMidpoint?: IntFieldUpdateOperationsInput | number
    priorities?: WeddingIntakeUpdateprioritiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recommendations?: RecommendationUncheckedUpdateManyWithoutIntakeNestedInput
  }

  export type RecommendationCreateManyIntakeInput = {
    id?: string
    vendorCategory: string
    priorityRank: number
    allocatedBudget: number
    rationale: string
    createdAt?: Date | string
  }

  export type PaymentCreateManyIntakeInput = {
    id?: string
    vendorCategory: string
    vendorName: string
    amountPaid: number
    paymentDate: Date | string
    createdAt?: Date | string
  }

  export type RecommendationUpdateWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationUncheckedUpdateWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecommendationUncheckedUpdateManyWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    priorityRank?: IntFieldUpdateOperationsInput | number
    allocatedBudget?: IntFieldUpdateOperationsInput | number
    rationale?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutIntakeInput = {
    id?: StringFieldUpdateOperationsInput | string
    vendorCategory?: StringFieldUpdateOperationsInput | string
    vendorName?: StringFieldUpdateOperationsInput | string
    amountPaid?: IntFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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
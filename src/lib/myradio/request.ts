import qs from "qs";
import store from "../../store";

export interface MyRadioApiConfig {
  apiBase: string;
  apiKey?: string;
}

type HttpMethod = "GET" | "POST" | "PUT";

export class MyRadioApiError extends Error {}

export type MyRadioApiRequestor<TArgs, TRes> = (
  cfgOrArgsOrOid?: MyRadioApiConfig | TArgs | number,
  argsOrCfg?: MyRadioApiConfig | TArgs,
  cfg?: MyRadioApiConfig
) => Promise<TRes>;

async function makeMyradioRequest(
  config: MyRadioApiConfig | null,
  method: HttpMethod,
  path: string,
  args: any
): Promise<any> {
  let conf: MyRadioApiConfig;
  if (config === null) {
    conf = store.getState().GlobalConfig.myradio;
  } else {
    conf = config;
  }
  console.log(conf);
  let query: any = {};
  if (typeof conf.apiKey === "string") {
    query["api_key"] = conf.apiKey;
  }

  let resp: Response;
  if (method === "GET") {
    query = { ...query, ...args };
    resp = await fetch(conf.apiBase + path + "?" + qs.stringify(query), {
      method: "GET",
      credentials: "include"
    });
  } else {
    resp = await fetch(conf.apiBase + path + "?" + qs.stringify(query), {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(args),
      credentials: "include"
    });
  }
  const json = await resp.json();
  if (json.status !== "OK") {
    throw new MyRadioApiError(json.payload);
  }
  return json.payload;
}

/*
  There are many calling conventions in use in the MyRadio API:
  - /class/action
  - /class/{thingid}/action
  - /class/action/{argument}
*/

/**
 * Create a requestor for an API endpoint.
 * @param method
 * @param path
 * @example
 * ```ts
 *   const quotes = {
 *     all: makeNoArgRequestor<Quote[]>("GET", "/quotes/all")
 *   };
 *
 *   console.log(await quotes.all(config));
 * ```
 */
export function makeNoArgRequestor<TRes extends {}>(
  method: HttpMethod,
  path: string
) {
  return async (config?: MyRadioApiConfig): Promise<TRes> => {
    return await makeMyradioRequest(
      typeof config === "undefined" ? null : config,
      method,
      path,
      {}
    );
  };
}

/**
 * Create a requestor for an API endpoint.
 * @param method
 * @param path
 * @example
 * ```ts
 *   const quotes = {
 *     all: makeSimpleRequestor<{}, Quote[]>("GET", "/quotes/all")
 *   };
 *
 *   console.log(await quotes.all(config, {}));
 * ```
 */
export function makeSimpleRequestor<TArgs extends {}, TRes extends {}>(
  method: HttpMethod,
  path: string
) {
  return async (args: TArgs, config?: MyRadioApiConfig): Promise<TRes> => {
    return await makeMyradioRequest(
      typeof config === "undefined" ? null : config,
      method,
      path,
      args
    );
  };
}

/**
 * Creates a requestor for an API endpoint that takes an argument in the path.
 *
 * In the path, the spot to insert the arg MUST be indicated using {1}.
 * @param method
 * @param path
 */
export function makeArgRequestor<TArg1 extends string, TRes extends {}>(
  method: HttpMethod,
  path: string
) {
  return async (arg: TArg1, config?: MyRadioApiConfig): Promise<TRes> => {
    return await makeMyradioRequest(
      typeof config === "undefined" ? null : config,
      method,
      path.replace(/\{1\}/, arg),
      {}
    );
  };
}

/**
 * Creates a requestor for an API endpoint that takes an object ID.
 *
 * Normally this would be handled by makeNoArgRequestor, but since this use case is so common,
 * (and for type safety), a dedicated requestor is provided.
 *
 * In the path, the spot to insert the ID MUST be indicated using {id}.
 * @param method
 * @param path
 */
export function makeNoArgObjectRequestor<TRes extends {}>(
  method: HttpMethod,
  path: string
) {
  return async (objectId: number, config?: MyRadioApiConfig): Promise<TRes> => {
    return await makeMyradioRequest(
      typeof config === "undefined" ? null : config,
      method,
      path.replace(/{id}/, objectId.toString(10)),
      {}
    );
  };
}

/**
 * Creates a requestor for an API endpoint that takes an object ID.
 *
 * Normally this would be handled by makeSimpleRequestor, but since this use case is so common,
 * (and for type safety), a dedicated requestor is provided.
 *
 * In the path, the spot to insert the ID MUST be indicated using {id}.
 * @param method
 * @param path
 */
export function makeObjectRequestor<TArgs extends {}, TRes extends {}>(
  method: HttpMethod,
  path: string
) {
  return async (
    objectId: number,
    args: TArgs,
    config?: MyRadioApiConfig
  ): Promise<TRes> => {
    return await makeMyradioRequest(
      typeof config === "undefined" ? null : config,
      method,
      path.replace(/{id}/, objectId.toString(10)),
      args
    );
  };
}

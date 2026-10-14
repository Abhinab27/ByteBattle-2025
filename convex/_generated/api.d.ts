/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admins from "../admins.js";
import type * as countTeam from "../countTeam.js";
import type * as email from "../email.js";
import type * as files from "../files.js";
import type * as questions from "../questions.js";
import type * as round1 from "../round1.js";
import type * as round2 from "../round2.js";
import type * as teamRegistrations from "../teamRegistrations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admins: typeof admins;
  countTeam: typeof countTeam;
  email: typeof email;
  files: typeof files;
  questions: typeof questions;
  round1: typeof round1;
  round2: typeof round2;
  teamRegistrations: typeof teamRegistrations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

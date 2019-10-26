import { makeAuthService } from "./services/auth";

export const createApi = () => ({
  auth: makeAuthService()
});

export type Api = ReturnType<typeof createApi>;

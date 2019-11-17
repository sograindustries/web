import { makeAuthService } from "./services/auth";
import { makeEcgService } from "./services/ecg";

export const createApi = () => ({
  auth: makeAuthService(),
  ecg: makeEcgService()
});

export type Api = ReturnType<typeof createApi>;

import { combineReducers, Dispatch, MiddlewareAPI, AnyAction } from "redux";
import { SessionAction } from "./session/actions";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { DeepReadonly } from "utility-types";
import { reducer as session } from "./session/reducers";

export const rootReducer = combineReducers({
  session
});

type AppAction = SessionAction;
export type AppState = DeepReadonly<ReturnType<typeof rootReducer>>;
export type AppDispatch = ThunkDispatch<AppState, any, any>;
export type AppMiddleware = (
  api: MiddlewareAPI<Dispatch, AppState>
) => (next: AppDispatch) => (action: AppAction) => any;
export type AppThunk<R, Action extends AnyAction> = ThunkAction<
  R,
  AppState,
  {},
  Action
>;

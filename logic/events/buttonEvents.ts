import type { Action } from "../../types/common";

type ExecuteAction = <T>(action?: Action<T>) => Action<T>;
export const executeAction: ExecuteAction = (action) => (value) =>
  action?.(value);



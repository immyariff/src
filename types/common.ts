export type Action<T = void> = (value: T) => void;

export type AsyncAction<T = void> = (value: T) => Promise<void>;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Result<T, E = Error> =
  |(Record<"success", true> & Record<"data", T>)
  |(Record<"success", false> & Record<"error", E>);
  
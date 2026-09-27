import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";


export type Name = (firstName: string, lastName?: string) => string;

export const personName: Name = (firstName, lastName) =>
  pipe(
    O.fromNullable(lastName),
    O.fold(
      () => firstName,
      (name) => `${firstName} ${name}`,
    ),
  );

type Email = (emailAddress: string) => string;

export const personEmail: Email = (emailAddress) => emailAddress;

import { writeFile } from "node:fs/promises";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import createPdf from "../createPdf";
import testInvoice from "./testInvoice";

const toError = (error: unknown): Error =>
  pipe(error, O.fromPredicate((value): value is Error => value instanceof Error),
    O.getOrElse(() => new Error(String(error))));

const generateTestPdf = (): TE.TaskEither<Error, void> =>
  pipe(testInvoice, E.fold(TE.left, invoice => TE.tryCatch(async () => {
    await writeFile("invoice.pdf", await createPdf(invoice));
  }, toError)));

export default generateTestPdf;

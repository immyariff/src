import { pipe } from "fp-ts/function";
import { personName, personEmail } from "../utils/common/commonTypes";

type Provider = {
  providerName: string;
  abn: string;
  email: string;
};

const createProvider = (
  providerName: string,
  abn: string,
  email: string,
): Provider =>
  pipe(
    {
      providerName: personName(providerName),
      abn,
      email,
    },
    (provider) => ({
      ...provider,
      abn: abn,
      email: personEmail(provider.email),
    }),
  );
export default createProvider;

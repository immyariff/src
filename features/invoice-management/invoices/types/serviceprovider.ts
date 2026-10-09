import { pipe } from "fp-ts/function";

import type { Person } from "../../../invoice-management/utils/person/person";

export type ServiceProvider = Person & {
  readonly abn: string;
};

const serviceProvider = (
  serviceProviderName: Person["name"],
  serviceProviderEmail: Person["email"],
  serviceProviderAbn: ServiceProvider["abn"],
): ServiceProvider =>
  pipe({
    name: serviceProviderName,
    email: serviceProviderEmail,
    abn: serviceProviderAbn,
  });

export default serviceProvider;

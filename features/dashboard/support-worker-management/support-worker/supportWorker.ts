import { Person } from "../../managements/person/person";

type ABN = (abn: string) => string;
export type SupportWorker = Person & {
  readonly ABN: ABN;
};

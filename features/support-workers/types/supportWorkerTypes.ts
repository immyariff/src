import { pipe } from "fp-ts/lib/function";
import {
  type Person,
  name,
  email,
  phoneNumber,
} from "../../../types/personTypes";

type Abn = (abn: number) => number;
type BankDetails = (bsb: string, accountNumber: string) => string;

type SupportWorker = Person & {
  abn: Abn;
  bankDetails: BankDetails;
};
const supportWorker: SupportWorker = {
  personName: name("Jane", "Smith"),
  personEmail: email("jamesmith@gmail.com"),
  personPhoneNumber: phoneNumber("987-654-3210"),
  abn: (abnNum) => abnNum,
  bankDetails: (bsb, accountNumber) => `${bsb} ${accountNumber}`,
};
pipe(supportWorker, (supportWorker) => {
  console.log(`Support Worker Name: ${supportWorker.personName}`);
  console.log(`Support Worker Email: ${supportWorker.personEmail}`);
  console.log(
    `Support Worker Phone Number: ${supportWorker.personPhoneNumber}`,
  );
  console.log(`Support Worker ABN: ${supportWorker.abn(123456789)}`);
  console.log(
    `Support Worker Bank Details: ${supportWorker.bankDetails("123456", "987654321")}`,
  );
});

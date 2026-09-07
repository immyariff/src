import { pipe } from "fp-ts/lib/function";
import {
  type Person,
  name,
  email,
  phoneNumber,
} from "../../../../../types/personTypes";

type NdisNumber = (ndisNumber: number) => number;

type Client = Person & {
  ndisNumber: NdisNumber;
};

const client: Client = {
  personName: name("Tom", "Jones"),
  personEmail: email("tomjones@gmail.com"),
  personPhoneNumber: phoneNumber("555-1234"),
  ndisNumber: (ndisNum) => ndisNum,
};

pipe(client, (client) => {
  console.log(`Client Name: ${client.personName}`);
  console.log(`Client Email: ${client.personEmail}`);
  console.log(`Client Phone Number: ${client.personPhoneNumber}`);
  console.log(`Client NDIS Number: ${client.ndisNumber(123456789)}`);
});

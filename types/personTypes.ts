import { pipe } from "fp-ts/lib/function";
type Name = (firstName: string, lastName: string) => string;
type Email = (email: string) => string;
type PhoneNumber = (phoneNumber: string) => string;

export const name: Name = (firstName, lastName) => `${firstName} ${lastName}`;
export const email: Email = (emailAddress) => emailAddress;
export const phoneNumber: PhoneNumber = (phoneNumber) => phoneNumber;

type PersonName = ReturnType<typeof name>
type PersonEmail = ReturnType<typeof email>
type PersonPhoneNumber = ReturnType<typeof phoneNumber>

export type Person = {
    personName: PersonName,
    personEmail: PersonEmail,
    personPhoneNumber: PersonPhoneNumber
}

const person:Person = {
    personName: name("John", "Doe"),
    personEmail: email("john.doe@example.com"),
    personPhoneNumber: phoneNumber("123-456-7890")
};
pipe(
  person,
  (person) => {
    console.log(`Person Name: ${person.personName}`);
    console.log(`Person Email: ${person.personEmail}`);
    console.log(`Person Phone Number: ${person.personPhoneNumber}`);
  }
);
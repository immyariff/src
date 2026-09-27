import { pipe } from "fp-ts/function";
import { personName, personEmail } from "../utils/common/commonTypes";
type Id = (id: string) => string;

const personId: Id = (id) => id;

type NdisParticipant = {
  name: string;
  id:  string;
  email: string;
};

const participant = (
  firstName: string,
  lastName: string,
  id: string,
  email: string,
): NdisParticipant =>
  pipe(
    {
      name: personName(firstName, lastName),
      id,
      email,
    },
    (participant) => ({
      ...participant,
      id: personId(participant.id),
      email: personEmail(participant.email),
    }),
  );

export default participant;

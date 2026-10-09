import { pipe } from "fp-ts/function";

import type { Person } from "../../../invoice-management/utils/person/person";
export type NDISParticipant = Person & {
  readonly participantNdisNumber: string;
};

const ndisParticipant = (
  participantFullName: NDISParticipant["name"],
  participantEemail: NDISParticipant["email"],
  participantNdisNumber: NDISParticipant["participantNdisNumber"],
): NDISParticipant =>
  pipe(
    {
      name: participantFullName,
      email: participantEemail,
    },
    (participant) => ({
      ...participant,
      participantNdisNumber,
    }),
  );

export default ndisParticipant;

import type { PDFPage } from "pdf-lib";

import type { NDISParticipant } from "../../types/ndisParticipant";
import type { PdfPosition } from "../types/pdfTypes";

const drawParticipantDetails = (
  page: PDFPage,
  participant: NDISParticipant,
  position: PdfPosition,
): void => {
  page.drawText("BILL TO", {
    x: position.x,
    y: position.y,
    size: 10,
  });

  page.drawText(participant.name, {
    x: position.x,
    y: position.y - 18,
    size: 11,
  });

  page.drawText(
    `NDIS Participant Number: ${participant.participantNdisNumber}`,
    {
      x: position.x,
      y: position.y - 36,
      size: 10,
    },
  );

  page.drawText(participant.email, {
    x: position.x,
    y: position.y - 54,
    size: 10,
  });
};

export default drawParticipantDetails;

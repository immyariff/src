import type { PDFPage } from "pdf-lib";

import type { ServiceProvider } from "../../../types/serviceprovider";
import type { PdfPosition } from "../types/pdfTypes";

const drawProviderDetails = (
  page: PDFPage,
  provider: ServiceProvider,
  position: PdfPosition,
): void => {
  page.drawText(provider.name.fullName, {
    x: position.x,
    y: position.y,
    size: 12,
  });

  page.drawText(`ABN: ${provider.abn}`, {
    x: position.x,
    y: position.y - 18,
    size: 10,
  });

  page.drawText(provider.email.email, {
    x: position.x,
    y: position.y - 36,
    size: 10,
  });
};

export default drawProviderDetails;

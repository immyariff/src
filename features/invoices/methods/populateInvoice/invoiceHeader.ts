//import {Compose} from "../../../../utils/common/functions/compose";

type InvoiceId = (invoiceId: string) => string;
type InvoiceNumber = (invoiceNumber: number) => number;

export type InvoiceHeader = (
  invoiceId: InvoiceId,
  invoiceNumber: InvoiceNumber,
) => void;

export const invoiceId: InvoiceId = (invoiceId) => invoiceId;
export const invoiceNumber: InvoiceNumber = (invoiceNumber) => invoiceNumber;

const invoiceID = invoiceId("INV-001");
const invoiceNum = invoiceNumber(1);

const invoiceHeader: InvoiceHeader = () =>
  console.log(`Invoice ID: ${invoiceID}\nInvoice Number: ${invoiceNum}`);

export default invoiceHeader;

import type { NdisLineItemId } from "../../../types/ndisLineItem";
import type { RoleId } from "../../../types/role";

export type InvoiceItemId = (invoiceItemId: string) => string;

export interface InvoiceItem {
  readonly id: InvoiceItemId;
  readonly invoiceId: string;
  readonly roleId: RoleId;
  readonly ndisLineItemId: NdisLineItemId;
  readonly date: Date;
  readonly hours: number;
  readonly rate: number;
  readonly amount: number;
}

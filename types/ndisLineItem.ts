export type NdisLineItemId = string;

export interface NdisLineItem {
  readonly id: NdisLineItemId;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
}
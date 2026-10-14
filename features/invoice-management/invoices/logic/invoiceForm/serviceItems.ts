import type {
  ServiceItemField,
  ServiceItemForm,
  UpdateServiceItem,
} from "../../types/invoiceForm";
import { getToday } from "./date";

export type CreateEmptyServiceItem = () => ServiceItemForm;
export type CalculateServiceItemAmount = (item: ServiceItemForm) => number;
export type CalculateSubtotal = (
  items: ReadonlyArray<ServiceItemForm>,
) => number;
export type AddServiceItem = (
  items: ReadonlyArray<ServiceItemForm>,
) => ReadonlyArray<ServiceItemForm>;
export type RemoveServiceItem = (
  items: ReadonlyArray<ServiceItemForm>,
  index: number,
) => ReadonlyArray<ServiceItemForm>;

export const createEmptyServiceItem: CreateEmptyServiceItem = () => ({
  date: getToday(),
  description: "",
  hours: "",
  rate: "",
});

export const calculateServiceItemAmount: CalculateServiceItemAmount = (item) =>
  Number(item.hours) * Number(item.rate);

export const calculateSubtotal: CalculateSubtotal = (items) =>
  items.reduce((sum, item) => sum + calculateServiceItemAmount(item), 0);

export const updateServiceItem: UpdateServiceItem = (
  items,
  index,
  field: ServiceItemField,
  value,
) =>
  items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, [field]: value } : item,
  );

export const addServiceItem: AddServiceItem = (items) => [
  ...items,
  createEmptyServiceItem(),
];

export const removeServiceItem: RemoveServiceItem = (items, index) =>
  items.length <= 1
    ? items
    : items.filter((_item, itemIndex) => itemIndex !== index);

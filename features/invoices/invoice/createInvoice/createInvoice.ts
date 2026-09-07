import { pipe } from "fp-ts/function";
import {invoiceData, createInvoice, printInvoice } from "./types";


pipe(invoiceData, createInvoice, printInvoice);

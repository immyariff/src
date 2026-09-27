import React from "react";
import participant from "../../../../features/invoice-management/types/ndisparticipant/ndisparticipant";
import createProvider from "../../../invoice-management/types/serviceprovider/serviceprovider";

const joeDoe = participant("Joe", " Doe", "4300123456", "joedoe@gmail.com");

const rocky = createProvider(
  "Rocky Babo Baboa Boxing Co",
  "123 456 789",
  "rocky@rocky.com",
);
const DisplayProviderDetails = (): React.ReactElement => {
  return (
    <>
      <h1 className="text-2xl font-bold">{rocky.providerName}</h1>

      <p className="mt-2 text-sm text-gray-600">ABN: {rocky.abn}</p>

      <p className="text-sm text-gray-600">Email: {rocky.email}</p>
    </>
  );
};
const DisplayParticipantDetails = (): React.ReactElement => {
  return (
    <>
      <div className="mt-6">
        <p className="mb-2 text-sm font-semibold text-gray-900">Bill To:</p>

        <p className="text-base font-semibold text-gray-900">{joeDoe.name}</p>

        <p className="mt-1 text-sm text-gray-600">NDIS Number: {joeDoe.id}</p>

        <p className="text-sm text-gray-600">Email: {joeDoe.email}</p>
      </div>
    </>
  );
};

const DisplayInvoiceDetails = (): React.ReactElement => {
  return (
    <>
      {" "}
      <div className="w-64">
        <h2 className="text-right text-3xl font-bold tracking-wide">INVOICE</h2>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between gap-6">
            <span className="text-sm text-gray-600">Invoice Number:</span>

            <span className="text-sm font-semibold">INV-00001</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-sm text-gray-600">Invoice Date:</span>

            <span className="text-sm font-semibold">21/09/2026</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-sm text-gray-600">
              NDIS Participant Name:
            </span>

            <span className="text-sm font-semibold">{joeDoe.name}</span>
          </div>{" "}
        </div>
      </div>
    </>
  );
};
const InvoiceHeader = (): React.ReactElement => {
  return (
    <>
      {/* Invoice Header */}
      <div className="flex items-start justify-between border-b border-gray-300 pb-6">
        {/* Provider and Participant Details */}
        <div className="flex flex-col">
          <DisplayProviderDetails />
          {/* Participant Details */}
          <DisplayParticipantDetails />
        </div>

        {/* Invoice Details */}
        <DisplayInvoiceDetails />
        {/* <div className="flex justify-between gap-6">
                <span className="text-sm text-gray-600">
                  Payment Due Date:
                </span>

                <span className="text-sm font-semibold">
                  25/09/2026
                </span>
              </div> */}
      </div>
    </>
  );
};
const InvoiceTable = (): React.ReactElement => {
  return (
    <>
      <div className="mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="px-3 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-3 py-3 text-left text-sm font-semibold">
                Description
              </th>

              <th className="px-3 py-3 text-right text-sm font-semibold">
                Hours
              </th>

              <th className="px-3 py-3 text-right text-sm font-semibold">
                Rate
              </th>

              <th className="px-3 py-3 text-right text-sm font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-3 py-4 text-sm">18/09/2026</td>

              <td className="px-3 py-4 text-sm">Support Worker Services</td>

              <td className="px-3 py-4 text-right text-sm">4.00</td>

              <td className="px-3 py-4 text-right text-sm">$65.00</td>

              <td className="px-3 py-4 text-right text-sm font-medium">
                $260.00
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-3 py-4 text-sm">19/09/2026</td>

              <td className="px-3 py-4 text-sm">Community Access Support</td>

              <td className="px-3 py-4 text-right text-sm">3.00</td>

              <td className="px-3 py-4 text-right text-sm">$65.00</td>

              <td className="px-3 py-4 text-right text-sm font-medium">
                $195.00
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-3 py-4 text-sm">20/09/2026</td>

              <td className="px-3 py-4 text-sm">Personal Care Support</td>

              <td className="px-3 py-4 text-right text-sm">5.00</td>

              <td className="px-3 py-4 text-right text-sm">$65.00</td>

              <td className="px-3 py-4 text-right text-sm font-medium">
                $325.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
const DisplayInvoiceTotal = (): React.ReactElement => {
  return (
    <>
      {" "}
      <div className="mt-8 flex justify-end">
        <div className="w-64">
          <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
            <span className="text-lg font-semibold">Total Payment:</span>

            <span className="text-xl font-bold">$780.00</span>
          </div>
        </div>
      </div>
    </>
  );
};
const DisplayInvoiceFooter = (): React.ReactElement => {
  return (
    <>
      <div className="mt-16 border-t border-gray-200 pt-4">
        <p className="text-center text-xs text-gray-500">
          Thank you for your business.
        </p>
      </div>
    </>
  );
};
const InvoiceDetailsForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div
        id="invoice"
        className="mx-auto min-h-[297mm] w-[210mm] bg-white px-[15mm] py-[15mm] text-gray-900 shadow-lg"
      >
        {/* Invoice Header */}
        <InvoiceHeader />

        {/* Invoice Items */}
        <InvoiceTable />
        {/* Invoice Total */}
        <DisplayInvoiceTotal />

        {/* Footer */}
        <DisplayInvoiceFooter />
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;

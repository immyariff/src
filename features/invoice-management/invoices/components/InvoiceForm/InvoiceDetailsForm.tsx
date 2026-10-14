import React, { useState } from "react";

import type { ServiceProvider } from "../../types/serviceprovider";
import participant from "../../../../../features/dashboard/managements/client-management/clientTypes";
import loadBillerDetails from "../../preload/billerDetails";

const joeDoe = participant(
  { fullName: "Joe Doe" },
  { email: "joedoe@gmail.com" },
  "1234567890",
);

type DisplayProviderDetailsProps = {
  readonly biller: ServiceProvider;
  readonly onBillerChange: (biller: ServiceProvider) => void;
};

const DisplayProviderDetails = ({
  biller,
  onBillerChange,
}: DisplayProviderDetailsProps): React.ReactElement => (
  <div className="space-y-3">
    <div>
      <label htmlFor="biller-name" className="mb-1 block text-sm font-medium">
        Biller Name
      </label>

      <input
        id="biller-name"
        type="text"
        value={biller.name.fullName}
        onChange={(event) =>
          onBillerChange({
            ...biller,
            name: {
              ...biller.name,
              fullName: event.target.value,
            },
          })
        }
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label htmlFor="biller-abn" className="mb-1 block text-sm font-medium">
        ABN
      </label>

      <input
        id="biller-abn"
        type="text"
        value={biller.abn}
        onChange={(event) =>
          onBillerChange({
            ...biller,
            abn: event.target.value,
          })
        }
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>

    <div>
      <label htmlFor="biller-email" className="mb-1 block text-sm font-medium">
        Email
      </label>

      <input
        id="biller-email"
        type="email"
        value={biller.email.email}
        onChange={(event) =>
          onBillerChange({
            ...biller,
            email: {
              ...biller.email,
              email: event.target.value,
            },
          })
        }
        className="w-full rounded border border-gray-300 px-3 py-2"
      />
    </div>
  </div>
);

const DisplayParticipantDetails = (): React.ReactElement => (
  <div className="mt-6">
    <p className="mb-2 text-sm font-semibold text-gray-900">Bill To:</p>

    <p className="text-base font-semibold text-gray-900">
      {joeDoe.name.fullName}
    </p>

    <p className="mt-1 text-sm text-gray-600">
      NDIS Number: {joeDoe.participantNdisNumber}
    </p>

    <p className="text-sm text-gray-600">Email: {joeDoe.email.email}</p>
  </div>
);

const DisplayInvoiceDetails = (): React.ReactElement => (
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
        <span className="text-sm text-gray-600">NDIS Participant Name:</span>
        <span className="text-sm font-semibold">{joeDoe.name.fullName}</span>
      </div>
    </div>
  </div>
);

type InvoiceHeaderProps = {
  readonly biller: ServiceProvider;
  readonly onBillerChange: (biller: ServiceProvider) => void;
};

const InvoiceHeader = ({
  biller,
  onBillerChange,
}: InvoiceHeaderProps): React.ReactElement => (
  <div className="flex items-start justify-between border-b border-gray-300 pb-6">
    <div className="flex flex-col">
      <DisplayProviderDetails biller={biller} onBillerChange={onBillerChange} />

      <DisplayParticipantDetails />
    </div>

    <DisplayInvoiceDetails />
  </div>
);

const InvoiceTable = (): React.ReactElement => (
  <div className="mt-10">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-900">
          <th className="px-3 py-3 text-left text-sm font-semibold">Date</th>
          <th className="px-3 py-3 text-left text-sm font-semibold">
            Description
          </th>
          <th className="px-3 py-3 text-right text-sm font-semibold">Hours</th>
          <th className="px-3 py-3 text-right text-sm font-semibold">Rate</th>
          <th className="px-3 py-3 text-right text-sm font-semibold">Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b border-gray-200">
          <td className="px-3 py-4 text-sm">18/09/2026</td>
          <td className="px-3 py-4 text-sm">Support Worker Services</td>
          <td className="px-3 py-4 text-right text-sm">4.00</td>
          <td className="px-3 py-4 text-right text-sm">$65.00</td>
          <td className="px-3 py-4 text-right text-sm font-medium">$260.00</td>
        </tr>

        <tr className="border-b border-gray-200">
          <td className="px-3 py-4 text-sm">19/09/2026</td>
          <td className="px-3 py-4 text-sm">Community Access Support</td>
          <td className="px-3 py-4 text-right text-sm">3.00</td>
          <td className="px-3 py-4 text-right text-sm">$65.00</td>
          <td className="px-3 py-4 text-right text-sm font-medium">$195.00</td>
        </tr>

        <tr className="border-b border-gray-200">
          <td className="px-3 py-4 text-sm">20/09/2026</td>
          <td className="px-3 py-4 text-sm">Personal Care Support</td>
          <td className="px-3 py-4 text-right text-sm">5.00</td>
          <td className="px-3 py-4 text-right text-sm">$65.00</td>
          <td className="px-3 py-4 text-right text-sm font-medium">$325.00</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DisplayInvoiceTotal = (): React.ReactElement => (
  <div className="mt-8 flex justify-end">
    <div className="w-64">
      <div className="flex items-center justify-between border-t-2 border-gray-900 pt-4">
        <span className="text-lg font-semibold">Total Payment:</span>
        <span className="text-xl font-bold">$780.00</span>
      </div>
    </div>
  </div>
);

const DisplayInvoiceFooter = (): React.ReactElement => (
  <div className="mt-16 border-t border-gray-200 pt-4">
    <p className="text-center text-xs text-gray-500">
      Thank you for your business.
    </p>
  </div>
);

const InvoiceDetailsForm = (): React.ReactElement => {
  const [biller, setBiller] = useState<ServiceProvider>(loadBillerDetails);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div
        id="invoice"
        className="mx-auto min-h-[297mm] w-[210mm] bg-white px-[15mm] py-[15mm] text-gray-900 shadow-lg"
      >
        <InvoiceHeader biller={biller} onBillerChange={setBiller} />

        <InvoiceTable />
        <DisplayInvoiceTotal />
        <DisplayInvoiceFooter />
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;

import React from "react";

const Button: React.FC = ({}) => {
  return (
    <>
      <button className="w-xl p-3 bg-blue-700 text-blue-300">
        Create Invoice
      </button>
      <button className="w-xl">Print Invoice</button>;
      <button className="w-xl">View Invoices</button>;
    </>
  );
};

export default Button;

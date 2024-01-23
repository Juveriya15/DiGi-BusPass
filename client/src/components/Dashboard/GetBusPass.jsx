import React from 'react'

const GetBusPass = () => {
  const {
    firstName,
    lastName,
    year,
    branch,
    phno,
    address,
    busFrom,
    busDestination,
    validDate,
    amount,
  } = user;

  return (
    <div className="invoice bg-white p-8 my-8 mx-auto max-w-md shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Bus Pass Invoice</h2>
      <p className="mb-2">
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p className="mb-2">
        <strong>Year:</strong> {year}
      </p>
      <p className="mb-2">
        <strong>Branch:</strong> {branch}
      </p>
      <p className="mb-2">
        <strong>Phone Number:</strong> {phno}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {address}
      </p>
      <p className="mb-2">
        <strong>Bus From:</strong> {busFrom}
      </p>
      <p className="mb-2">
        <strong>Bus Destination:</strong> {busDestination}
      </p>
      <p className="mb-2">
        <strong>Valid Date:</strong> {validDate}
      </p>
      <p className="mb-2">
        <strong>Amount:</strong> ${amount}
      </p>
    </div>
  );
}

export default GetBusPass
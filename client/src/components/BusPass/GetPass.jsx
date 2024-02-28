import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import busRoute from "./BusRoute.json";

function GetPass() {
  const formArray = [1, 2, 3, 4];
  const [formNo, setFormNo] = useState(formArray[0]);

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    year: "",
    branch: "",
    phno: "",
    address: "",
    busFrom: "DKTE Rajwada",
    busDestination: "",
    validDate: "",

    studentId: "",
  });

  const {
    firstName,
    lastName,
    year,
    branch,
    phno,
    address,
    busFrom,
    getdestination,
    validDate,
    studentId,
  } = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const next = () => {
    if (
      formNo === 1 &&
      user.firstName &&
      user.lastName &&
      user.phno &&
      user.year &&
      user.branch
    ) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && destination) {
      setFormNo(formNo + 1);
    } else if (formNo === 3) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fillup all input field");
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const [destination, setDestination] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const handleDestination = (e) => {
    console.log(destination);
    const getdestinationId = e.target.value;
    setDestination(getdestinationId);

    const selected = busRoute.find(
      (item) => item.destination_name === getdestinationId
    );

    if (selected) {
      // Update the selected item and total amount

      setTotalAmount(selected.destination_amount);
    }
  };

  const key_id = "rzp_test_gm6wW5pGrWRFjz";

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    try {
      console.log(token);
      const response = await axios.post(
        "http://localhost:8000/api/v1/payment/checkout",
        { amount: totalAmount },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const order = response.data.order;
      console.log(order);

      const options = {
        key: key_id, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Non-profit foundation",
        description: "Donation",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step
        // callback_url: "http://localhost:8000/api/v1/payment/paymentverification",
        // prefill: {
        //   name: "Rushikesh Tonape",
        //   email: "rushikeshtonape143@gmail.com",
        //   contact: "9970703921",
        // },
        // notes: {
        //   address: "Razorpay Corporate Office",
        // },
        handler: async (response) => {
          try {
            const verifyUrl =
              "http://localhost:8000/api/v1/payment/paymentverification";
            const { data } = await axios.post(verifyUrl, response, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            });
            console.log(data);

            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
            } else {
              // If no specific redirect URL is provided, you can handle the redirect here
              // or leave it blank depending on your application's logic.
              alert("Payment successful");
            }
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#2b0318",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.success", (response) => {
        // Payment successful logic
        console.log("Payment successful:", response);

        alert("Payment successful");
      });

      razorpay.on("payment.error", (error) => {
        // Payment failed or canceled
        console.error("Payment failed or canceled:", error);
        alert("Payment failed or canceled");
      });

      console.log("Before razorpay.open()");
      razorpay.open();
      console.log("After razorpay.open()");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Whether the request succeeded or not, set loading to false
    }
  };

  const finalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/buspass/applyForBusPass",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Student Details Updated Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <ToastContainer />
      <div className="card w-[670px] rounded-md shadow-md bg-white p-5">
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <>
              <div
                className={`w-[35px] my-3 text-white rounded-full ${
                  formNo - 1 === i ||
                  formNo - 1 === i + 1 ||
                  formNo === formArray.length
                    ? "bg-yellow-400"
                    : "bg-slate-400"
                } h-[35px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${
                    formNo === i + 2 || formNo === formArray.length
                      ? "bg-yellow-400"
                      : "bg-slate-400"
                  }`}
                ></div>
              )}
            </>
          ))}
        </div>
        {formNo === 1 && (
          <div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => onInputChange(e)}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => onInputChange(e)}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Year
                    </label>
                    <div className="mt-2">
                      <select
                        id="year"
                        name="year"
                        value={year}
                        onChange={onInputChange}
                        autoComplete="year-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>--Select Year--</option>
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Final Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="branch"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Branch
                    </label>
                    <div className="mt-2">
                      <select
                        id="branch"
                        name="branch"
                        value={branch}
                        onChange={onInputChange}
                        autoComplete="branch-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>--Select Branch--</option>
                        <option>Computer Sc. & Engineering</option>
                        <option>Civil Engineering</option>
                        <option>Computer Sc. & Engineering AI and ML</option>
                        <option>
                          Computer Sc. & Engineering AI and Data Science
                        </option>
                        <option>Electrical Engineering</option>
                        <option>
                          Electronics & Telecommunication Engineering
                        </option>
                        <option>Textile Technology</option>
                        <option>Manmade Textile Technology</option>
                        <option>Textile Plant Engineering</option>
                        <option>Textile Chemistry</option>
                        <option>Fashion Technology</option>
                        <option>Mechanical Engineering</option>
                        <option>Master of Business Administration</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phno"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="phno"
                        value={phno}
                        onChange={(e) => onInputChange(e)}
                        id="phno"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => onInputChange(e)}
                        id="address"
                        autoComplete="address"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={next}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 2 && (
          <div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Bus Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="busFrom"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Bus From
                    </label>
                    <div className="mt-2">
                      <select
                        id="busFrom"
                        name="busFrom"
                        value={busFrom}
                        onChange={onInputChange}
                        autoComplete="busFrom-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>DKTE Rajwada</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="busDestination"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Bus Destination
                    </label>
                    <div className="mt-2">
                      <select
                        name="destination"
                        onChange={(e) => handleDestination(e)}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Destination</option>
                        {busRoute.map((getdestination, index) => (
                          <option
                            value={getdestination.destination_name}
                            key={index}
                          >
                            {getdestination.destination_name}{" "}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p>Total Amount: {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={pre}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Previous
              </button>
              <button
                onClick={next}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 3 && (
          <div>
            <div className="space-y-12">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {firstName} {lastName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Year & Branch
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {year}, {branch}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Bus Route
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {busFrom} to {destination}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      ₹ {totalAmount}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={pre}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Previous
              </button>
              <button
                onClick={next}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 4 && (
          <div>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Payment
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Payment Details
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={pre}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Previous
              </button>
              <button
                onClick={handleDonate}
                className="rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetPass;

import React from "react";
import axios from "axios";
import { useState } from "react";

const BussPass = () => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    busFrom: "",
    busDestination: "",
    validDate: "",
  });

  const [loading, setLoading] = useState(false);

  const { busFrom, busDestination, validDate } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    try {
      // Send a POST request to the server with user data
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

      // Assuming your server returns a success message or user object
      console.log(response.data);

      // Reset the form or redirect the user as needed

      // For example, you can use React Router to navigate to a different page
      // show the alert
      alert("Student Details Updated Successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // HTTP status 409 indicates a conflict (email already exists)
        alert("Student Already Exists. Please sign in to continue.");
      } else {
        console.error(
          "Error while signing up:",
          error.response ? error.response.data : error.message
        );
      }
    } finally {
      setLoading(false); // Whether the request succeeded or not, set loading to false
    }
  };
  return (
    <>
      <div class="transition-colors duration-300 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="container mx-auto p-4">
          <div class="bg-white shadow rounded-lg p-6">
            <form onSubmit={(e) => onSubmit(e)}>
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label
                        for="busFrom"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        bus From
                      </label>
                      <div class="mt-2">
                        <select
                          id="busFrom"
                          name="busFrom"
                          value={busFrom}
                          onChange={onInputChange}
                          autocomplete="busFrom-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>DKTE Rajwada</option>
                        </select>
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="busDestination"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        bus Destination
                      </label>
                      <div class="mt-2">
                        <select
                          id="busDestination"
                          name="busDestination"
                          value={busDestination}
                          onChange={onInputChange}
                          autocomplete="busDestination-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>First Year</option>
                          <option>Second Year</option>
                          <option>Third Year</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                    </div>

                    <div class="relative max-w-sm">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        datepicker
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                    
                  </div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  disabled={loading}
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Saving ..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BussPass;

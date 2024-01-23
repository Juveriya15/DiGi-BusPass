import React from "react";
import axios from 'axios'
import { useState } from 'react'

const EditProfile = () => {

  const token = localStorage.getItem("token");
  
  const [user, setUser] = useState({
      firstName:"",
      lastName:"",
      year:"First Year",
      branch:"Computer Sc. & Engineering",
      phno:"",
      address:""
  })

  const [loading, setLoading] = useState(false);

  const {firstName, lastName, year, branch, phno,address} = user

  const onInputChange = e => {
      setUser({...user,[e.target.name]:e.target.value})
  }

  const onSubmit = async e => {
      e.preventDefault();
      setLoading(true); // Set loading to true when starting the request
      try {
          // Send a POST request to the server with user data
          const response = await axios.post("http://localhost:8000/api/v1/auth/updateStudentDetails", user,
          {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          }
        });

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
              console.error("Error while signing up:", error.response ? error.response.data : error.message);
            }
      }
      finally {
          setLoading(false); // Whether the request succeeded or not, set loading to false
      }
}
  return (
    <>
      <div class="transition-colors duration-300 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="container mx-auto p-4">
          <div class="bg-white shadow rounded-lg p-6">
            <form
              onSubmit={e => onSubmit(e)}
            >
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
                        for="firstName"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={firstName}
                          onChange={e => onInputChange(e)}
                          autocomplete="given-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="lastName"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={lastName}
                          onChange={e => onInputChange(e)}
                          autocomplete="family-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="year"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Year
                      </label>
                      <div class="mt-2">
                        <select
                          id="year"
                          name="year" 
                          value={year} 
                          onChange={onInputChange} 
                          autocomplete="year-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>First Year</option>
                          <option>Second Year</option>
                          <option>Third Year</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="branch"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Branch
                      </label>
                      <div class="mt-2">
                        <select
                          id="branch"
                          name="branch"
                          value={branch} 
                          onChange={onInputChange} 
                          autocomplete="branch-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option>Computer Sc. & Engineering</option>
                          <option>Civil Engineering</option>
                          <option>Computer Sc. & Engineering  AI and ML</option> 
                          <option>Computer Sc. & Engineering  AI and Data Science</option>
                          <option>Electrical Engineering</option>
                          <option>Electronics & Telecommunication Engineering</option>
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

                  

                    <div class="sm:col-span-3">
                      <label
                        for="phno"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div class="mt-2">
                        <input
                          type="number"
                          name="phno"
                          value={phno}
                          onChange={e => onInputChange(e)}
                          id="phno"
                          autocomplete="family-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-full">
                      <label
                        for="address"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          name="address"
                          value={address}
                          onChange={e => onInputChange(e)}
                          id="address"
                          autocomplete="address"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
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
                    {loading ? 'Saving ...' : 'Save'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {loading ? 'Next ...' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

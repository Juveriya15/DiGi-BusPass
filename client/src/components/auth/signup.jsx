import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        // firstName:"",
        // lastName:"",
        email:"",
        studentId:"",
        password:"",
    })

    const [loading, setLoading] = useState(false);

    const {email,studentId,password} = user

    const onInputChange = e => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the request
        try {
            // Send a POST request to the server with user data
            const response = await axios.post("http://localhost:8000/api/v1/auth/signup", user);

            // Assuming your server returns a success message or user object
            console.log(response.data);

            // Reset the form or redirect the user as needed

            // For example, you can use React Router to navigate to a different page
            // show the alert
            alert("Student Registered Successfully");
            navigate('/login');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                // HTTP status 409 indicates a conflict (email already exists)
                alert("Student Already Exists. Please sign in to continue.");
                navigate('/login');
                toast.error('Email already exists. Please use a different email.');
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
    <ToastContainer />
<section className="bg-white container-fluid justify-center">
  <div className="lg:grid lg:min-h-full lg:grid-cols-12">
    {/* <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img 
        alt="Pattern"
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside> */}

    <div
      className="mt-8 items-center justify-center px-8 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="mt-0 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to Digital BusPass
        </h1>
        <p className="mt-4 leading-relaxed text-gray-500">
          Create an account to get started.
        </p>

        <form 
        onSubmit={e => onSubmit(e)}
        className="mt-8 grid grid-cols-6 gap-6">
          {/* <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="firstName"  // Change this to match the state key
              value={firstName}
              onChange={e => onInputChange(e)}  // Add this line
              className="w-full rounded-lg p-3 pe-8 text-sm shadow-sm border-solid border-2 border-sky-500"
            />
          </div> */}

          {/* <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="lastName"
              onChange={e => onInputChange(e)}
              value={lastName}
              className="w-full rounded-lg p-3 pe-8 text-sm shadow-sm border-solid border-2 border-sky-500"
            />
          </div> */}

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PrnNumber" className="block text-sm font-medium text-gray-700">
              PRN Number
            </label>

            <input
              type="text"
              id="PrnNumber"
              name="studentId"
              onChange={e => onInputChange(e)}
              value={studentId}
              className="w-full rounded-lg p-3 pe-8 text-sm shadow-sm border-solid border-2 border-sky-500"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              onChange={e => onInputChange(e)}
              value={email}
              className="w-full rounded-lg p-3 pe-8 text-sm shadow-sm border-solid border-2 border-sky-500"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={e => onInputChange(e)}
              className="w-full rounded-lg p-3 pe-8 text-sm shadow-sm border-solid border-2 border-sky-500"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    disabled={loading} // Disable the button when loading is true
            >
                {loading ? 'Creating Account...' : 'Create an account'}
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-gray-700 underline"> Login </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default signup
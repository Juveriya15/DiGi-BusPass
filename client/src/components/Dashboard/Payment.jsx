import { useState } from "react";
import axios from "axios";

function Home() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  // const key_id = "rzp_test_55K0wTNx7InTHI";
  const key_id = "rzp_test_gm6wW5pGrWRFjz"

  // get logned in user name email and phone number from localStorage
  const name = localStorage.getItem("firstName");
  const email = localStorage.getItem("email");

  console.log(name);
  console.log(email);

  const handleDonate = async (e) => {
    e.preventDefault(); 
    setLoading(true); // Set loading to true when starting the request
    try{  
      const response = await axios.post("http://localhost:8000/api/v1/payment/checkout", 
      {amount}
      ,{
          headers: {
              Authorization: `${token}`,
          },
      });

      const order = response.data;
      console.log(order);
       
      const options = {
        key: key_id, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Non-profit foundation",
        description: "Donation",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8000/api/v1/payment/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
    const razorpay = new window.Razorpay(options);
  
    razorpay.on('payment.success', (response) => {
      // Payment successful logic
      console.log('Payment successful:', response);
      alert('Payment successful');
    });
  
    razorpay.on('payment.error', (error) => {
    // Payment failed or canceled
    console.error('Payment failed or canceled:', error);
    alert('Payment failed or canceled');
  });
  
  console.log('Before razorpay.open()');
  razorpay.open();
  console.log('After razorpay.open()');

  }
  catch(error){
    console.log(error);
  }
  finally{
    setLoading(false); // Whether the request succeeded or not, set loading to false
  }
  
};

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form
            onSubmit={handleDonate}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="amount" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm border-solid border-2 border-sky-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleDonate}
                disabled={loading}
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                {loading ? "Loading..." : "Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;

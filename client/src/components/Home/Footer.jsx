import React from "react";

const Footer = () => {
  return (
    <>
      {/*
  Heads up! 👋

  This component comes with some rtl classes. Please remove them if they are not needed in your project.

  Plugins:
    - @tailwindcss/forms
*/}

      <footer className="bg-[#2b0318]">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-3 content-center">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-yellow-400">About Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                   Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-yellow-400">Helpful Links</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-yellow-400">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                    Gmail
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-white/75"
                    href="/"
                  >
                    Social Media
                  </a>
                </li>
              </ul>
            </div>
          </div>
        
          <div className="mt-16 sm:flex sm:items-center sm:justify-center">
              <div className="flex justify-center text-yellow-400 sm:justify-start">
              <img
              className="h-8 w-auto sm:h-10 m-4"
              src="https://www.dkte.ac.in/images/dkte-logo.png"
              alt="DKTE Logo"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
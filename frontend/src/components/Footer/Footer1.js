import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-2 -z-10 py-8 mt-5">
      <div className="topFooter container mx-auto flex flex-col md:flex-row flex-wrap sm:gap-0 gap-10 justify-between items-center ">
        <div className="pt-10 md:pt-0 w-fit mx-auto md:w-1/4 px-4 text-center  md:text-left">
          <h4 className="font-bold mb-4 text-black">More information</h4>
          <ul className="list-reset leading-loose">
            <li>
              <Link to="/faq" className="text-gray-700 hover:text-pink">
                FAQs
              </Link>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        <div className="pt-10  md:pt-0 w-fit mx-auto md:w-1/4 px-4 text-center  md:text-left">
          <h4 className="font-bold mb-4 text-black">More Information</h4>
          <ul className="list-reset leading-loose">
            <li>
              <a href="/about" className="text-gray-700 hover:text-pink">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-700 hover:text-pink">
                Home
              </a>
            </li>
            <li>
              <a href="/shop-create" className="text-gray-700 hover:text-pink">
                Be a seller
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-pink">
                Corporate Responsibility
              </a>
            </li>
          </ul>
        </div>

        <div className="pt-10  md:pt-0 w-fit mx-auto md:w-1/4 px-4 text-center  md:text-left">
          <div className="mb-4">
            <h4 className="font-bold mb-2 text-black">
              {/* Sign Up for Our Newsletter */}
              Follow Us
            </h4>
            {/* <p className="text-gray-700">
              Stay up-to-date on the latest beauty news and offers.
            </p> */}
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="list-reset flex">
              <li className="mr-4">
                <a href="#">
                  <FaFacebook className="text-black text-xl hover:text-pink  transition duration-500" />
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <FaTwitter className="text-black text-xl hover:text-pink  transition duration-500" />
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <FaInstagram className="text-black text-xl hover:text-pink  transition duration-500" />
                </a>
              </li>
              <li className="mr-4">
                <a href="#">
                  <FaPinterest className="text-black text-xl hover:text-pink  transition duration-500" />
                </a>
              </li>
            </ul>
          </div>
          {/* <form className="flex h-10">
            <input
              className="border border-gray-400 rounded-l px-4 py-2 w-full"
              type="email"
              placeholder="Enter your email address"
            />
            <button
              className="bg-pink hover:bg-black transition duration-500 text-white  rounded-r whitespace-nowrap px-4 py-2"
              type="submit"
            >
              Sign Up
            </button>
          </form> */}
        </div>
      </div>

      <hr className="bg-pink h-0.5 my-8" />

      <div className="btmFooter container mx-auto flex flex-wrap items-center justify-between text-sm">
        <div className="text-gray-700">
          &copy; 2023 Konjit, Inc. All Rights Reserved
        </div>
        {/* <div>
          <a className="text-gray-700 mr-4" href="#">
            Terms &amp; Conditions
          </a>
          <a className="text-gray-700" href="#">
            Privacy Policy
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;

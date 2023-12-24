import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
  return (
    <div>
      <Header />
      <div className="fe-car bg-beige relative top-20 py-10 w-full h-full">
        <div className="bg-white w-11/12 my-5 mx-auto shadow-lg p-12 rounded-xl">
          <h1 className="uppercase text-5xl font-extrabold py-2">
            privacy policy
          </h1>
          <p className="text-pink text-sm">Last updated April 27,2023</p>
          <p className="text-base py-7">
            Konjit is committed to protecting the privacy of our users. This
            Privacy Policy explains how we collect, use, and share your personal
            information when you visit or make a purchase from our website.
          </p>
          <div className="block1">
            <p className="text-3xl font-bold pb-5">
              What Information Do We Collect?
            </p>
            <div className="">
              <p className="text-gray-500 pb-4 font-semibold">
                We collect the following types of information from users:
              </p>
              <ul className="list-disc list-outside ml-10">
                <li className="pl-2 pb-2">
                  Personal Information: We collect personal information from
                  users when they create an account, make a purchase, contact
                  us, or participate in certain other activities on the website.
                  The personal information we collect may include your name,
                  email address, mailing address, telephone number, credit card
                  information, and other information that is necessary to
                  process your orders or provide you with customer service.
                </li>
                <li className="pl-2">
                  Non-Personal Information: We also collect non-personal
                  information about users, such as the type of browser they use,
                  the pages they visit on our website, and the links they click.
                  We use this information to improve our website and provide
                  better service to our users.
                </li>
              </ul>
            </div>
          </div>
          <div className="block2">
            <p className="text-3xl font-bold py-7 ">
              How Do We Use Your Information?
            </p>
            <div className="">
              <p className="text-gray-500 font-semibold pb-2">
                We use the information we collect from users for the following
                purposes:
              </p>
              <ul className="list-disc list-outside ml-10">
                <li className="pl-2 pb-2">
                  To process orders and provide customer service: We use the
                  personal information we collect to process your orders and
                  provide you with customer service. This may include contacting
                  you to confirm your order, answer your questions, or resolve
                  any issues with your order.
                </li>
                <li className="pl-2 pb-2">
                  To improve our website and provide better service: We use the
                  non-personal information we collect to improve our website and
                  provide better service to our users. This may include tracking
                  the number of visitors to our website, the pages they visit,
                  and the links they click.
                </li>
                <li className="pl-2 pb-2">
                  To send marketing communications: We may use your personal
                  information to send you marketing communications, such as
                  newsletters, promotional emails, and special offers. You can
                  unsubscribe from these communications at any time by clicking
                  on the "unsubscribe" link at the bottom of any email.
                </li>
                <li className="pl-2 pb-2">
                  To comply with laws and regulations: We may use your personal
                  information to comply with applicable laws and regulations,
                  such as those governing financial transactions and
                  intellectual property.
                </li>
                <li className="pl-2">
                  To protect our rights and interests: We may use your personal
                  information to protect our rights and interests, such as to
                  investigate fraud or other illegal activity.
                </li>
              </ul>
            </div>
          </div>
          <div className="block3">
            <p className="text-3xl font-bold py-7">
              How Do We Protect Your Information?
            </p>
            <div className="">
              <p className="text-gray-500 font-semibold pb-2">
                We take the security of your personal information seriously. We
                use a variety of security measures to protect your information
                from unauthorized access, use, or disclosure, including:
              </p>
              <ul className="list-disc list-outside ml-10">
                <li className="pl-2 pb-2">
                  <span className="font-bold">Physical security:</span> Our
                  servers are housed in a secure facility with limited access.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold"> Technical security:</span> We use
                  industry-standard security measures, such as encryption and
                  firewalls, to protect your information.
                </li>
                <li className="pl-2 ">
                  <span className="font-bold">Employee training:</span> Our
                  employees are trained on the importance of protecting your
                  privacy and the security of your information.
                </li>
              </ul>
            </div>
          </div>
          <div className="block3">
            <p className="text-3xl font-bold py-7">
              How Do We Share Your Information?
            </p>
            <div className="">
              <p className="text-gray-500 font-semibold pb-2">
                We may share your personal information with the following third
                parties:
              </p>
              <ul className="list-disc list-outside ml-10">
                <li className="pl-2 pb-2">
                  <span className="font-bold">Payment processors:</span> We use
                  payment processors to process your credit card payments. These
                  payment processors may have access to your credit card
                  information.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold"> Shipping companies:</span> We use
                  shipping companies to deliver your orders. These shipping
                  companies may have access to your shipping address.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold"> Marketing partners:</span> We may
                  share your personal information with our marketing partners to
                  send you marketing communications. You can opt out of these
                  communications at any time by clicking on the "unsubscribe"
                  link at the bottom of any email.
                </li>
                <li className="pl-2 ">
                  <span className="font-bold">Other third parties:</span> We may
                  share your personal information with other third parties with
                  your consent.
                </li>
              </ul>
            </div>
          </div>
          <div className="block4">
            <p className="text-3xl font-bold py-7">Your Rights</p>
            <div className="">
              <p className="text-gray-500 font-semibold pb-2">
                You have the following rights with respect to your personal
                information:
              </p>
              <ul className="list-disc list-outside ml-10">
                <li className="pl-2 pb-2">
                  <span className="font-bold"> Access:</span> You have the right
                  to access your personal information. You can request a copy of
                  your personal information by contacting us at [email
                  protected]
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold">Correction:</span>
                  You have the right to correct any inaccurate or incomplete
                  personal information we have about you.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold">Deletion:</span>
                  You have the right to request that we delete your personal
                  information. We will delete your personal information upon
                  request, unless we are required to keep it for legal or
                  regulatory reasons.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold">Portability:</span> You have the
                  right to receive your personal information in a portable
                  format. This means that you can transfer your personal
                  information to another company.
                </li>
                <li className="pl-2 pb-2">
                  <span className="font-bold">Objection:</span> You have the
                  right to object to the processing of your personal
                  information. We will stop processing your personal information
                  unless we have a compelling legitimate interest to continue
                  processing it.
                </li>
                <li className="pl-2 ">
                  <span className="font-bold">Withdrawal of consent:</span> You
                  have the right to withdraw your consent to the processing of
                  your personal information at any time. Withdrawal of consent
                  will not affect the lawfulness of the processing based on
                  consent before its withdrawal.
                </li>
              </ul>
            </div>
          </div>
          <div className="block5">
            <p className="text-3xl font-bold py-7">How to Contact Us?</p>
            <div className="">
              <p className="text-gray-900 pb-2">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <Link to="/contact"  className="text-pink font-bold">Contact</Link>
              </p>
            </div>
          </div>
          <div className="block6">
            <p className="text-3xl font-bold py-7">Additional Information</p>
            <div className="">
              <p className="text-gray-900 pb-2">
                <span className="font-bold">Children:</span> We do not knowingly
                collect personal information from children under the age of 13.
                If you believe that a child under the age of 13 has provided us
                with
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;

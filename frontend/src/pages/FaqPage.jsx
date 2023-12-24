import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Footer/Footer1";
import Collapsible from "react-collapsible";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [hover, setHover] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const handleMouseEnter = (item) => {
    setHover(item);
    console.log(hover);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <div>
      <Header />
      <section className="faq  bg-beige">
        <div className=" pt-28 text-center">
          <h1 className="text-pink sm:text-xl text-lg font-[900] leading-loose pt-5">
            FAQ
          </h1>
          <p className=" text-2xl sm:text-3xl md:text-4xl font-[900] pt-3">
            FREQUENTLY ASKED <br /> QUESTIONS
          </p>
        </div>
        <div className="pt-10 flex flex-col md:flex-row justify-center md:justify-around items-center">
          <ul
            class="flex md:flex-col justify-evenly
             md:justify-between md:items-start w-full md:w-fit  py-7 mx-auto md:px-10 lg:px-16 xl:px-20 2xl:px-24 gap-y-10 
             sm:-mx-6 overflow-x-hidden text-gray-500 text-base sm:text-lg md:text-xl"
          >
            <li
              onClick={() => handleCategoryClick("general")}
              onMouseEnter={() => handleMouseEnter("general")}
              onMouseLeave={handleMouseLeave}
            >
              <p
                className={`relative z-20 cursor-pointer pb-2 ${
                  hover === "general"
                    ? selectedCategory === "general"
                      ? "hovered active"
                      : "hovered"
                    : selectedCategory === "general"
                    ? "active"
                    : ""
                }`}
              >
                General
                <span className="pink-underline"></span>
                <span className="pink-underline2"></span>
              </p>
            </li>
            <li
              onClick={() => handleCategoryClick("payment")}
              onMouseEnter={() => handleMouseEnter("payment")}
              onMouseLeave={handleMouseLeave}
            >
              <p
                className={`relative z-20 cursor-pointer pb-2 ${
                  hover === "payment"
                    ? selectedCategory === "payment"
                      ? "hovered active"
                      : "hovered"
                    : selectedCategory === "payment"
                    ? "active"
                    : ""
                }`}
              >
                Payment
                <span className="pink-underline"></span>
                <span className="pink-underline2"></span>
              </p>
            </li>
            <li
              onClick={() => handleCategoryClick("verification")}
              onMouseEnter={() => handleMouseEnter("verification")}
              onMouseLeave={handleMouseLeave}
            >
              <p
                className={`relative z-20 cursor-pointer pb-2 ${
                  hover === "verification"
                    ? selectedCategory === "verification"
                      ? "hovered active"
                      : "hovered"
                    : selectedCategory === "verification"
                    ? "active"
                    : ""
                }`}
              >
                Verification
                <span className="pink-underline"></span>
                <span className="pink-underline2"></span>
              </p>
            </li>
            <li
              onClick={() => handleCategoryClick("delivery")}
              onMouseEnter={() => handleMouseEnter("delivery")}
              onMouseLeave={handleMouseLeave}
            >
              <p
                className={`relative z-20 cursor-pointer pb-2 ${
                  hover === "delivery"
                    ? selectedCategory === "delivery"
                      ? "hovered active"
                      : "hovered"
                    : selectedCategory === "delivery"
                    ? "active"
                    : ""
                }`}
              >
                Delivery
                <span className="pink-underline"></span>
                <span className="pink-underline2"></span>
              </p>
            </li>

            <li
              onClick={() => handleCategoryClick("seller")}
              onMouseEnter={() => handleMouseEnter("seller")}
              onMouseLeave={handleMouseLeave}
            >
              <p
                className={`relative z-20 cursor-pointer pb-2 ${
                  hover === "seller"
                    ? selectedCategory === "seller"
                      ? "hovered active"
                      : "hovered"
                    : selectedCategory === "seller"
                    ? "active"
                    : ""
                }`}
              >
                Seller
                <span className="pink-underline"></span>
                <span className="pink-underline2"></span>
              </p>
            </li>
          </ul>
          <div className="flex flex-col gap-4 w-[90%] md:w-[50%] pt-10">
            {selectedCategory === "general" && (
              <>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How long does it take for my order to be delivered?"
                    content=" The delivery time for your order depends on your location
                      and the shipping method chosen during checkout. Typically,
                      orders are processed and shipped within 1-2 business days.
                      Standard shipping usually takes between 3-7 business days,
                      while expedited shipping options are available for faster
                      delivery."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          What is your return policy?"
                    content="  We offer a hassle-free return policy. If you are not
                      satisfied with your purchase, you can return the product
                      within 30 days of receipt. Please ensure that the item is
                      unused, in its original packaging, and accompanied by the
                      original invoice. Once we receive the returned item, we
                      will initiate the refund process."
                  />{" "}
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          Are your products cruelty-free?"
                    content="Yes, we are committed to offering cruelty-free products.
                      We do not test our products on animals, and we ensure that
                      our suppliers adhere to ethical practices. You can shop
                      with confidence, knowing that our cosmetic products are
                      cruelty-free and not tested on animals."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How can I contact your customer support?"
                    content="
                      We have a dedicated customer support team ready to assist
                      you. You can reach us by phone at [customer support phone
                      number] during our business hours. Alternatively, you can
                      email us at [customer support email address]. We strive to
                      respond to all inquiries within 24 hours and provide
                      exceptional customer service."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />{" "}
                </div>
              </>
            )}
            {selectedCategory === "delivery" && (
              <>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How long does it take for my order to be delivered?"
                    content=" The delivery time for your order depends on your location
                      and the shipping method chosen during checkout. Typically,
                      orders are processed and shipped within 1-2 business days.
                      Standard shipping usually takes between 3-7 business days,
                      while expedited shipping options are available for faster
                      delivery."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          Do you offer international shipping?"
                    content=" Yes, we offer international shipping to select countries.
                      During the checkout process, you can enter your shipping
                      address to see if we deliver to your country. Please note
                      that international shipping may be subject to additional
                      fees, customs duties, and import taxes imposed by your
                      country's customs authorities. These charges are the
                      responsibility of the recipient and are not included in
                      the product or shipping costs. We recommend checking with
                      your local customs office for more information on
                      potential fees and regulations before placing an
                      international order."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How much does shipping cost?"
                    content="The shipping cost depends on the destination, package
                      weight, and shipping method selected. During the checkout
                      process, you will be provided with various shipping
                      options along with their corresponding costs. Choose the
                      option that best suits your needs and budget.."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title="  Do you provide package tracking information?"
                    content="Yes, we provide package tracking information for all
                      orders. Once your order is shipped, you will receive an
                      email notification containing a tracking number. You can
                      use this tracking number to monitor the progress of your
                      shipment on our website or the carrier's tracking portal."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" What happens if my package is lost or damaged during
                          transit?"
                    content="In the rare event that your package is lost or arrives
                      damaged, please contact our customer support team
                      immediately. We will investigate the issue and work
                      towards finding a satisfactory resolution. Please note
                      that providing accurate and detailed information about the
                      issue, including photos if applicable, will help expedite
                      the process."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I change my shipping address after placing an
                          order?"
                    content="Unfortunately, we cannot guarantee changes to the shipping
                      address once the order has been placed. It is essential to
                      double-check your shipping address before finalizing the
                      purchase. If you need to make changes, please contact our
                      customer support team as soon as possible, and they will
                      assist you in finding a solution."
                  />
                </div>
              </>
            )}
            {selectedCategory === "payment" && (
              <>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How long does it take for my order to be delivered?"
                    content=" The delivery time for your order depends on your location
                      and the shipping method chosen during checkout. Typically,
                      orders are processed and shipped within 1-2 business days.
                      Standard shipping usually takes between 3-7 business days,
                      while expedited shipping options are available for faster
                      delivery."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          Do you offer international shipping?"
                    content=" Yes, we offer international shipping to select countries.
                      During the checkout process, you can enter your shipping
                      address to see if we deliver to your country. Please note
                      that international shipping may be subject to additional
                      fees, customs duties, and import taxes imposed by your
                      country's customs authorities. These charges are the
                      responsibility of the recipient and are not included in
                      the product or shipping costs. We recommend checking with
                      your local customs office for more information on
                      potential fees and regulations before placing an
                      international order."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How much does shipping cost?"
                    content="The shipping cost depends on the destination, package
                      weight, and shipping method selected. During the checkout
                      process, you will be provided with various shipping
                      options along with their corresponding costs. Choose the
                      option that best suits your needs and budget.."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title="  Do you provide package tracking information?"
                    content="Yes, we provide package tracking information for all
                      orders. Once your order is shipped, you will receive an
                      email notification containing a tracking number. You can
                      use this tracking number to monitor the progress of your
                      shipment on our website or the carrier's tracking portal."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" What happens if my package is lost or damaged during
                          transit?"
                    content="In the rare event that your package is lost or arrives
                      damaged, please contact our customer support team
                      immediately. We will investigate the issue and work
                      towards finding a satisfactory resolution. Please note
                      that providing accurate and detailed information about the
                      issue, including photos if applicable, will help expedite
                      the process."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I change my shipping address after placing an
                          order?"
                    content="Unfortunately, we cannot guarantee changes to the shipping
                      address once the order has been placed. It is essential to
                      double-check your shipping address before finalizing the
                      purchase. If you need to make changes, please contact our
                      customer support team as soon as possible, and they will
                      assist you in finding a solution."
                  />
                </div>
              </>
            )}
            {selectedCategory === "verification" && (
              <>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How long does it take for my order to be delivered?"
                    content=" The delivery time for your order depends on your location
                      and the shipping method chosen during checkout. Typically,
                      orders are processed and shipped within 1-2 business days.
                      Standard shipping usually takes between 3-7 business days,
                      while expedited shipping options are available for faster
                      delivery."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          What is your return policy?"
                    content="  We offer a hassle-free return policy. If you are not
                      satisfied with your purchase, you can return the product
                      within 30 days of receipt. Please ensure that the item is
                      unused, in its original packaging, and accompanied by the
                      original invoice. Once we receive the returned item, we
                      will initiate the refund process."
                  />{" "}
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          Are your products cruelty-free?"
                    content="Yes, we are committed to offering cruelty-free products.
                      We do not test our products on animals, and we ensure that
                      our suppliers adhere to ethical practices. You can shop
                      with confidence, knowing that our cosmetic products are
                      cruelty-free and not tested on animals."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How can I contact your customer support?"
                    content="
                      We have a dedicated customer support team ready to assist
                      you. You can reach us by phone at [customer support phone
                      number] during our business hours. Alternatively, you can
                      email us at [customer support email address]. We strive to
                      respond to all inquiries within 24 hours and provide
                      exceptional customer service."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />{" "}
                </div>
              </>
            )}
            {selectedCategory === "seller" && (
              <>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How long does it take for my order to be delivered?"
                    content=" The delivery time for your order depends on your location
                      and the shipping method chosen during checkout. Typically,
                      orders are processed and shipped within 1-2 business days.
                      Standard shipping usually takes between 3-7 business days,
                      while expedited shipping options are available for faster
                      delivery."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          What is your return policy?"
                    content="  We offer a hassle-free return policy. If you are not
                      satisfied with your purchase, you can return the product
                      within 30 days of receipt. Please ensure that the item is
                      unused, in its original packaging, and accompanied by the
                      original invoice. Once we receive the returned item, we
                      will initiate the refund process."
                  />{" "}
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          Are your products cruelty-free?"
                    content="Yes, we are committed to offering cruelty-free products.
                      We do not test our products on animals, and we ensure that
                      our suppliers adhere to ethical practices. You can shop
                      with confidence, knowing that our cosmetic products are
                      cruelty-free and not tested on animals."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" 
                          How can I contact your customer support?"
                    content="
                      We have a dedicated customer support team ready to assist
                      you. You can reach us by phone at [customer support phone
                      number] during our business hours. Alternatively, you can
                      email us at [customer support email address]. We strive to
                      respond to all inquiries within 24 hours and provide
                      exceptional customer service."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />
                </div>
                <div className="collapsible my-2 ">
                  <CollapsibleItem
                    title=" Can I track my order?"
                    content=" Absolutely! Once your order is shipped, we will provide
                      you with a tracking number via email. You can use this
                      tracking number to monitor the progress of your shipment.
                      Simply visit our website's 'Order Tracking' page and enter
                      your tracking number to get real-time updates on the
                      status of your order."
                  />{" "}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className="contact w-full  py-32 bg-cover bg-center shadow-2xl mt-20"
          style={{
            backgroundImage: `url('/images/FragranceProducts2.png')`,
          }}
        >
          <div className="mx-auto w-fit text-center leading-loose">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">STILL HAVE A <br /> QUESTION</p>
            <p className="text-lg sm:text-xl md:text-2xl py-5">CONTACT US THROUGH EMAIL</p>
            <button className="bg-pink px-3 py-2 mt-2 font-semibold hover:bg-[#] text-white shadow-lg rounded-md">
              GET IN TOUCH
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FaqPage;

const CollapsibleItem = ({ title, content }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Collapsible
      triggerTagName="span"
      triggerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      trigger={
        <div className="flex items-center justify-between w-full">
          <div className="font-bold">{title}</div>{" "}
          <div className="">
            {isCollapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>{" "}
        </div>
      }
      triggerClassName="collapsible-trigger"
      onOpening={toggleCollapsible}
      onClosing={toggleCollapsible}
    >
      <div
        className="collapsible-content font-semibold p-3 m-2 rounded-md bg-right bg-cover bg-opacity-50"
        style={{
          backgroundImage: `url('/images/FragranceProducts2.png')`,
        }}
      >
        {" "}
        {content}
      </div>
    </Collapsible>
  );
};

import {FOLLOW, EXPLORE, LEGAL } from "./Menu";
import { Link } from "react-router-dom";
const ItemContainer = () => {
  return (
    <div className=" text-center md:text-left leading-7 grid grid-cols-1 sm:grid-cols-3 gap-7 sm:px-8 px-5 py-16 md:w-10/12 item-center">
      <Item Links={EXPLORE} title="Explore" />
      <Item Links={FOLLOW} title="Get Help" />
      <Item Links={LEGAL} title="Our Company" />
    </div>
  );
};
const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-bold text-black">{title}</h1>
      {Links.map((link) => (
        <li key={link.name} className="">
          <Link
            href={link.href}
            className="cursor-pointer text-black duration-300  hover:text-yellow-900 "
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ItemContainer;

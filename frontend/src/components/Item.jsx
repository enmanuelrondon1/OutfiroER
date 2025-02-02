import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Item = ({ product }) => {
  return (
    <div className="bottom-12 relative ">
      {/* image  */}
      <Link to={`/product/${product._id}`} className="felxCenter relative top-12 overflow-hidden m-2.5 rounded-xl">
        <img src={product.image[0]} alt="Products" />
      </Link>
      {/* info  */}
      <div className="p-3 rounded-lg pt-12 bg-white shadows ">
        <h4 className="bold-15 line-clamp-1 !my-0">{product.name}</h4>
        <div className="flexBetween pt-1 ">
          <h5 className="h5 pr-2 ">${product.price}.00</h5>
          <div className="flex items-baseline gap-x-1">
            <FaStar className="text-secondary " />
            <h5 className="h5 relative bottom-0.5">4.8</h5>
          </div>
        </div>
        <p className="line-clamp-2 py-1 ">{product.description}</p>
      </div>
    </div>
  );
};

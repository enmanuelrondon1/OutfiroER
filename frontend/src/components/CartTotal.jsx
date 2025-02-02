// import React, { useContext } from "react";
// import { Title } from "./Title";
// import { ShopContext } from "../context/ShopContext";

// export const CartTotal = () => {
//   const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);
//   return (
//     <section className="w-full">
//       <Title title1={"Cart "} title2={"Total"} title1Styles={"h3"} />
//       <div className="flexBetween pt-3 ">
//         <h5>SubTotal:</h5>
//         <p>
//           {currency}
//           {getCartAmount()}
//         </p>
//       </div>
//       <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1 " />
//       <div className="flexBetween pt-3 ">
//         <h5 className="h5">Shipping Fee:</h5>
//         <p className="h5">
//           {currency}
//           {getCartAmount() === 0 ? "0.00" : `${currency}${delivery_charges}.00`}
//         </p>
//       </div>

//       <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1 " />
//       <div className="flexBetween pt-3 ">
//         <h5 className="h5">Shipping Fee:</h5>
//         <p className="h5">
//           {currency}
//           {getCartAmount() === 0 ? "0.00" : getCartAmount() + delivery_charges}
//         </p>
//       </div>

//       <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1 " />
//     </section>
//   );
// };

import React, { useContext } from "react";
import { Title } from "./Title";
import { ShopContext } from "../context/ShopContext";

export const CartTotal = () => {
  const { currency, getCartAmount, delivery_charges } = useContext(ShopContext);

  // Calcula el subtotal una sola vez
  const cartAmount = getCartAmount();

  // Función para formatear precios
  const formatPrice = (amount) => {
    return `${currency}${amount.toFixed(2)}`;
  };

  return (
    <section className="w-full">
      <Title title1={"Cart "} title2={"Total"} title1Styles={"h3"} />

      {/* Subtotal */}
      <div className="flexBetween pt-3">
        <h5>SubTotal:</h5>
        <p>{formatPrice(cartAmount)}</p>
      </div>
      <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />

      {/* Shipping Fee */}
      <div className="flexBetween pt-3">
        <h5 className="h5">Shipping Fee:</h5>
        <p className="h5">
          {cartAmount === 0 ? formatPrice(0) : formatPrice(delivery_charges)}
        </p>
      </div>
      <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />

      {/* Total */}
      <div className="flexBetween pt-3">
        <h5 className="h5">Total:</h5>
        <p className="h5">
          {formatPrice(cartAmount + (cartAmount === 0 ? 0 : delivery_charges))}
        </p>
      </div>
      <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
    </section>
  );
};
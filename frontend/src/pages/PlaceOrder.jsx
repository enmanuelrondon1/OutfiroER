import React, { useContext, useState } from "react";
import { Title } from "../components/Title";
import { CartTotal } from "../components/CartTotal";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

export const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_charges,
    products,
    backendUrl,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(products.find((product) => product._id === items));
          if(itemInfo){
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges,
      }
      switch(method){
        //api calls for COD 
        case "cod":
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: { token}});
          // console.log(response);
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
          }else {
            toast.error(response.data.message);
          }
       
          break;
          // api calls for stripe
          case "stripe":
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: { token}});
            // console.log(responseStripe);
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data;
              window.location.replace(session_url);
            }else{
              toast.error(responseStripe.data.message);
            }
            break;
          default:
            break;
   
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-primary mb-16">
        {/* container */}
        <form onSubmit={onSubmitHandler} className="max-padd-container py-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20">
            {/* left side  */}
            <div className="w-full md:w-2/3 flex flex-col gap-3 text-[95%]">
              <Title title1={"Delivery "} title2={"Information"} />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
              </div>
              <input
                onChange={onChangeHandler}
                value={formData.email}
                type="text"
                name="email"
                placeholder="Email"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full"
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.phone}
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full"
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.street}
                type="text"
                name="street"
                placeholder="Street"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full"
                required
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  type="text"
                  name="city"
                  placeholder="City"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.state}
                  type="text"
                  name="state"
                  placeholder="State"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.country}
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-full sm:w-1/2"
                  required
                />
              </div>
            </div>

            {/* right side  */}
            <div className="w-full md:w-1/3 flex flex-col">
              <CartTotal />
              {/* payment method  */}
              <div className="my-6">
                <h3 className="bold-20 mb-5">
                  Payment <span className="text-secondary">Method</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  <p
                    onClick={() => setMethod("stripe")}
                    className={`${
                      method === "stripe" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer flex-1 text-center`}
                  >
                    Stripe
                  </p>
                  <p
                    onClick={() => setMethod("cod")}
                    className={`${
                      method === "cod" ? "btn-dark" : "btn-white"
                    } !py-1 text-xs cursor-pointer flex-1 text-center`}
                  >
                    Cash on delivery
                  </p>
                </div>
              </div>
              <div className="w-full">
                <button type="submit" className="btn-secondary w-full">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

// TODO: CODIGO ORIGINAL QUEDO MAL EN EL CSS
// <div>
//   <div className="bg-primary mb-16 ">
//     {/* container */}
//     <form className="max-padd-container py-10 ">
//       <div className="flex flex-col xl:flex-row gap-20 xl:gap-28 ">
//         {/* left side  */}
//         <div className="flex flex-1 xl:flex-col gap-3 text-[95%] ">
//           <Title
//             title1={"Delivery "}
//             title2={"Information"}
//           />
//           <div className="flex gap-3 ">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />

//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />
//           </div>
//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none  "
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none  "
//           />
//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none  "
//           />

//           <div className="flex gap-3 ">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />

//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />
//           </div>
//           <div className="flex gap-3 ">
//             <input
//               type="text"
//               name="zipcode"
//               placeholder="Zip Code"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />

//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2 "
//             />
//           </div>
//         </div>

//         {/* right side  */}
//         <div className="flex flex-1 flex-col ">
//           <CartTotal />
//           {/* payment method  */}
//           <div className="my-6">
//             <h3 className="bold-20 mb-5 ">
//               Payment <span className="text-secondary">Method</span>
//             </h3>
//             <div className="flex gap-3 ">
//               <p onClick={() => setMethod('stripe')} className={`${method === 'stripe' ? 'btn-dark' : 'btn-white'} !py-1 text-xs cursor-pointer `}>Stripe</p>
//               <p onClick={() => setMethod('cod')} className={`${method === 'cod' ? 'btn-dark' : 'btn-white'} !py-1 text-xs cursor-pointer `}>Cast on delivery</p>
//             </div>
//           </div>
//           <div className="">
//             <button type="submit" className="btn-secondary  ">Place Order</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   </div>
//   <Footer />
// </div>

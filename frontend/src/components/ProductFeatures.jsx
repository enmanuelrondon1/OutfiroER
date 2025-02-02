import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbArrowBackUp, TbTruckDelivery } from "react-icons/tb";

export const ProductFeatures = () => {
  return (
    <section className="bg-primary rounded-xl mt-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-xl">
        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbArrowBackUp className="mb-3 text-yellow-500" />
          </div>
          <div>
            <h4 className="h4 capitalize">Easy Return</h4>
            <p>
              You can return your order within 30 days of purchase. We accept
              all major credit cards, as well as PayPal.
            </p>
          </div>
        </div>

        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <TbTruckDelivery className="mb-3 text-red-500" />
          </div>
          <div>
            <h4 className="h4 capitalize">Fast Delivery</h4>
            <p>
             Your order will be delivered within 7 days of purchase. With security measures in place, you can be sure that your order will arrive safely and on time.
            </p>
          </div>
        </div>

        <div className="flexCenter gap-x-4 p-2 rounded-3xl">
          <div className="text-3xl">
            <RiSecurePaymentLine className="mb-3 text-cyan-500" />
          </div>
          <div>
            <h4 className="h4 capitalize">Secure Payment</h4>
            <p>
              Pay securely with your preferred payment method. We accept all
              major credit cards, as well as PayPal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

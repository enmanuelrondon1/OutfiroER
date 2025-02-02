import React from "react";

export const ProductDescription = () => {
  return (
    <div className="ring-1 ring-slate-900/10 rounded-lg ">
      <div className="flex gap-3">
        <button className="medium-14 p-3 w-32 border-b-2">Description</button>
        <button className="medium-14 p-3 w-32">Care Guide</button>
        <button className="medium-14 p-3 w-32 ">Size Guide</button>
      </div>
      <hr className="h-[1px] w-full " />
      <div className="flex flex-col gap-3 p-3">
        <div>
          <h5 className="h5 ">Detail</h5>
          <p className="text-sm">
            This product is made with 100% organic cotton, soft to the touch and
            highly breathable, ideal for all-day use. Its minimalist design
            includes a classic cut and reinforced seams for greater durability.
          </p>
          <p className="text-sm">
            Available in a wide range of neutral colors, it is perfect to match
            any style, from casual to modern.
          </p>
        </div>
        <div>
          <h5 className="h5">Benfit</h5>
          <ul className="list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1">
            <li>
              High-queality materials, ensuring a superior fit and comfort.
            </li>
            <li>
              Soft and breathable fabric, making it ideal for all-day wear.
            </li>
            <li>Minimalist design, providing a classic and timeless look.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

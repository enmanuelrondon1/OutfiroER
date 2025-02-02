import React from "react";
import img1 from "../assets/features/feature1.png";
import img2 from "../assets/features/feature2.png";

export const Features = () => {
  return (
    <section className="max-padd-container pt-14 pb-20">
      {/* Container */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-6 gap-y-12 rounded-xl">
        {/* Imágenes */}
        <div className="flexCenter gap-x-10 ">
          <div>
            <img
              src={img1}
              alt="High-quality feature demonstration"
              height={77}
              width={222}
              className="rounded-full shadow-lg"
            />
          </div>
          <div>
            <img
              src={img2}
              alt="Fast delivery feature demonstration"
              height={77}
              width={222}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Tarjetas */}
        <div className="flexCenter flex-wrap sm:flex-nowrap gap-5">
          <div className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="h4 capitalize text-secondary mb-2">Quality Product</h4>
            <p className="text-sm text-gray-600">
              A product that is of the highest quality and meets your expectations.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="h4 capitalize text-secondary mb-2">Fast Delivery</h4>
            <p className="text-sm text-gray-600">A fast delivery that is always on time.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="h4 capitalize text-secondary mb-2">Reliable Support</h4>
            <p className="text-sm text-gray-600">
              A support team that is always available to assist you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


// TODO:OTRA MANERA DE HACERLO
// const Feature = ({ title, description, icon }) => {
//   return (
//     <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transition duration-300 hover:scale-105">
//       <div className="flex items-center justify-center mb-4 text-4xl text-indigo-600 dark:text-indigo-400">
//         {icon} {/* Icono (puedes usar un componente de icono o un SVG) */}
//       </div>
//       <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
//         {title}
//       </h2>
//       <p className="text-gray-600 dark:text-gray-300">
//         {description}
//       </p>
//     </div>
//   );
// };

// export const Features = () => {
//     const features = [
//         {
//             title:"Calidad del Producto",
//             description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         },
//         {
//             title:"Entrega Rapida",
//             description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 9v12m0 0l-3-3m3 3l3-3" />
//           </svg>
//         },
//         {
//             title:"Pago Seguro",
//             description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a.75.75 0 00.75-.75v-6.75a.75.75 0 00-.75-.75H4.5a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75z" />
//           </svg>
//         }
//     ]
//   return (
//     <section className="py-12 bg-gray-100 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <div className="md:grid md:grid-cols-3 md:gap-8"> {/* Responsividad con grid */}
//             {features.map((feature, index)=>(
//                 <Feature key={index} title={feature.title} description={feature.description} icon={feature.icon}/>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

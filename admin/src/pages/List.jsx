// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { backend_url, currency } from "../App";
// import { toast } from "react-toastify";
// import { TbTrash } from "react-icons/tb";

// export const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backend_url + "/api/product/list");
//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backend_url + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="px-2 sm:px-8 sm:mt-14  ">
//       <div className="flex flex-col gap-2 ">
//         <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center py-1 px-2 bg-white bold-14 sm:bold-15 mb-1 rounded ">
//           <h5>Image</h5>
//           <h5>Name</h5>
//           <h5>Category</h5>
//           <h5>Price</h5>
//           <h5>Remove</h5>
//         </div>
//         {/* product list */}
//         {list.map((item) => (
//           <div
//             key={item._id}
//             className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl  "
//           >
//             <img
//               src={item.image[0]}
//               alt="ProductImage"
//               className="w-12 rounded-lg"
//             />
//             <h5 className="text-sm font-semibold ">{item.name}</h5>
//             <p className="text-sm font-semibold ">{item.category}</p>
//             <div className="text-sm font-semibold ">
//               {currency}
//               {item.price}
//             </div>
//             <div
//               onClick={() => removeProduct(item._id)}
//               className="text-right md:text-center cursor-pointer text-lg "
//             >
//               <TbTrash />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { backend_url, currency } from "../App";

export const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/update",
        editingProduct,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gestiona tu catálogo de productos
        </p>
      </div>

      {/* Product List */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 space-y-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {currency}{item.price}
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setEditingProduct(item);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TbTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product List - Desktop View */}
      <div className="hidden sm:block">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_3fr_2fr_2fr_1fr] items-center px-6 py-4 bg-gray-50 text-sm font-medium text-white uppercase tracking-wider">
            <h5>Imagen</h5>
            <h5>Nombre</h5>
            <h5>Categoría</h5>
            <h5>Precio</h5>
            <h5 className="text-right">Acciones</h5>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-gray-200">
            {list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-[1fr_3fr_2fr_2fr_1fr] items-center px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                
                <div className="truncate font-medium text-gray-900">
                  {item.name}
                </div>
                
                <div className="text-sm text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </div>
                
                <div className="text-sm font-medium text-gray-900">
                  {currency}{item.price}
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setEditingProduct(item);
                      setIsEditing(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TbTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Editar Producto
              </h3>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategoría
                </label>
                <select
                  value={editingProduct.subCategory}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      subCategory: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {subCategories.map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tallas
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingProduct.sizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <select
                  multiple
                  value={editingProduct.sizes}
                  onChange={(e) => {
                    const selectedSizes = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setEditingProduct({
                      ...editingProduct,
                      sizes: selectedSizes,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio
                </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
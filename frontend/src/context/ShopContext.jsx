import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/data";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_charges = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  // Adding items to cart

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // get cart count
  const getCartCount = () => {
    let totalAcount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAcount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAcount;
  };

  // updating the quantity
  const updatedQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // TODO: SACADO DE CLAUDE 
  // const updatedQuantity = async (itemId, size, quantity) => {
  //   try {
  //     // Verificar que los parámetros necesarios existen
  //     if (!itemId || !size) {
  //       throw new Error('ItemId y size son requeridos');
  //     }
  
  //     let cartData = structuredClone(cartItems);
      
  //     // Verificar que el item existe en el carrito
  //     if (!cartData[itemId]) {
  //       cartData[itemId] = {};
  //     }
      
  //     cartData[itemId][size] = quantity;
  //     setCartItems(cartData);
  
  //     if (token) {
  //       const response = await axios.post(
  //         `${backendUrl}/api/cart/update`,
  //         { itemId, size, quantity },
  //         { headers: { token } }
  //       );
        
  //       // Verificar la respuesta
  //       if (!response.data) {
  //         throw new Error('No se recibió respuesta del servidor');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error en updatedQuantity:', error);
  //     toast.error(error.message || 'Error al actualizar el carrito');
  //     // Podrías querer revertir el cambio en el estado si la llamada al servidor falla
  //   }
  // };
 


  // getting total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  // TODO:SACADO DE CLAUDE 
  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const items in cartItems) {
  //     let itemInfo = products.find((product) => product._id === items);
  //     // Verificar que itemInfo existe antes de usarlo
  //     if (itemInfo) {
  //       for (const item in cartItems[items]) {
  //         if (cartItems[items][item] > 0) {
  //           totalAmount += itemInfo.price * cartItems[items][item];
  //         }
  //       }
  //     } else {
  //       console.warn(`Producto con ID ${items} no encontrado`);
  //     }
  //   }
  //   return totalAmount;
  // };
  

 

  // Getting all products from backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      // console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Get user cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if(response.data.success){
        setCartItems(response.data.cartData);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    getProductsData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    currency,
    delivery_charges,
    products,
    navigate,
    token,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setToken,
    addToCart,
    getCartCount,
    cartItems,
    setCartItems,
    updatedQuantity,
    getCartAmount,
    backendUrl,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

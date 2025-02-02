import { useEffect, useState } from "react";
import { TfiPackage } from "react-icons/tfi";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";

export const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler =async (e, orderId) => {
    try {
      const response = await axios.post(backend_url + '/api/order/status', {
        orderId,
        status: e.target.value
      }, { headers: { token } });
      console.log(response.data);

      if (response.data.success) {
       await fetchAllOrders();
      } 
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  // TODO:SACADO DE CLAUDE 
  // const statusHandler = async (e, orderId) => {
  //   const newStatus = e.target.value;
    
  //   // Actualizar el estado local inmediatamente
  //   setOrders(prevOrders => 
  //     prevOrders.map(order => 
  //       order._id === orderId 
  //         ? { ...order, status: newStatus }
  //         : order
  //     )
  //   );
  
  //   try {
  //     const response = await axios.post(
  //       `${backend_url}/api/order/status`, 
  //       {
  //         orderId,
  //         status: newStatus
  //       }, 
  //       { headers: { token } }
  //     );
  //     console.log(response.data);
  //     if (!response.data.success) {
  //       // Si la actualización falla, revertimos al estado anterior
  //       toast.error(response.data.message);
  //       fetchAllOrders(); // Recargar el estado real del servidor
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error al actualizar el estado");
  //     fetchAllOrders(); // Recargar el estado real del servidor
  //   }
  // };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-2 sm:px-8 mt-4 sm:mt-14">
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr_2fr_1fr] gap-6 items-start p-4 text-gray-700 bg-white rounded-lg shadow-sm"
        >
          <div className="flex flex-col items-center justify-center gap-3 py-2">
            <TfiPackage className="text-5xl text-secondary" />
            <p className="text-xl font-semibold text-center">
              {currency}
              {order.amount}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="text-base font-medium">Items:</div>
              <div className="flex flex-col">
                {order.items.map((item, index) => (
                  <p key={index} className="text-base">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>
            </div>
            <p className="text-base">
              <span className="text-tertiary font-medium">Name:</span>{" "}
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <p className="text-base">
              <span className="text-tertiary font-medium">Address:</span>
              <span className="ml-1">{order.address.street + ", "}</span>
              <span>
                {order.address.city +
                  ", " +
                  order.address.state +
                  " " +
                  order.address.country +
                  ", " +
                  order.address.zipcode}
              </span>
            </p>
            <p className="text-base">{order.address.phone}</p>
            <p className="text-base">
              <span className="text-tertiary font-medium">Email:</span>{" "}
              {order.address.email}
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-base">Total Items: {order.items.length}</p>
            <p className="text-base">Method: {order.paymentMethod}</p>
            <p className="text-base">Payment: {order.payment ? "Done" : "Pending"}</p>
            <p className="text-base">
              Date:{" "}
              {new Date(order.date).toLocaleDateString() +
                " " +
                new Date(order.date).toLocaleTimeString()}
            </p>
          </div>

          <select
            onChange={(e) => statusHandler(e, order._id)}
            value={order.status}
            className="w-full md:w-auto text-sm font-medium p-2 ring-1 ring-slate-900/5 rounded bg-primary"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  </div>

  
  );
};

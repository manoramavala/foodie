import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const response = await res.json();
      setOrderData(response.orderData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData && orderData.order_data?.length > 0 ? (
            orderData.order_data
              .slice(0)
              .reverse()
              .map((orderGroup, index) => {
                if (!orderGroup.length) return null;

                const orderDateObj = orderGroup.find((item) => item.Order_date);
                const orderItems = orderGroup.filter(
                  (item) => !item.Order_date
                );

                return (
                  <div key={index} className="mb-4">
                    <h5 className="mt-4">
                      Order Date: {orderDateObj?.Order_date}
                    </h5>
                    <hr />

                    <div className="row">
                      {orderItems.map((item, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "200px" }}
                          >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="container w-100 p-0">
                                <span className="m-1">Qty: {item.qty}</span>
                                <span className="m-1">Size: {item.size}</span>
                                <div className="d-block mt-2 fs-5">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

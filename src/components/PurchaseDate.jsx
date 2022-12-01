import React from "react";

const PurchaseDate = ({purchase}) => {
  const date = new Date(purchase?.createdAt)
  return (
    <div className="order-text">
      <p>Order date: {date.toDateString()} </p>
    </div>
  );
};

export default PurchaseDate;

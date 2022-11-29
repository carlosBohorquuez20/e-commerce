import React from "react";
import "../styles/loading.css";
const LoadingScreen = () => {
  return (
    <div className="screen-background">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

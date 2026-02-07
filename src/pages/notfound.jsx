import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/not-found.json";
export default function Error() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={notFoundAnimation} loop={true} />
    </div>
  );
}

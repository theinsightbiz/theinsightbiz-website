import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/not-found.json";
export default function Error() {
  const err = typeof useRouteError === "function" ? useRouteError() : null;
  const status = err?.status || err?.response?.status || 404;

  return (
    <div>
      <Lottie animationData={notFoundAnimation} loop={true} />
    </div>
  );
}

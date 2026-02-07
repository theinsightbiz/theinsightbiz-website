import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const err = typeof useRouteError === "function" ? useRouteError() : null;
  const status = err?.status || err?.response?.status || 404;

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ textAlign: "center", maxWidth: 520 }}>
        <h1 style={{ margin: 0 }}>{status}</h1>
        <p style={{ marginTop: 8 }}>
          {status === 404 ? "Page not found." : "Something went wrong."}
        </p>
        <Link to="/" style={{ display: "inline-block", marginTop: 12 }}>
          Go home
        </Link>
      </section>
    </main>
  );
}

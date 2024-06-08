import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  );
};

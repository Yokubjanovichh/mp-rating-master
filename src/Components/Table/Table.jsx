import React, { memo } from "react";
import "./Table.css";

export const Table = memo(({ children }) => {
  return (
    <div className="table-wrapper">
      <table className="table-root">{children}</table>
    </div>
  );
});

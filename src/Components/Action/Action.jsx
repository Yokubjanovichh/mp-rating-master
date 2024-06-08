import React, { memo } from "react";
import "./Action.css";

export const Action = memo(({ children, pd }) => {
  return <div className="action">{children}</div>;
});

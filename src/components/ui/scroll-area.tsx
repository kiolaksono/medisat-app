import * as React from "react";

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} style={{ overflowY: "auto" }}>
      {children}
    </div>
  );
};

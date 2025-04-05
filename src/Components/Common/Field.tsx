import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="block  mb-2">
          {label}
        </label>
      )}
      {children}
      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
}

// Ensure we safely get the child's ID
const getChildId = (children) => {
  if (React.isValidElement(children)) {
    return children.props?.id || "";
  }
  return "";
};

import React from "react";

export function Card({ title, icon, children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 flex flex-col ${className}`}
    >
      {title && (
        <div className="flex items-center mb-4">
          {icon && <div className="mr-2">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
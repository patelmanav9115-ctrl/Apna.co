import React from "react";

const StatItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  );
};

export default StatItem;
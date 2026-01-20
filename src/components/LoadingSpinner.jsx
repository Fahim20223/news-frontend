import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
      <p className="text-base-content/70">Loading news articles...</p>
    </div>
  );
};

export default LoadingSpinner;

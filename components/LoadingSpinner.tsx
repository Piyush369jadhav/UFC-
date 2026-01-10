import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#715A5A]"></div>
      <p className="text-[#b0b8b7] mt-4 text-lg">Fetching Live Fight Data from Google...</p>
    </div>
  );
};

export default LoadingSpinner;
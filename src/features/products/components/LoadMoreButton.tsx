import React from 'react';
import { ArrowDownIcon } from '../../../components/icons';

const LoadMoreButton: React.FC = () => {
  return (
    <div className="text-center py-8 bg-gray-100">
      <button className="bg-white text-gray-700 px-6 py-3 -mt-5 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center mx-auto">
        <ArrowDownIcon className="h-5 w-5 mr-2" />
        Scroll to load deals
      </button>
    </div>
  );
};

export default LoadMoreButton;
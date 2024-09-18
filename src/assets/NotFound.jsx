import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-4">Oops! Page not found.</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">Go back to Home</Link>
    </div>
  );
};

export default NotFound;

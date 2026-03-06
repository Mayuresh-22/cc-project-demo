import React from "react";

const WelcomeScreen: React.FC = () => {
  return (
    <div className="welcome-screen">
      <h1 className="text-4xl font-bold text-green-600">Welcome to GreenGuardian</h1>
      <p className="text-gray-500 mt-2">Your journey to sustainable living starts here.</p>
    </div>
  );
};

export default WelcomeScreen;
import React, { useState, useEffect } from 'react';

export const NotFound = () => {
  const [dotPosition, setDotPosition] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Move the dot randomly
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 80) + 10; // 10% - 90%
      const left = Math.floor(Math.random() * 80) + 10;
      setDotPosition({ top: `${top}%`, left: `${left}%` });
    }, 1000); // move every 1 second

    return () => clearInterval(interval);
  }, [gameStarted]);

  const handleDotClick = () => {
    setScore(prev => prev + 1);
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">But you can play a quick game while you're here!</p>
      <a className="text-blue-800 underline mt-2" href="/">Go Home</a>

      {!gameStarted && (
        <button
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setGameStarted(true)}
        >
          Start Game
        </button>
      )}

      {gameStarted && (
        <>
          <p className="mt-4">Score: <span className="font-bold">{score}</span></p>
          <div
            className="absolute w-8 h-8 bg-blue-500 rounded-full cursor-pointer transition-all duration-300"
            style={{
              top: dotPosition.top,
              left: dotPosition.left,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={handleDotClick}
          />
        </>
      )}
    </div>
  );
};

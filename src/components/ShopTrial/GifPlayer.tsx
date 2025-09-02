import React, { useState } from "react";

// This component plays a GIF when clicked, and shows a static image when not clicked.
// It uses Tailwind CSS for styling and is designed to be responsive.
export default function GifPlay() {
  // State to manage whether the GIF is currently playing (true) or not (false).
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle the isPlaying state when the component is clicked.
  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
        onClick={handleClick}
      >
        {/* Conditional rendering based on isPlaying state */}
        {isPlaying ? (
          // Display the GIF when isPlaying is true
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWQ4Y2QyM2E0Y2M0YjBkMjQ2Y2QxYjY5NmEwY2Q1YjYyYmQ2YjQ2YjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYyYjYx/d4/raw/master/public/play-button.png"
            alt="Play GIF"
            className="w-full h-auto rounded-lg"
          />
        ) : (
          // Display the static image when isPlaying is false
          <img
            src="https://placehold.co/600x400/000000/FFFFFF?text=Click+to+Play" // Placeholder for static image
            alt="Play GIF"
            className="w-full h-auto rounded-lg"
          />
        )}

        {/* Text overlay to indicate action */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
          {isPlaying ? "Click to Pause" : "Click to Play"}
        </div>
      </div>
    </div>
  );
}

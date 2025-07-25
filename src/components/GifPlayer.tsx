"use client"; // This directive is important for client-side functionality in Next.js

import React, { useState, useEffect } from 'react';

interface GifPlayerProps {
  firstGifSrc: string; // URL for the GIF that plays once
  firstGifDurationMs: number; // Duration in milliseconds for the first GIF's single play
  secondGifSrc: string; // URL for the GIF that loops continuously
}

const GifPlayer: React.FC<GifPlayerProps> = ({
  firstGifSrc,
  firstGifDurationMs,
  secondGifSrc,
}) => {
  // State to control which GIF is currently visible
  const [showFirstGif, setShowFirstGif] = useState(true);
  // State to manage loading status, useful for showing a spinner
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to switch from the first GIF to the second GIF
    // after the specified duration.
    const timer = setTimeout(() => {
      setShowFirstGif(false);
      setIsLoading(false); // Once the first GIF's "play" time is up, stop loading
    }, firstGifDurationMs);

    // Cleanup function: Clear the timeout if the component unmounts
    // before the timer finishes.
    return () => clearTimeout(timer);
  }, [firstGifDurationMs]); // Re-run effect if duration changes

  // Handle image loading to hide loading spinner once image is ready
  const handleImageLoad = () => {
    // Only set loading to false if it's the first GIF and we're still showing it
    // Or if it's the second GIF and it loads
    if (showFirstGif || !showFirstGif) {
      setIsLoading(false);
    }
  };

  // Handle image error to prevent broken image icons
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Failed to load GIF:", e.currentTarget.src);
    // Optionally, set a fallback image or hide the component
    e.currentTarget.src = "https://placehold.co/200x200/cccccc/ffffff?text=Error"; // Placeholder for error
    setIsLoading(false); // Stop loading even on error
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 text-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
            <p className="text-gray-700 text-lg font-semibold">Loading GIF...</p>
          </div>
        )}

        {showFirstGif ? (
          <img
            src={firstGifSrc}
            alt="First GIF (plays once)"
            className="w-full h-auto rounded-md"
            onLoad={handleImageLoad}
            onError={handleImageError}
            // Add a key to force re-render if src changes, though unlikely here
            key="first-gif"
          />
        ) : (
          <img
            src={secondGifSrc}
            alt="Second GIF (loops continuously)"
            className="w-full h-auto rounded-md"
            onLoad={handleImageLoad} // Still useful if second GIF loads later
            onError={handleImageError}
            key="second-gif"
          />
        )}

        <p className="mt-4 text-gray-600 text-sm">
          {showFirstGif
            ? `Playing first GIF for ${firstGifDurationMs / 1000} seconds...`
            : "Second GIF is now looping."}
        </p>
      </div>
    </div>
  );
};

export default GifPlayer;

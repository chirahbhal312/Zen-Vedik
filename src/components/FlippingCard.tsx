"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Patrick_Hand_SC } from "next/font/google";

const patrickHandSC = Patrick_Hand_SC({
  weight: "400",
  subsets: ["latin"],
});

interface FlippingCardProps {
  frontBgColor?: string;
  imageBgColor?: string;
  imageSrc?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function FlippingCard({
  frontBgColor = "#b5bf7a",
  imageBgColor = "#E9EDC9",
  imageSrc = "/CardImg.png",
  heading = "ZenSound Lounge",
  subheading = "Feeling overwhelmed?",
  description = "Escape into calming tunes, nature's whispers, or gentle",
  buttonText = "Learn More",
  buttonUrl = "#",
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flipping-card-root"
      style={{
        perspective: 1000,
      }}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* FRONT SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: frontBgColor,
            borderRadius: 18,
            backfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.16)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflow: "hidden",
          }}
        >
          {/* Image container */}
          <div
            style={{
              width: "100%",
              background: imageBgColor,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              marginBottom: 18,
              position: "relative",
            }}
          >
            <h2
              className={patrickHandSC.className}
              style={{
                top: "20px",
                position: "absolute",
                fontSize: 24,
                fontWeight: 600,
                color: "#5A2E17",
                letterSpacing: "1px",
              }}
            >
              {heading}
            </h2>
            <img
              src={imageSrc}
              alt="Card Illustration"
              style={{
                width: "100%",
                height: "100%",
                marginTop: "10px",
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
          </div>

          {/* Subheading */}
          {/* Subheading */}
<p
  className={patrickHandSC.className}
  style={{
    fontSize: 36,
    color: "#FCF3DC",
    lineHeight: 0.8,       // ✅ better readability for multi-line
    fontWeight: 500,
    textAlign: "left",
    wordBreak: "break-word", // ✅ ensures long words wrap too
    whiteSpace: "normal",    // ✅ allows line breaks
  }}
>
  {subheading}
</p>


          {/* Description */}
        {/* Description */}
{/* Description */}
<p
  style={{
    fontSize: 15,
    marginTop: "10px",
    lineHeight: 1.4,
    color: "#FCF3DC",
    fontWeight: 400,
    width: "100%",
    textAlign: "left",
    letterSpacing: "0.5px",
    overflow: "hidden",              // ✅ hide extra content
    textOverflow: "ellipsis",        // ✅ add "…" at cutoff
    display: "-webkit-box",          // ✅ flex-like for text
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,              // ✅ allow up to 3 lines
  }}
>
  {description}
</p>


        </div>

        {/* BACK SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: frontBgColor, // same as front
            color: "#FCF3DC",
            borderRadius: 18,
            backfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.16)",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <h2
            className={patrickHandSC.className}
            style={{
              fontSize: 28,
              fontWeight: 600,
              marginBottom: "15px",
              letterSpacing: "1px",
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              maxWidth: "90%",
              margin: "0 auto 20px auto",
              letterSpacing: "0.5px",
            }}
          >
            {description}
          </p>

          {/* Button */}
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#FCF3DC",
              color: "#5A2E17",
              padding: "10px 20px",
              borderRadius: "999px",
              fontWeight: "bold",
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "2px 4px rgba(0,0,0,0.2)",
              transition: "background 0.3s",
            }}
            onClick={(e) => e.stopPropagation()} // prevent flipping
          >
            {buttonText}
          </a>
        </div>
      </motion.div>

      {/* Responsive styles */}
      <style jsx>{`
        .flipping-card-root {
          width: min(304px, 21vw);
          max-width: 21.6vw;
          height: min(540px, 60vh);
          max-height: 60vh;
        }

        @media (max-width: 640px) {
          .flipping-card-root {
            min-width: min(320px, 90vw);
            height: 500px;
            max-height: 75vh;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .flipping-card-root {
            min-width: min(360px, 80vw);
            height: 560px;
            max-height: 80vh;
          }
        }
      `}</style>
    </div>
  );
}

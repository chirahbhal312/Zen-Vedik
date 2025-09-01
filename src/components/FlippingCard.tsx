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
}

export default function FlippingCard({
  frontBgColor = "#b5bf7a",
  imageBgColor = "#E9EDC9",
  imageSrc = "/CardImg.png",
  heading = "ZenSound Lounge",
  subheading = "Feeling overwhelmed?",
  description = "Escape into calming tunes, nature's whispers, or gentle",
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [backContent, setBackContent] = useState("Edit back...");

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
          <p
            className={patrickHandSC.className}
            style={{
              fontSize: 36,
              color: "#FCF3DC", // fixed
              lineHeight: 0.8,
              fontWeight: 500,
              letterSpacing: "1px",
              textAlign: "left",
            }}
          >
            {subheading}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              marginTop: "15px",
              marginBottom: "15px",
              lineHeight: 1.25,
              color: "#FCF3DC", // fixed
              fontWeight: 400,
              width: "100%",
              textAlign: "left",
              letterSpacing: "1px",
            }}
          >
            {description}
          </p>

          {/* Read More */}
          {/* <div 
          style={{ marginTop: 20, marginBottom: 0, width: "100%" }}>
            <span
              style={{
                color: "#FCF3DC", // fixed
                fontWeight: 300,
                fontSize: 16,
                float: "right",
                cursor: "pointer",
              }}
            >
              Read More &gt;
            </span>
          </div> */}
        </div>

        {/* BACK SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#fab005", // fixed
            color: "#2d2d2d", // fixed
            borderRadius: 18,
            backfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.16)",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <textarea
            value={backContent}
            onChange={(e) => setBackContent(e.target.value)}
            style={{
              width: "90%",
              height: "140px",
              fontSize: "18px",
              border: "none",
              borderRadius: 8,
              padding: 8,
              resize: "none",
              color: "#2d2d2d",
            }}
          />
          <span
            style={{
              marginTop: 20,
              fontSize: 15,
              opacity: 0.8,
              color: "#2d2d2d",
            }}
          >
            Click to flip!
          </span>
        </div>
      </motion.div>

      {/* Responsive styles */}
      <style jsx>{`
       .flipping-card-root {
  width: min(304px, 21vw);    /* 338 * 0.9 ≈ 304 */
  max-width: 21.6vw;          /* 24vw * 0.9 */
  height: min(540px, 60vh);   /* 600 * 0.9 = 540 */
  max-height: 60vh;           /* 60vh * 0.9 */
}

/* 📱 Mobile (up to 640px) */
@media (max-width: 640px) {
  .flipping-card-root {
    min-width: min(320px, 90vw);
    height: 500px;         /* smaller fixed height for mobile */
    max-height: 75vh;
  }
}

/* 📱💻 Tablets (641px – 1024px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .flipping-card-root {
    min-width: min(360px, 80vw);
    height: 560px;         /* larger for tablets */
    max-height: 80vh;
  }
}

      `}</style>
    </div>
  );
}

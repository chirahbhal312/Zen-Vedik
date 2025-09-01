"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HomePageFadeBlur from "@/components/HomePage"; // Assuming this renders HomePageContent
import Navbar from "@/components/Navbar";
import FlippingCard from "@/components/FlippingCard";
import ProductCarousel from "@/components/ProductCarousel";
import HomepageContainer from "@/components/HomePageContainer";

export default function Page() {
  return (
    <>
    {/* <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <ProductCarousel />
     
    </main> */}

<HomepageContainer/>
    </>
  );
}

"use client";
import { useEffect } from "react";
import Lenis from "lenis";

const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

const LenisScrollContainer = ({ children }) => {
  useLenisScroll();

  return (
    <div>
      {children}
    </div>
  );
};

export default LenisScrollContainer;
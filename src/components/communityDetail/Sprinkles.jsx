import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CONFETTI_COUNT = 15;

const getRandomTransform = () => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = 40 + Math.random() * 30;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const rotate = Math.random() * 720 - 360;
  const scaleX = 0.6 + Math.random() * 0.8; // 가로 길이 다양화
  const scaleY = 1.2 + Math.random() * 0.8; // 세로 길이 다양화

  return { x, y, rotate, scaleX, scaleY };
};

export const Sprinkles = () => {
  const [confettis, setConfettis] = useState([]);

  useEffect(() => {
    setConfettis(Array.from({ length: CONFETTI_COUNT }, getRandomTransform));
  }, []);

  return (
    <>
      {confettis.map(({ x, y, rotate, scaleX, scaleY }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: "6px",
            height: "10px",
            borderRadius: "1px", // 약간 둥글게
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: 0,
            x,
            y,
            scaleX,
            scaleY,
            rotate,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

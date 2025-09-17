"use client";

import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    router.push("/menu");
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/CoverShabab.mp4"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />

      {/* White Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          zIndex: -1,
        }}
      />

      {/* Login Button */}
      <Box
        sx={{
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 10,
        }}
      >
        <LoginIcon
          sx={{
            fontSize: "4rem",
            color: "#000",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            padding: "0.5rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "#fff",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push("/login");
          }}
        />
      </Box>

      {/* Top Logo */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src="/AlShababLogo.png"
          alt="Al Shabab Logo"
          style={{ width: "60vw" }}
        />
      </Box>

      {/* Tap Here with breathing + click pulse */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src="/TapHere.png"
          alt="Tap Here"
          style={{
            width: "70vw",
            animation: clicked
              ? "pulse 0.4s ease"
              : "breathing 2s ease-in-out infinite",
          }}
        />
      </Box>

      {/* Finger GIF */}
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img src="/FingerGif.gif" alt="Finger Tap" style={{ width: "80vw" }} />
      </Box>

      {/* Footer Logo */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <img
          src="/WWDSLogo.png"
          alt="WhiteWall Logo"
          style={{ width: "50vw", objectFit: "contain" }}
        />
      </Box>

      {/* 🔑 Keyframes */}
      <style jsx>{`
        @keyframes breathing {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
}

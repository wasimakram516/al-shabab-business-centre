"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function VideoModal({ open, onClose, media }) {
  const videos = media?.filter((m) => m.type === "video") || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  const autoPlay = true;

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay with sound blocked by browser:", err);
        });
      }
    }
  }, [autoPlay, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (videos.length === 0) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "95vw",
          height: "auto",
          mt: "5%",
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle>
        Video
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon
            sx={{
              fontSize: "2rem",
              color: "error.main",
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
          />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", textAlign: "center" }}>
          {/* Current Video */}
          <video
            key={videos[currentIndex].fileUrl || currentIndex}
            ref={videoRef}
            src={videos[currentIndex].fileUrl}
            controls
            autoPlay
            style={{
              width: "100%",
              borderRadius: "8px",
            }}
          />

          {/* Show nav only if multiple */}
          {videos.length > 1 && (
            <>
              {/* Prev */}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 16,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.4)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              {/* Next */}
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 16,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.4)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              {/* Dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {videos.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor:
                        i === currentIndex ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Paper,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

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
          position: "relative",
          overflow: "visible",
        },
      }}
    >
      {/* Floating label */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          bgcolor: "maroon",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 4,
          py: 0.5,
          borderRadius: "6px",
          zIndex: 999,
        }}
      >
        <PlayCircleFilledIcon fontSize="small" />
        <Typography variant="subtitle1">Video</Typography>
      </Paper>

      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "error.main",
          zIndex: 999,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
      >
        <CloseIcon />
      </IconButton>

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
              height: "auto",
              maxHeight: "80vh",
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
                    onClick={() => setCurrentIndex(i)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      cursor: "pointer",
                      bgcolor:
                        i === currentIndex ? "maroon" : "rgba(255,255,255,0.5)",
                      transition: "all 0.3s ease",
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

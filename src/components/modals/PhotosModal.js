"use client";
import { useState } from "react";
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

export default function PhotosModal({ open, onClose, media }) {
  const images = media?.filter((m) => m.type === "image") || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (i) => {
    setCurrentIndex(i);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "95vw",
          height: "60vh",
          mt: "5%",
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle>
        Photos
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon
            sx={{
              fontSize: "4rem",
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 0,
        }}
      >
        {/* Image with arrows */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={images[currentIndex].fileUrl}
            alt={images[currentIndex].fileName}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "50vh",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />

          {/* Prev button */}
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

          {/* Next button */}
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
        </Box>

        {/* Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
            gap: 1,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => handleDotClick(i)}
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: i === currentIndex ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

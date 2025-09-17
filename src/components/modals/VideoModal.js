"use client";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";

export default function VideoModal({ open, onClose, media }) {
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
  }, [autoPlay]);

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
      <DialogContent dividers>
        {media
          ?.filter((m) => m.type === "video")
          .map((vid, i) => (
            <video
              key={vid.fileUrl || i}
              ref={videoRef}
              src={vid.fileUrl}
              controls
              autoPlay
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useState } from "react";

export default function BrochureModal({ open, onClose, fileUrl }) {
  const [viewerUrl, setViewerUrl] = useState("");

  useEffect(() => {
    if (!fileUrl) return;

    const fetchAndCache = async () => {
      try {
        const cache = await caches.open("pdf-cache");

        // check if cached
        const cached = await cache.match(fileUrl);
        if (cached) {
          const blob = await cached.blob();
          const blobUrl = URL.createObjectURL(blob);
          setViewerUrl(
            `/pdfjs/web/viewer.html?file=${encodeURIComponent(blobUrl)}`
          );
          return;
        }

        // fetch new
        const response = await fetch(fileUrl, { mode: "cors" });

        if (!response.ok) throw new Error("Failed to fetch PDF");

        const responseForCache = response.clone();

        await cache.put(fileUrl, responseForCache);

        // consume the body for viewer
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        setViewerUrl(
          `/pdfjs/web/viewer.html?file=${encodeURIComponent(blobUrl)}`
        );
      } catch (err) {
        console.error("PDF caching failed:", err);
        setViewerUrl(
          `/pdfjs/web/viewer.html?file=${encodeURIComponent(fileUrl)}`
        ); // fallback
      }
    };

    fetchAndCache();
  }, [fileUrl]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "95vw",
          height: "90vh",
          mt: "5%",
          mx: "auto",
          borderRadius: 2,
          position: "relative",
          overflow: "visible",
        },
      }}
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
    >
      {/* Floating label */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: -35,
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
        <MenuBookIcon fontSize="small" />
        <Typography variant="subtitle1">Brochure</Typography>
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

      <DialogContent sx={{ p: 0, height: "100%" }}>
        {viewerUrl ? (
          <iframe
            src={viewerUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PDF Viewer"
          />
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            {fileUrl ? "Loading PDF…" : "No brochure available."}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

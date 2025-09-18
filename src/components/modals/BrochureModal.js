"use client";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
          overflow: "hidden",
        },
      }}
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 2000 }}
      >
        <CloseIcon
          sx={{
            fontSize: "2.5rem",
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

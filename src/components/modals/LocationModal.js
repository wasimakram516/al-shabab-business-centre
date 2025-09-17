"use client";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LocationModal({ open, onClose, location }) {
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
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
      }}
    >
      <DialogTitle>
        Location
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
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
      </DialogTitle>

      <DialogContent sx={{ p: 0, height: "100%" }}>
        {location ? (
          <iframe
            src={location}
            style={{ width: "100%", height: "100%", border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          "No location set."
        )}
      </DialogContent>
    </Dialog>
  );
}

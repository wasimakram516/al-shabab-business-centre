"use client";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function BrochureModal({ open, onClose, fileUrl }) {

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
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="PDF Viewer"
        />
      </DialogContent>
    </Dialog>
  );
}

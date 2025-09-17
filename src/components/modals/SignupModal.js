"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SignupModal({ open, onClose, signupLink }) {
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
        Sign-Up
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 0, top: 8 }}
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

      <DialogContent sx={{ p: 0, height: "100%",overflow: "hidden", }}>
        {signupLink ? (
          <Box sx={{ width: "100%", height: "100%",pointerEvents: "auto", }}>
            <iframe
              src={signupLink}
              title="Sign Up Form"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
        ) : (
          "No signup link configured."
        )}
      </DialogContent>
    </Dialog>
  );
}

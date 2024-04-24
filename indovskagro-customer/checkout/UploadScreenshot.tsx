import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImageToStorage } from "../src/firebase/screenshots";
import { Box, Typography } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function UploadScreenshot({
  screenshotUrl,
  setScreenshotUrl,
}: {
  screenshotUrl: string | null;
  setScreenshotUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Screenshot of Payment"}
        <VisuallyHiddenInput
          type="file"
          value={""}
          onChange={async (e) => {
            if (e.target.files) {
              const file = e.target.files[0];

              try {
                setLoading(true);
                const imageUrl = await uploadImageToStorage(file);
                setScreenshotUrl(imageUrl);
                console.log(imageUrl);
              } catch (error) {
                console.error("Error uploading image", error);
              }
              setLoading(false);
            }
          }}
          accept="image/*"
        />
      </Button>
      <Typography
        variant="h6"
        sx={{
          display: "block",
          marginTop: "8px",
        }}
      >
        Uploaded Screenshot:
      </Typography>
      <Box>
        {screenshotUrl && (
          <img
            src={screenshotUrl}
            alt="screenshot"
            style={{ width: "100px" }}
          />
        )}
      </Box>
    </>
  );
}

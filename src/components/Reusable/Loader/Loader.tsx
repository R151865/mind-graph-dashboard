import React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Loader: React.FC = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((each, index) => (
        <LinearProgress
 
          key={index}
          color="inherit"
          sx={{
            height: "30px",
            borderRadius: "10px",
            color: "lightgray",
          }}
        />
      ))}
    </Stack>
  );
};

export default Loader;

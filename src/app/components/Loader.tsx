import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
  
      <ClipLoader
        color="white"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
};

export default Loader;

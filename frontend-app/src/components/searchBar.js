import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBar = (props) => {
  const { searchChange } = props;

  return (
    <Box className="searchBar" noValidate autoComplete="off">
      <TextField
        className="searchBarInput"
        label="Search for movie..."
        variant="outlined"
        onChange={searchChange}
      />
    </Box>
  );
};

export default SearchBar;

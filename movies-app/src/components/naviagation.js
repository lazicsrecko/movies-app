import React, { Fragment, useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs>
          <Link className="textDecorationNone" to="/">
            <Tab label={<TheaterComedyIcon />} />
          </Link>
          <Link className="textDecorationNone" to="/movies">
            <Tab label="Movies" />
          </Link>
        </Tabs>
      </Box>
    </Fragment>
  );
};

export default Navigation;

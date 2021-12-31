import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth-services";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(!anchorElUser);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = async () => {
    const isLoggedOut = await logout();

    if (isLoggedOut) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };
  return (
    <Fragment>
      <Box className="navbar">
        <Tabs>
          <Link className="textDecorationNone" to="/">
            <Tab label={<TheaterComedyIcon />} />
          </Link>
          {isLoggedIn && (
            <Link className="textDecorationNone" to="/movies">
              <Tab label="Movies" />
            </Link>
          )}
          <Box className="navMenu">
            {!isLoggedIn && (
              <Fragment>
                <Link className="textDecorationNone" to="/register">
                  <Tab label="Register" />
                </Link>
                <Link className="textDecorationNone" to="/login">
                  <Tab label="Login" />
                </Link>
              </Fragment>
            )}
            {isLoggedIn && (
              <Fragment>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
                <Menu
                  className="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={onLogout}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
          </Box>
        </Tabs>
      </Box>
    </Fragment>
  );
};

export default Navigation;

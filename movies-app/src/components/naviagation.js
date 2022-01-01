import React, { Fragment, useState, useContext } from "react";
import { Context } from "../context/user-context";
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
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const [userMenu, setUserMenu] = useState(null);

  const handleOpenUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
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
                  open={userMenu}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem divider>
                    <Typography>
                      {`${currentUser.firstName} ${currentUser.lastName}`}
                    </Typography>
                  </MenuItem>
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

import {
  AppBar,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleChange}
              aria-label="dark mode switch"
              color="secondary"
            />
          }
          // label={darkMode
          //     ? <Typography component="small" color="primary.contrastText">ON</Typography>
          //     : <Typography component="small">OFF</Typography>}
        />
      </FormGroup>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <div>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem color="primary" onClick={handleClose}>
                About
              </MenuItem>
              <MenuItem onClick={handleClose}>Tournaments</MenuItem>
            </Menu>
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AGON
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Menu Icon for mobile

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Left-aligned app title */}
            <Grid item>
              <Typography variant="h6">
                Contact Management
              </Typography>
            </Grid>

            {/* Mobile Hamburger Menu */}
            <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                color="inherit"
                edge="end"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Dashboard
                </MenuItem>
                <MenuItem component={Link} to="/add-contact" onClick={handleMenuClose}>
                  Add Contact
                </MenuItem>
              </Menu>
            </Grid>

            {/* Desktop Navigation Items */}
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box display="flex" justifyContent="flex-end">
                <Button color="inherit" component={Link} to="/">
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/add-contact">
                  Add Contact
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AccountMenu from './AccountMenu';
import AdminMenu from './AdminMenu';
import SearchBox from './SearchBox';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <header>
      <AppBar position='fixed'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PRO-SHOP
            </Typography>

            {/* MOBILE MENU */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to='/cart'
                >
                  <ListItemIcon>
                    <ShoppingCartIcon fontSize='small' />
                  </ListItemIcon>
                  <Typography>Cart</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to='/login'
                >
                  <ListItemIcon>
                    <PersonIcon fontSize='small' />
                  </ListItemIcon>
                  <Typography>Sign In</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <SearchBox />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mx: 0.5, color: 'white' }}
                startIcon={<ShoppingCartIcon />}
                component={Link}
                to='/cart'
              >
                Cart
              </Button>

              {!userInfo && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ mx: 1, color: 'white' }}
                  startIcon={<PersonIcon />}
                  component={Link}
                  to='/login'
                >
                  Sign in
                </Button>
              )}
            </Box>
            {userInfo && <AccountMenu user={userInfo} />}
            {userInfo && userInfo.isAdmin && <AdminMenu user={userInfo} />}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;

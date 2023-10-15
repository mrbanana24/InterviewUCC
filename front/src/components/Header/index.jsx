import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

function Header() {
  const nombre = sessionStorage.getItem('nombre');
  const FirstLatter = nombre.charAt(0).toUpperCase();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UCC
          </Typography>
          <Avatar>{FirstLatter}</Avatar>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

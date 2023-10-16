import { Grid } from '@giphy/react-components'
import MuiGrid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RegisterForm from '../../components/RegisterForm'
import { GiphyFetch } from '@giphy/js-fetch-api';

const Register = () => {
  const giphyFetch = new GiphyFetch("jG4BYKxt5QNeDVk0ufYIiYjU1t7lGGGe");
  const searchTag = 'Who are you?';
  const fetchGifs = (offset) => giphyFetch.search(searchTag, { offset, limit: 10 });

  const blurStyle = {
    position: 'relative',
    overflow: 'hidden',
  };

  const overlayStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  };

  return (
    <MuiGrid container sx={{ backgroundColor:'#8FBC8F'}}>
      {/* First half screen */}
      <MuiGrid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3}>
          <RegisterForm />
        </Paper>
      </MuiGrid>
      {/* Second half screen */}
      <MuiGrid item xs={12} md={6} sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <Paper elevation={3} style={{ ...blurStyle, position: 'relative', overflow: 'hidden' }}>
          <div style={overlayStyle}></div>
          <Grid width={800} columns={3} gutter={2} borderRadius={9} fetchGifs={fetchGifs} key={searchTag} />
        </Paper>
      </MuiGrid>
    </MuiGrid>
  )
}

export default Register;

import RButton from "../../components/Button";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { useAsync } from "react-async-hook";

const Home = () => {
  const giphyFetch = new GiphyFetch("jG4BYKxt5QNeDVk0ufYIiYjU1t7lGGGe");
  const navigate = useNavigate();
  const [gif, setGif] = useState(null);

  const styles = {
    container: {
      border: '1px solid #D8A1A1',
      height: '100vh',
      width: '30vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
    },
    gifContainer: {
      zIndex: -1,
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    buttonGrid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerText: { // TODO: Usar props de Grid y no css
      color: '#D8A1A1',
      position: 'absolute',
      right: 100,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  };

  useAsync(async () => {
    const { data } = await giphyFetch.gif('5Zesu5VPNGJlm');
    setGif(data);
  }, []);

  return (
    <>
      {/* Uso de API, para no usar URL como background-image */}
      <div style={styles.gifContainer}>
        {gif && <Gif gif={gif} />}
      </div>
      <Grid container sx={styles.container}>
        <Grid item xs={12} sm={6} sx={styles.buttonGrid}>
          <Grid sx={{ margin: '1rem' }}>
            <RButton
              text="Login"
              action={() => navigate('/login')}
              extraStyle={{ color: '#D8A1A1', padding: '1rem' }}
            />
          </Grid>
          <Grid>
            <RButton
              text="Register"
              action={() => navigate('/register')}
              extraStyle={{ color: '#D8A1A1', padding: '1rem' }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h2" component="div" sx={styles.containerText}>
        INTERVIEW UCC
      </Typography>
    </>
  );
}

export default Home;

import {Grid} from "@mui/material"
import RButton from "../../components/Button"
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const styles = {
    box: {
      border: '1px solid blue',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

    },
  }

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  return (
    <>
      <Grid container>
        {/* Left part of screen, TODO:Add gift in left part screen */}
        <Grid item xs={12} sx={styles.box}>
          <p>{token}</p>

          <RButton
            text="Login"
            action={() => navigate('/login')}
          />
          <RButton
            text="Register"
            action={() => navigate('/register')}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
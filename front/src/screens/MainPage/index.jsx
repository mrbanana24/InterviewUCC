import Header from "../../components/Header";
import JobForm from "../../components/JobForm";
import DisplayJobs from "../../components/DisplayJobs";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

const MainPage = () => {

  const styles = {
    firstGrid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    }
  };

  return(
    <>
      <Header/>
      <Grid container>
        <Grid item xs={12} sm={6} sx={styles.firstGrid}>
          <Typography variant="h2" component="div">
            Hola {sessionStorage.getItem('nombre')}!
          </Typography>
          <Typography variant="body2" component="div">
            Suscribete a las profesiones que te interesen!
            Asi los reclutadores podran contactarte.
          </Typography>
          <JobForm/>
        </Grid>
        <Grid item xs={12} sm={6} sx={styles.firstGrid}>
          <Typography variant="h4" component="div">
            Tus profesiones:
          </Typography>
          <DisplayJobs/>
        </Grid>
      </Grid>
    </>
  )
}

export default MainPage;

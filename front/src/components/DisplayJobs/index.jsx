import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { getJobs } from '../../utils/api';

const DisplayJobs = () => {
  const styles = {
    container: {
      height: '80vh',
      width: '40vw',
      overflowY: 'auto'
    },
    card: {
      width: '80%',
      height: '30%',
      margin: '1rem auto',
    },
    // hover effect in cards
    cardHover: {
      '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
      },
    },
    title: {
      fontSize: '19px', 
      marginBottom: '8px', 
    },
    
    description: {
      fontSize: '16px', 
      color: 'grey', 
    },
  };

  const nombre = sessionStorage.getItem('nombre');
  const [jobs, setJobs] = useState([]);

  useEffect (() => {
    const fetchJobs = async () => {
      const data = await getJobs(nombre);
      setJobs(data.data.profesiones);
    }
    fetchJobs();
  }, []);

  return (
  <Grid container sx={styles.container}>
    {jobs.map((job) => (
      <Card key={job._id} sx={{...styles.card, ...styles.cardHover}}>
        <Typography variant="h5" component="div">
          {job.titulo}
        </Typography>
        <Typography variant="body2">
          {job.descripcion}
        </Typography>
      </Card>
    ))}
  </Grid>
);

};

export default DisplayJobs;

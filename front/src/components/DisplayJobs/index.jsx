import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../../utils/api';
import RButton from '../../components/Button'
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Snackbar from '../../components/Snackbar'
import EditJobForm from '../EditJobForm';

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

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [severity, setSeverity] = useState('success');
  const nombre = sessionStorage.getItem('nombre');
  const [jobs, setJobs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleEditClick = (job) => {
    setEditingJob(job);
    setEdit(true);
  };

  useEffect (() => {
    const fetchJobs = async () => {
      const data = await getJobs(nombre);
      setJobs(data.data.profesiones);
    }
    fetchJobs();
  }, []);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleDeleteJob = (nombre, id) => async () => {
    try {
      const data = await deleteJob(nombre, id);
      console.log(data);
      if (data.status === 200){
          setJobs(data.data.profesiones);
          setBody(data.data.message);
          setSeverity('success');
          setOpen(true);
        } else {
          setBody(data.data.message);
          setSeverity('error');
          setOpen(true);
        }
    } catch (error){
      console.log(error);
    }};


   return (
    <>
      <RButton
        text="Recargar"
        action={() => {
          const fetchJobs = async () => {
            const data = await getJobs(nombre);
            setJobs(data.data.profesiones);
          };
          fetchJobs();
        }}
        icon={<RotateLeftOutlinedIcon />}
      />
      <Grid container sx={styles.container}>
        {jobs.map((job) => (
          <Card key={job._id} sx={{ ...styles.card, ...styles.cardHover }}>
            <Typography variant="h5" component="div">
              {job.titulo}
            </Typography>
            <Typography variant="body2">
              {job.descripcion}
            </Typography>
            <DeleteForeverOutlinedIcon
              onClick={handleDeleteJob(nombre, job._id)}
            />
            <EditOutlinedIcon onClick={() => handleEditClick(job)} />
            {edit && editingJob?._id === job._id && (
              <EditJobForm
                open={edit}
                job={editingJob}
                onCancel={() => {
                  setEditingJob(null);
                  setEdit(false);
                }}
              />
            )}
          </Card>
        ))}
        <Snackbar
          body={body}
          severity={severity}
          open={open}
          handleClose={() => handleClose()}
        />
      </Grid>
    </>
  );
};

export default DisplayJobs;

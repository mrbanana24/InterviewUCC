import { useFormik } from 'formik';
import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import RButton from '../../components/Button';
import Snackbar from '../../components/Snackbar';
import { addJob } from '../../utils/api';


const JobForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      profesion: '',
      descripcion: '',
    },
    onSubmit: async (values) => {
      try {
      const nombre = sessionStorage.getItem('nombre');
      const { profesion, descripcion } = values;
      const response = await addJob(nombre, profesion, descripcion);

      if (response.status === 201) {
        formik.resetForm();
        setOpen(true);
        setMessage(response.data.message);
        setSeverity('success');
      } } catch (error) {
        setOpen(true);
        setMessage(error.response.data.message);
        setSeverity('error');
      }
    },
  });

  const styles = {
    form: {
      maxWidth: '30vw',
      minHeight: '20vh',
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '10px',
      margin: 'auto',
      display: 'flex',          
      flexDirection: 'column',  
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      margin: '8px 0',
    },
  };

  return (
    <>
    <Grid container sx={styles.form}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={styles.input}
          id="profesion"
          name="profesion"
          label="Nombre de tu profesion"
          value={formik.values.profesion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
        <TextField
          sx={styles.input}
          id="descripcion"
          name="descripcion"
          label="Cuentanos sobre tu profesion!"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          multiline
          rows={4} 
        />
        <RButton 
          text="Agregar"
          action={formik.handleSubmit}
          icon={<ForwardOutlinedIcon />}
        />
      </form>
    </Grid>
    <Snackbar
      open={open}
      message={message}
      severity={severity}
      body={message}
      handleClose={() => handleClose()}
    />
    </>
  );
};

export default JobForm;

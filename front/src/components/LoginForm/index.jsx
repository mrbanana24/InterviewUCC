import { useFormik } from 'formik';
import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import RButton from '../../components/Button';
import {loginUser} from '../../utils/api'
import Snackbar from '../../components/Snackbar';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  // states
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
      const {nombre, password} = values;
      const response = await loginUser(nombre, password)
      const {token} = response.data
      sessionStorage.setItem('token', token)

      if (response.status === 200) {
        setOpen(true);
        setMessage(response.data.message);
        setSeverity('success');
        response && Navigate('/mainpage')
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
          id="nombre"
          name="nombre"
          label="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
        <TextField
          sx={styles.input}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <RButton 
          text="Login"
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

export default LoginForm;

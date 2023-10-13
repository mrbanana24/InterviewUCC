import {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { Grid, TextField } from '@mui/material';
import RButton from '../Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import {createUser} from '../../utils/api';
import {useNavigate} from "react-router-dom";
import Snackbar from "../../components/Snackbar";
import * as Yup from 'yup';


const styles = {
  form: {
    minHeight: '40vh',
    width: '90%',
    maxWidth: '50vh',
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '10px',
  },
  input: {
    width: '100%',
    marginBottom: '16px',
  },
};

const validationSchema = Yup.object().shape({
  name_player: Yup.string()
      .required('Este campo es obligatorio'),
});

const RegisterForm = () => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [body, setBody] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container>
    <Formik
      initialValues={{
        username: '',
        mail: '',
        password: '',
        confirmpassword: '',
      }}
      validationSchema={validationSchema}

      onSubmit={(values) => {
        console.log('values enviados', values);
      }}
    >
      <Form>
        <Grid container spacing={2} sx={styles.form}>
          <Grid item xs={12}>
            <Field
              as={TextField}
              id="username"
              name="username"
              placeholder="Por ejemplo: Juan"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              id="mail"
              name="mail"
              placeholder="username@gmail.com"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              id="password"
              name="password"
              placeholder="***"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              id="confirmpassword"
              name="confirmpassword"
              placeholder="***"
              fullWidth
              sx={styles.input}
            />
          </Grid>
          <Grid item xs={12}>
            <RButton
              text="Crear usuario"
              action={() => console.log('Crear usuario')}
              icon={<ForwardOutlinedIcon />}
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
    <Snackbar
      open={open}
      body={body}
      severity={severity}
      handleClose={handleClose}
    />
    </Grid>
  );
};

export default RegisterForm;

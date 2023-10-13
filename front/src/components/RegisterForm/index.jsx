import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField } from '@mui/material';
import RButton from '../../components/Button';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import {createUser} from '../../utils/api'


const validationSchema = yup.object({
  nombre: yup
    .string('Enter your nombre')
    .min(3, 'nombre should be of minimum 3 characters length')
    .required('nombre is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .required('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      password: '',
      confirmPassword: '',
      domicilio: {
        calle: '',
        numero: '',
        ciudad: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values:',values)
      const {nombre, password, domicilio} = values;
      const response = await createUser(nombre, password, domicilio)
      console.log('response:',response.data)

      if (response.status === 201) {
        alert("Usuario creado con exito") // TODO: remplazar por snackbar
      } else {
        alert("Error al crear usuario")
      }
    },
  });

  const styles = {
    form: {
      border: '1px solid black', // TODO: borrarlo
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
    },
    input: {
      margin: '10px 0',
      width: '80%',
      alignSelf: 'center',
    },
  };

  return (
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
        <TextField
          sx={styles.input}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <TextField
          sx={styles.input}
          id="domicilio.calle"
          name="domicilio.calle"
          label="Calle"
          value={formik.values.domicilio.calle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.domicilio?.calle && Boolean(formik.errors.domicilio?.calle)}
          helperText={formik.touched.domicilio?.calle && formik.errors.domicilio?.calle}
        />
        <TextField
          sx={styles.input}
          id="domicilio.numero"
          name="domicilio.numero"
          label="Numero"
          value={formik.values.domicilio.numero}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.domicilio?.numero && Boolean(formik.errors.domicilio?.numero)}
          helperText={formik.touched.domicilio?.numero && formik.errors.domicilio?.numero}
        />
        <TextField
          sx={styles.input}
          id="domicilio.ciudad"
          name="domicilio.ciudad"
          label="ciudad"
          value={formik.values.domicilio.ciudad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.domicilio?.ciudad && Boolean(formik.errors.domicilio?.ciudad)}
          helperText={formik.touched.domicilio?.ciudad && formik.errors.domicilio?.ciudad}
        />

        <RButton 
          text="Register"
          action={formik.handleSubmit}
          icon={<ForwardOutlinedIcon />}
        />
      </form>
    </Grid>
  );
};

export default RegisterForm;

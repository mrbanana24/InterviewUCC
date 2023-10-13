import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, TextField } from '@mui/material';
import RButton from '../../components/Button';

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters length')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { // TODO: Add api function
      alert(JSON.stringify(values, null, 2));
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
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          sx={styles.input}
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
        <RButton text="Register" action={formik.handleSubmit} />
      </form>
    </Grid>
  );
};

export default RegisterForm;

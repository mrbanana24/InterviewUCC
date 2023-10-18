import axios from "axios";

export const createUser = async (nombre, password, domicilio) => {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      nombre,
      password,
      domicilio,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (nombre, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      nombre,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyUser = async (token) => {
  try {
    const response = await axios.post("http://localhost:8000/verify", {
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addJob = async (nombre, titulo, descripcion) => {
  try {
    const response = await axios.post("http://localhost:8000/addjob", {
      nombre,
      titulo,
      descripcion,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getJobs = async (nombre) => {
  try {
    const response = await axios.get(`http://localhost:8000/getjobs/${nombre}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteJob = async (nombre, id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/deletejob/${nombre}/${id}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

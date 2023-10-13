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
  }
};

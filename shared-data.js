import axios from 'axios'
const loginRoutine = (user) =>
  new Promise((resolve, reject) => {
    axios
      .post("http://localhost:3000/users/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("user-token", token);
        resolve(response);
      })
      .catch((error) => {
        console.log("Failed login");
        localStorage.removeItem("user-token");
        reject(error);
      });
  });
export function loginRoutine();
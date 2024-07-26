/* api related functions */

const API_URL = "http://localhost:3001/api";


const login = (name, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  };

  return fetch(API_URL + "/users/login", requestOptions)
    .then(response => response.json())
    .catch(error => []);
}


const checkToken = (token) => {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', authorization: token },
  };

  return fetch(API_URL + "/users/checktoken", requestOptions)
    .then(response => response.json())
    .catch(error => []);
    
}



export {
  login,
  checkToken
};
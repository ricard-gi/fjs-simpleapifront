
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext.js";


import {API_URL} from './config';


export default () => {
  const [resposta, setResposta] = useState('...');

  const {token} = useContext(UserContext);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: "Bearer "+token },
    };
  
    return fetch(API_URL + "/users/secret", requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.ok){
          setResposta(response.data);
        }else{
          setResposta('Error connectant a la API')
        }
      })
      .catch(error => console.log(error));
    
  }, []);

 

  return (
    <main style={{ padding: "1rem 0" }}>
    <h2>Secret...</h2>
    <h3>{resposta}</h3>
  </main>
  );
};


import {useState} from 'react';
import styled from 'styled-components';


const Titolet = styled.h1`
    text-decoration: underline;
    color: ${(props)=>props.xx};
    text-align: center;
`;



export default function Inici() {

  const [importante, setImportante] = useState(false);


  return (
    <main style={{ padding: "1rem 0" }}>
      <Titolet onClick={()=>setImportante(!importante)} xx={importante ? "red" : "black"}>Inici</Titolet>
    </main>
  );
}

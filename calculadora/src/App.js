import './App.css';
import { useState, useEffect } from 'react'



function App() {

  const [pantalla, setPantalla] = useState("");
  const [resultado, setResultado] = useState(false);

  useEffect(() => {
    if (resultado === false) {
      setPantalla("")
    }
  }, [resultado]);

  function handleBoton(boton){
    if (resultado){
      setResultado(false)
    }else{
      const nuevo = pantalla + boton
      setPantalla(nuevo) 
    }
  }

  function handleOp (operador) {
    if (resultado){
      setResultado(false)
    }else if (pantalla === "" && operador !== "-"){
      //no hace nada
    }else if (pantalla.includes("+") || pantalla.includes("*") || pantalla.includes("-") || pantalla.includes("/") ) {
       //no hace nada
    }
    else {
      const nuevo = pantalla + operador
      setPantalla(nuevo) 
    }
  }

  function handleAC(){
    if (resultado){
      setResultado(false)
    }else{
    const nuevo = ""
    setPantalla(nuevo)
  }
  }

  function handleC(){
    if (resultado){
      setResultado(false)
    }else{
      const nuevo = pantalla.slice(0, -1);
    setPantalla(nuevo)
    }
    
  }

  function handleEnter(){
    if (pantalla.includes("+")){
      const numeros = pantalla.split("+");
      const n1 = numeros[0]
      const n2 = numeros[1]
      fetch(`http://localhost:80/suma/${n1}/${n2}`)
        .then(response => response.json())
        .then(data => {
         console.log(data);
         setPantalla(data.resultado.toString())
         setResultado(true)
        })
      .catch(error => {
      console.error('Error:', error);
      });
     } else if (pantalla.includes("*")){
      const numeros = pantalla.split("*");
      const n1 = numeros[0]
      const n2 = numeros[1]
      fetch(`http://localhost:80/mult/${n1}/${n2}`)
        .then(response => response.json())
        .then(data => {
         console.log(data);
         setPantalla(data.resultado.toString())
         setResultado(true)
        })
      .catch(error => {
      console.error('Error:', error);
      });
  } else if (pantalla.includes("-")){
      const numeros = pantalla.split("-");
      const n1 = numeros[0]
      const n2 = numeros[1]
      const data = {
        numero1: n1,
        numero2: n2
      };
      fetch('http://localhost:80/resta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        setPantalla(data.resultado.toString())
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  else if (pantalla.includes("/")){
    const numeros = pantalla.split("/");
    const n1 = numeros[0]
    const n2 = numeros[1]
    const data = {
      numero1: n1,
      numero2: n2
    };
    fetch('http://localhost:80/div', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setPantalla(data.resultado.toString())
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
}

  return (
    <div className = 'calculadora'>
      <div className = 'pantalla'>{pantalla}</div>
      <div className='botones'>
        <div className='fila'>
          <button className='numeros' onClick={() => handleBoton('7')}>7</button>
          <button className='numeros' onClick={() => handleBoton('8')}>8</button>
          <button className='numeros' onClick={() => handleBoton('9')}>9</button>
          <button className='operador' onClick={() => handleOp('*')}>*</button>
        </div>
        <div className='fila'>
          <button className='numeros' onClick={() => handleBoton('4')}>4</button>
          <button className='numeros' onClick={() => handleBoton('5')}>5</button>
          <button className='numeros' onClick={() => handleBoton('6')}>6</button>
          <button className='operador' onClick={() => handleOp('+')}>+</button>
        </div>
        <div className='fila'>
          <button className='numeros' onClick={() => handleBoton('1')}>1</button>
          <button className='numeros' onClick={() => handleBoton('2')}>2</button>
          <button className='numeros' onClick={() => handleBoton('3')}>3</button>
          <button className='operador' onClick={() => handleOp('-')}>-</button>
        </div>
        <div className='fila'>
          <button className='numeros' onClick={() => handleBoton('0')}>0</button>
          <button id="clear" onClick={() => handleAC('AC')}>AC</button>
          <button id="clear" onClick={() => handleC('C')}>C</button>
          <button className='operador' onClick={() => handleOp('/')}>/</button>
        </div>
        <div className='fila'>
          <button id="igual" onClick={() => handleEnter('=')}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;

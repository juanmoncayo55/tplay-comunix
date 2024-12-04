import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../Juegos';
import "./index.css"

const Hangman = () => {
  const { data, moves, handleMoves, boardSize, setWinner } = useContext(GameContext);

  //Variables de estado que me ayudaran a controlar el registro de info de la api, los errores y el loading de la info.
  const [vueltasCorazon, setVueltasCorazon] = useState(3);
  const [palabraSecreta, setPalabraSecreta] = useState('');
  const [inputsLetras, setInputsLetras] = useState([]);

  const separarPalabra = () => {
    console.log(data)
    // Verificar que data existe y tiene respuesta antes de continuar
    if (data && data.respuesta[0].opcion) {
      setPalabraSecreta(data.respuesta[0].opcion);
      handleMoves(data.errores);
      setVueltasCorazon(data.intentos)

      const inputsIniciales = data.respuesta[0].opcion.split('').map((letra, index) => ({
        valor: index === 0 ? letra : '',
        esCorrecta: index === 0,
        bloqueado: index === 0
      }));

      setInputsLetras(inputsIniciales);
    }
  };

  const verificarLetra = (index, valorIngresado) => {
    const nuevosInputs = [...inputsLetras];
    const letraCorrecta = palabraSecreta[index].toLowerCase();
    
    if (valorIngresado.toLowerCase() !== letraCorrecta) {
      // Letra incorrecta
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: false 
      };
      //setIntentosRestantes(prev => prev - 1);
      handleMoves(moves - 1);
    } else {
      // Letra correcta
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: true 
      };
    }

    setInputsLetras(nuevosInputs);

    // Verificar condiciones de victoria o derrota
    if(moves == 1){
      handleMoves(10)
      setVueltasCorazon(valor => valor - 1)
    }
    console.log( vueltasCorazon )
    if(vueltasCorazon < 1){
      bloquearInputs();
    }

    /*if(){
    }*/

    // Verificar si se completó la palabra
    const palabraAdivinada = nuevosInputs.every((input, i) => 
      input.valor.toLowerCase() === palabraSecreta[i].toLowerCase()
    );

    if (palabraAdivinada) {
      alert('¡Felicidades! Has adivinado la palabra.');
      bloquearInputs();
    }

  };

  const bloquearInputs = () => {
    const inputsBloqueados = inputsLetras.map(input => ({
      ...input,
      bloqueado: true
    }));
    setInputsLetras(inputsBloqueados);
  };

  const handleInputChange = (index, evento) => {
    const valorIngresado = evento.target.value;
    
    // Crear una copia del estado actual de inputsLetras
    const nuevosInputs = [...inputsLetras];
    
    // Actualizar el valor del input específico
    nuevosInputs[index] = {
      ...nuevosInputs[index],
      valor: valorIngresado
    };
    
    // Solo verificar letra si se ha insertado texto
    if (evento.nativeEvent.inputType === 'insertText') {
      verificarLetra(index, valorIngresado);
    }
    
    if(vueltasCorazon < 1){
      bloquearInputs();
    }else{
      
      // Actualizar el estado de los inputs
      setInputsLetras(nuevosInputs);
    }
  };

  // Otro useEffect para manejar cuando los datos cambian
  useEffect(() => {
    if (data) {
      separarPalabra();
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center items-center pt-12">
      <div className={`aspect-square h-full max-h-96 xl:max-h-full flex items-center justify-center`}>
        <div className="inputs-container">
         {inputsLetras.map((input, index) => (
           <input
             key={index}
             type="text"
             maxLength={1}
             value={input.valor}
             onChange={(e) => handleInputChange(index, e)}
             readOnly={input.bloqueado}
             style={{
               //backgroundColor: input.esCorrecta === false ? 'red' : input.esCorrecta ? 'green' : 'white',
               margin: '0 5px'
             }}
             className="short_input bottom_line"
           />
         ))}
       </div>
      </div>
    </div>
  );
};

export default Hangman;
import PropTypes from 'prop-types'

const Pregunta = ({pregunta, isLoading, photo}) => {
  return (
    <div className={`bg-gris-claro-azul rounded-3xl w-full h-2/3 max-h-max xl:max-h-full p-6 md:p-12 justify-center flex flex-col items-center ${isLoading && 'skeleton'}`} style={!photo && !isLoading ? null : {backgroundImage: `url(${photo})`, backgroundPosition: "center center", backgroundRepeat: "no-repeat"}}>
        <div className="pregunta space-y-2" id="preguntaDiv">
            {!photo && pregunta}
        </div>
    </div>
  )
}
Pregunta.propTypes={
    pregunta:PropTypes.string,
    isLoading:PropTypes.bool,
    photo: PropTypes.string
}
export default Pregunta
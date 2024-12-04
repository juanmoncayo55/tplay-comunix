import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
export default function MenuJuegos({ display = "list" }) {

    const items = [
        { name: "Ruleta", tipoJuego: "ruleta", oidJuego: "8", oidUsuario: "18" },
        { name: "Trivia", tipoJuego: "trivia", oidJuego: "11", oidUsuario: "18" },
        { name: "Trivia Multiple", tipoJuego: "trivia-multiple", oidJuego: "71", oidUsuario: "18" },
        { name: "Ahorcado", tipoJuego: "ahorcado", oidJuego: "13", oidUsuario: "18" },
        { name: "Rompecabezas", tipoJuego: "rompecabezas", oidJuego: "61", oidUsuario: "18" },
        { name: "Memoria", tipoJuego: "memoria", oidJuego: "", oidUsuario: "" },
        { name: "Crucigrama", tipoJuego: "crucigrama", oidJuego: "98", oidUsuario: "18" },
        { name: "Sopa de letras", tipoJuego: "sopa-de-letras", oidJuego: "", oidUsuario: "" }
    ];

    const navigate = useNavigate();

    const disabledGames = ['memoria', 'sopa-de-letras'];

    return (
        <>
            {display === 'list' ?
                <ul onSelect={(selectedKey) => navigate(selectedKey)} tabIndex={0} className="menu menu-sm dropdown-content bg-azul-claro rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link className={`text-white ${(disabledGames.includes(item.tipoJuego) ? 'line-through pointer-events-none disabled' : '')}`} to={`/juegos/${item.tipoJuego}/${item.oidJuego}/${item.oidUsuario}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                :
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div className={`card w-auto text-azul-claro shadow-lg transition-all ease-in-out duration-700 ${disabledGames.includes(item.tipoJuego) ? 'grayscale bg-gris-claro-azul':'cursor-pointer  hover:shadow-2xl'}`} key={index}>
                            <div className="card-body">
                                <h2 className="card-title mx-auto">{item.name}</h2>
                                <Link className={`btn bg-transparent hover:bg-success stretched-link uppercase font-bold ${disabledGames.includes(item.tipoJuego) ? 'pointer-events-none disabled' : ''}`} to={`/juegos/${item.tipoJuego}/${item.oidJuego}/${item.oidUsuario}`}>
                                    Jugar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

MenuJuegos.propTypes = {
    display: PropTypes.string
}
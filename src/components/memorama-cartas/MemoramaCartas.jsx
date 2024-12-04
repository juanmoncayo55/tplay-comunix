import { Board } from './Board'
import './memoramacards.css'

export default function MemoramaCartas({listaImagenes}) {
  return (
    <>
      <Board imgs={listaImagenes} />
    </>
  )
}

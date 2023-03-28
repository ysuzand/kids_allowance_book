import type { ReactElement } from 'react'
import { useState } from 'react'
import { UI } from '@type/enums'
import Calculator from '@components/section/Calculator'
import Graph from '@components/section/Graph'
import IconButton from '@components/Icon'
import './App.css'

const App = (): ReactElement => {
  const [ui, setUi] = useState(UI.CALC)
  const changeUi = (ui: UI) => {
    setUi(ui)
  }
  return (
    <div className='flex flex-col'>
      <button
        onClick={ () => changeUi(UI.GRAPH)}
        className='bg-transparent w-fit'
      >
        <IconButton color='bg-white' iconSrc='/assets/graph.svg' />
      </button>
        {ui === UI.CALC ? <Calculator className=''/> : null }
        {ui === UI.GRAPH ? <Graph className=''/> : null }
    </div>
  )
}

export default App

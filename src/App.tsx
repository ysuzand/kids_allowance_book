import type { ReactElement } from 'react'
import { useState } from 'react'
import { UI } from '@type/enums'
import UserInfoProvider from '@providers/UserProvider'
import Calculator from '@components/section/Calculator'
import Graph from '@components/section/Graph'
import IconButton from '@components/Icon'
import './App.css'

const App = (): ReactElement => {
  const [ui, setUi] = useState(UI.CALC)
  const changeUi = () => {
    const updateUI = ui === UI.CALC ? UI.GRAPH : UI.CALC
    setUi(updateUI)
  }
  return (
    <UserInfoProvider>
      <div className='flex flex-col'>
        <button
          onClick={changeUi}
          className='bg-transparent w-fit'
        >
          <IconButton color='bg-white' iconSrc={`/assets/${ui === UI.CALC ? 'graph' : 'bank'}.svg`} />
        </button>
          {ui === UI.CALC ? <Calculator className=''/> : null }
          {ui === UI.GRAPH ? <Graph className=''/> : null }
      </div>
    </UserInfoProvider>
  )
}

export default App

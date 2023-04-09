import type { ReactElement } from 'react'
import { useState } from 'react'
import { UI } from '@type/enums'
import UserInfoProvider from '@providers/UserProvider'
import Login from '@components/section/Login'
import Calculator from '@components/section/Calculator'
import Graph from '@components/section/Graph'
import IconButton from '@components/Icon'
import './App.css'

const App = (): ReactElement => {
  const [ui, setUi] = useState(UI.CALC)
  const [isAuth, setIsAuth] = useState(false)
  const changeUi = () => {
    const updateUI = ui === UI.CALC ? UI.GRAPH : UI.CALC
    setUi(updateUI)
  }

  const checkAuth = (isAuth: boolean) => {
    console.log("auth?: ", isAuth)
    if (isAuth) {
      setIsAuth(true)
      setUi(UI.CALC)
    } else {
      setUi(UI.NO_AUTH)
    }
  }
  return (
      <div className='flex flex-col max-w-lg mx-auto'>
        { 
        // ui !== UI.LOGIN && isAuth
        true
          ? <UserInfoProvider>
              <button
                onClick={changeUi}
                className='bg-transparent w-fit'
              >
                <IconButton color='bg-white' iconSrc={`/assets/${ui === UI.CALC ? 'graph' : 'bank'}.svg`} />
              </button>
              {ui === UI.CALC ? <Calculator className=''/> : null }
              {ui === UI.GRAPH ? <Graph className=''/> : null }
            </UserInfoProvider>
          : <Login onAuth={checkAuth}/>
        }
      </div>
  )
}

export default App

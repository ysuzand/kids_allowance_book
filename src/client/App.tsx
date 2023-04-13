import type { ReactElement, FunctionComponent } from 'react'
import { useState , createElement } from 'react'
import { UI } from '@type/enums'
import UserInfoProvider from '@providers/UserProvider'
import Login from '@components/section/Login'
import Calculator from '@components/section/Calculator'
import Graph from '@components/section/Graph'
import IconButton from '@components/Icon'
import './App.css'

interface SectionMap {
  [key: string]: () => JSX.Element
}
const sectionMap: SectionMap = {
  [UI.CALC]: Calculator,
  [UI.GRAPH]: Graph,
}
const App = (): ReactElement => {
  const [ui, setUi] = useState(UI.LOGIN)
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
      <div className='flex flex-col'>
        { 
        ui !== UI.LOGIN && isAuth
          ? <UserInfoProvider>
              <button
                onClick={changeUi}
                className='bg-transparent w-fit'
              >
                <IconButton
                  color='bg-white'
                  iconSrc={`/assets/${ui === UI.CALC ? 'graph' : 'bank'}.svg`}
                  alt={ui === UI.CALC ? 'Open a graph page to see your savings' : 'Back to income/expense registration page'}
                />
              </button>
              {
                (ui in sectionMap) && createElement(sectionMap[ui])
              }
              
            </UserInfoProvider>
          : <Login onAuth={checkAuth}/>
        }
      </div>
  )
}

export default App

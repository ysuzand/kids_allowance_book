import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const initUserInfo: UserInfo = {
    name: '',
    uid: 0,
    uuid: ''
}
const UserInfoContext = createContext<UserInfo>(initUserInfo)

export const useUserInfo = () => useContext(UserInfoContext)

const UserInfoProvider = ({children}:  PropsWithChildren) => {
    const [user, setUser] = useState(initUserInfo)

    useEffect(() => {
        // User info from DB.
        setUser({
            ...user,
            name: 'star',
            uid: 1,
            uuid: '',
        })
    }, [])

    return (
        <UserInfoContext.Provider value={user}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider
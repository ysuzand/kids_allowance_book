import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
interface UserInfo {
    name: string;
    uid: number;
}

const initUserInfo: UserInfo = {
    name: '',
    uid: 0
}
const UserInfoContext = createContext<UserInfo>(initUserInfo)

export const useUserInfo = () => useContext(UserInfoContext)

const UserInfoProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState(initUserInfo)

    useEffect(() => {
        // Fetch user infor from DB.
        setUser({
            ...user,
            name: 'star',
            uid: 1

        })
    }, [])

    return (
        <UserInfoContext.Provider value={user}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider
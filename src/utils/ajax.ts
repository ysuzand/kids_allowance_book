import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
  });

export const GetTotalDB = (uid: number) => {
    return AxiosInstance.get(`/savings/${uid}`)
}

export const UpdateTotalDB = (data: {total: number}, uid: number) => {
    AxiosInstance.patch(`/savings/${uid}`, data)
}

export const CheckAuth = ({uid}: {uid: number}) => {
    return AxiosInstance.post('/login')
}
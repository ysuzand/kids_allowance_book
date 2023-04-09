import axios, { AxiosResponse } from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
  });

export const GetTotalAjax = (uid: number) => {
    return AxiosInstance.get(`/savings/${uid}`)
}

export const UpdateTotalAjax = (data: UpdateTotalData, uid: number) => {
    AxiosInstance.patch(`/savings/${uid}`, data)
}

export const PutSavingsAjax = (data:  {[key: string]: FormDataEntryValue}, uid: number) => {
    AxiosInstance.put(`/savings/add`, {...data, uid})
}

// @TODO: Extra check with password or token.
export const CheckAuth = ({uid}: CheckAuthData): Promise<AxiosResponse<boolean>> => {
    return AxiosInstance.post('/login')
}
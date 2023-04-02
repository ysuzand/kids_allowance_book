import axios, { AxiosResponse } from 'axios'

interface AddSavingsData {
    year: string;
    month: string;
    fashion: number;
    food: number;
    hobby: number;
    school: number;
    income: number;
}

interface UpdateTotalData {
    total: number;
}

interface CheckAuthData {
    uid: number;
}

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

export const UpdateTotalDB = (data: UpdateTotalData, uid: number) => {
    AxiosInstance.patch(`/savings/${uid}`, data)
}

export const AddSavings = (data: AddSavingsData, uid: number) => {
    AxiosInstance.put(`/savings/add`, {...data, uid})
}

// @TODO: Extra check with password or token.
export const CheckAuth = ({uid}: CheckAuthData): Promise<AxiosResponse<boolean>> => {
    return AxiosInstance.post('/login')
}
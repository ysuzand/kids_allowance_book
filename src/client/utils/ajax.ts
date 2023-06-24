import axios, { AxiosResponse } from 'axios'

type GetRecordResponse = AxiosResponse<{success: boolean; exist: boolean}>

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

export const GetExpenseRecordAjax = (yearmonth: string, uid: number): Promise<GetRecordResponse> => {
    return AxiosInstance.get(`/savings/${uid}/expenses/${yearmonth}`)
}

export const GetIncomeRecordAjax = (yearmonth: string, uid: number): Promise<GetRecordResponse> => {
    return AxiosInstance.get(`/savings/${uid}/income/${yearmonth}`)
}

export const AddExpenseAjax = (data: ExpenseInputData, uid: number, exist: boolean) => {
    const uri = `/savings/${uid}/expenses`
    const method = exist ? 'patch' : 'put'
    AxiosInstance[method](uri, {...data, uid, exist})
        .then(res => console.info(res))
        .catch(e => console.error(e))
}

export const AddIncomeAjax = (data: IncomeInputData, uid: number, exist: boolean) => {
    const uri = `/savings/${uid}/income`
    const method = exist ? 'patch' : 'put'
    AxiosInstance[method](uri, {...data, uid, exist})
        .then(res => console.info(res))
        .catch(e => console.error(e))
}

// @TODO: Extra check with password or token.
export const CheckAuth = ({uid, uuid}: CheckAuthData): Promise<AxiosResponse<UserInfo>> => {
    return AxiosInstance.post('/login')
}
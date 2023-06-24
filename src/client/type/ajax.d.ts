interface UpdateTotalData {
    total: number;
}

type IncomeInputData = FormValueReadyToSend<FormIncomeData>

type ExpenseInputData = FormValueReadyToSend<FormExpenseData>

interface CheckAuthData {
    uid: number;
    uuid: string;
}
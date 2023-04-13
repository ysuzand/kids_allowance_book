interface UpdateTotalData {
    total: number;
}

type IncomeInputData = Pick<FormIncomeData, 'income'> & {yearmonth: string}

type ExpenseInputData = FormExpenseData & {yearmonth: string}

interface CheckAuthData {
    uid: number;
}
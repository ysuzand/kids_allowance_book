interface UpdateTotalData {
    total: number;
}

type IncomeInputData = Pick<FormIncomeData, 'income'> & {yearmonth: string}

type ExpenseInputData = Omit<FormExpenseData, 'year'|'month'> & {yearmonth: string}

interface CheckAuthData {
    uid: number;
}
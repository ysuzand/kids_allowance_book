type FormValue = FormExpenseData | FormIncomeData
// { [key: string]: FormDataEntryValue} 


interface FormItem {
    component?: string;
    props?: InputProps | InputSelectProps | Attributes | undefined;
    content?: string;
}

interface FormItemAsMultiElement {
    components?: ComponentInArray[];
}

interface ComponentInArray {
    component: string;
    props:  InputProps | InputSelectProps | Attributes | undefined;
}

interface InputProps {
    type: HTMLInputTypeAttribute;
    id: string;
    icon?: string;
    color?: string;
    min?: string;
    max?: string;
    placeholder?: string;
    suffix?: string;
    value?: string | number;
    width?: 'sm' | 'md' | 'full';
    options?: {value: string; label: string;}[];
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

interface InputSelectProps {
    id: string;
    width: 'sm' | 'md' | 'full';
    options: {value: string; label: string;}[];
    defaultValue?: string | number;
}

interface SubmitButtonProps {
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}

type FormExpenseData = {
    year: string;
    month: string;
    fashion: number;
    food: number;
    hobby: number;
    school: number;
}

type FormIncomeData = {
    year: string;
    month: string;
    income: number;
    memo: string;
}

type FormValueReadyToSend = {
    yearmonth: string;
} & (FormExpenseData | FormIncomeData);
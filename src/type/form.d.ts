interface FormItem {
    component: string;
    props?: InputProps | Attributes | undefined;
    content?: string;
}

interface InputProps {
    type: HTMLInputTypeAttribute;
    id: string;
    icon?: string;
    value?: string | number;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}



interface 
interface FormItem {
    component: string;
    props?: InputProps | Attributes | undefined;
    content?: string;
}

interface InputProps {
    type: HTMLInputTypeAttribute;
    id: string;
    icon?: string;
    color?: string;
    value?: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}



interface 
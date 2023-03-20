
export const formMap: FormItem[] = [
    {
        component: 'p',
        content: 'hello'
    },
    {
        component: 'Input',
        props: {
            id: 'snacks',
            type: 'number',
            color: 'bg-fuchsia-500',
            icon: './assets/cupcake.svg'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'hobby',
            icon: './assets/cupcake.svg',
            color: 'bg-indigo-500',
            type: 'number',
        }
    },
    {
        component: 'Input',
        props: {
            id: 'school',
            type: 'number',
            color: 'bg-rose-500',
            icon: './assets/cupcake.svg'
        }
    }
]
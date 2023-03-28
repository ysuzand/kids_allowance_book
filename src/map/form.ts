
export const expenseFormMap: FormItem[] = [
    {
        component: 'Input',
        props: {
            id: 'food',
            type: 'number',
            color: 'bg-amber-500',
            icon: './assets/food.svg'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'hobby',
            icon: './assets/sports.svg',
            color: 'bg-lime-500',
            type: 'number',
        }
    },
    {
        component: 'Input',
        props: {
            id: 'fashion',
            type: 'number',
            color: 'bg-rose-500',
            icon: './assets/clothes.svg'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'school',
            type: 'number',
            color: 'bg-blue-500',
            icon: './assets/school.svg'
        }
    }
]

export const incomeFormMap: FormItem[] = [
    {
        component: 'Input',
        props: {
            id: 'income',
            type: 'number',
            color: 'bg-amber-500',
            icon: './assets/coins.svg'
        }
    }
]
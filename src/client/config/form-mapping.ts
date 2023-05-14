
export const expenseFormMap: (FormItem & FormItemAsMultiElement)[] = [
    {
        components: [
            {
                component: 'Select',
                props: {
                    id: 'year',
                    width: 'sm',
                    options: [
                        { value: '2022', label: '2022' },
                        { value: '2023', label: '2023' },
                    ],
                    defaultValue: new Date().getFullYear()
                }
            },
            {
                component: 'Select',
                props: {
                    id: 'month',
                    width: 'sm',
                    options: [
                        { value: '1', label: 'Jan'},
                        { value: '2', label: 'Feb'},
                        { value: '3', label: 'Mar'},
                        { value: '4', label: 'Apr'},
                        { value: '5', label: 'May'},
                        { value: '6', label: 'Jun'},
                        { value: '7', label: 'Jul'},
                        { value: '8', label: 'Aug'},
                        { value: '9', label: 'Sep'},
                        { value: '10', label: 'Oct'},
                        { value: '11', label: 'Nov'},
                        { value: '12', label: 'Dec'},
                    ],
                    defaultValue: new Date().getMonth() + 1
                }
            }
        ],
    },
    {
        component: 'hr',
        props: {}
    },
    {
        component: 'Input',
        props: {
            id: 'food',
            type: 'number',
            color: 'bg-amber-500',
            icon: '/assets/food.svg',
            width: 'full'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'hobby',
            icon: '/assets/sports.svg',
            color: 'bg-lime-500',
            type: 'number',
            width: 'full'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'fashion',
            type: 'number',
            color: 'bg-rose-500',
            icon: '/assets/clothes.svg',
            width: 'full'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'school',
            type: 'number',
            color: 'bg-blue-500',
            icon: '/assets/school.svg',
            width: 'full'
        }
    }
]

export const incomeFormMap: (FormItem & FormItemAsMultiElement)[] = [
    {
        components: [
            {
                component: 'Select',
                props: {
                    id: 'year',
                    width: 'sm',
                    options: [
                        { value: '2022', label: '2022' },
                        { value: '2023', label: '2023' },
                    ],
                    defaultValue: new Date().getFullYear()
                }
            },
            {
                component: 'Select',
                props: {
                    id: 'month',
                    width: 'sm',
                    options: [
                        { value: '1', label: 'Jan'},
                        { value: '2', label: 'Feb'},
                        { value: '3', label: 'Mar'},
                        { value: '4', label: 'Apr'},
                        { value: '5', label: 'May'},
                        { value: '6', label: 'Jun'},
                        { value: '7', label: 'Jul'},
                        { value: '8', label: 'Aug'},
                        { value: '9', label: 'Sep'},
                        { value: '10', label: 'Oct'},
                        { value: '11', label: 'Nov'},
                        { value: '12', label: 'Dec'},
                    ],
                    defaultValue: new Date().getMonth() + 1
                }
            }
        ],
    },
    {
        component: 'hr',
        props: {}
    },
    {
        component: 'Input',
        props: {
            id: 'income',
            type: 'number',
            color: 'bg-amber-500',
            icon: '/assets/coins.svg'
        }
    },
    {
        component: 'Input',
        props: {
            id: 'memo',
            type: 'text',
            color: 'bg-purple-400',
            placeholder: 'Memo',
            suffix: '',
            icon: '/assets/memo.svg'
        }
    }
]
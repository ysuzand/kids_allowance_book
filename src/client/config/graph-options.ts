const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                font: {
                    family: 'Sono, serif',
                    size: 18
                },
                color: 'black'
            }
        },
        
    },
    scales: {
        y: {
            ticks: {
                font: {
                    family: 'Sono, serif',
                    size: 16
                },
                color: 'black'
            }
        },
        x: {
            ticks: {
                font: {
                    family: 'Sono, serif',
                    size: 16,
                },
                color: 'black'
            }
        }
    }
}

const borderWidth = 4
const borderColor = 'black'

const data = {
  labels: ['JAN', 'FEB', 'MAR', 'APR'],
  datasets: [
    {
      type: 'line' as const,
      label: 'total',
      borderColor: 'rgb(249, 115, 22)',
      borderWidth,
    //   fill: false,
      data: [146, 202, 30, 40],
    },
    {
      type: 'bar' as const,
      label: 'food',
      backgroundColor: 'rgb(245, 158, 11)',
      data: [40, 30, 45, 31],
      borderColor,
      borderWidth,
    },
    {
      type: 'bar' as const,
      label: 'hobby',
      borderColor,
      borderWidth,
      backgroundColor: 'rgb(132, 204, 22)',
      data: [33, 12, 67, 32]
    },
    {
        type: 'bar' as const,
        label: 'fashion',
        borderColor,
        borderWidth,
        backgroundColor: 'rgb(244, 63, 94)',
        data: [33, 12, 67, 32]
    },
    {
        type: 'bar' as const,
        label: 'school',
        borderColor,
        borderWidth,
        backgroundColor: 'rgb(59, 130, 246)',
        data: [43, 76, 12, 50]
    },
  ],
};

export {
    options,
    data
}
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

const Chart = ({ chosenData, currentMonth }) => {
  const data = {
    labels: chosenData?.length > 0 && chosenData[0]?.data?.map((d) => d?.month),
    datasets: [
      {
        label: "User's Expenses",
        data:
          chosenData?.length > 0 && chosenData[0]?.data?.map((d) => d?.amount),
        backgroundColor:
          chosenData?.length > 0 &&
          chosenData[0]?.data?.map((d) =>
            d?.month === currentMonth ? '#0559FD' : '#F2F2F2'
          ),
      },
    ],
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <>
      <Bar
        data={data}
        options={options}
        className=' sm:max-w-[100%] sm:max-h-[400px] lg:max-w-[100%] lg:max-h-[400px]'
      />
    </>
  )
}

export default Chart

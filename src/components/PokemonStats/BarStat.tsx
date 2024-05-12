import React from 'react'

interface Props {
    percentage: number
}

const BarStat = ({ percentage }: Props) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full">
        <div
            className='h-full rounded-full bg-blue-500' 
            role="progressbar"
            style={{
                width: `${percentage}%`
            }}
        />
    </div>
  )
}

export default BarStat
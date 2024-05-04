"use client"

import CountUp from 'react-countup'

function AnimatedCounter({amount}:{amount: number}) {
  return (
      <div>
          <CountUp
              duration={0.5}
              decimals={2}
              decimal="."
              prefix='₹'
              end={amount} />
    </div>
  )
}

export default AnimatedCounter
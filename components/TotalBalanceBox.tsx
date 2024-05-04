import { formatAmount } from '@/lib/utils'
import React from 'react'
import CountUp from 'react-countup/build/CountUp'
import AnimatedCounter from './AnimatedCounter'

export const TotalBalanceBox = (
    {accounts = [], totalBanks, totalCurrentBalance}:TotalBalanceBoxProps
) => {
  return (
      <section className='total-balance'>
          <div className='total-balance-chart'>
              {/* Doghnut Chart */}
          </div>
          <div className="flex flex-col gap-6">
              <div className="header-2">
                  Bank Accounts: {totalBanks}
              </div>
              <div className="flex flex-col gap-2">
                  <p className="total-balance-label">
                      Total Current Balance
                  </p>
                  <p className="total-balance-amount flex-center gap-2">
                      <AnimatedCounter amount={totalCurrentBalance}/>
                      
                  </p>
              </div>
          </div>
    </section>
  )
}

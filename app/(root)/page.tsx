import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import React from 'react'

const Home = () => {
    const loggedIn = { firstName: 'Aakash', lastName: 'AR', email: 'aakash@mail.com'};
  return (
      <section className="home">
          <div className="home-content">
              <header className="home-header">
                  <HeaderBox
                      type="greeting"
                      title="Welcome"
                      user={loggedIn?.firstName || 'Guest'}
                      subtext="Access and manage your account and  transactions efficiently."
                  />
              </header>
              Recent Transactions
          </div>
          <RightSidebar
              user={loggedIn}
              transactions={[]}
              banks={[{ currentBalance: 1250}, {}]}
          />
    </section>
  )
}

export default Home
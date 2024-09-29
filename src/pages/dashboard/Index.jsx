import React, { useEffect, useState } from 'react'
import DashboardCard03 from './DashboardCard03'
import DashboardCard01 from './DashboardCard1'
import DashboardCard10 from './DashboardCard10'
// import DashboardCard1 from './DashboardCard133'
import Selecter from './Selecter'
import DashboardCard02 from './DashboardCard02'
import DashboardCard04 from './DashboardCard04'
import DashboardCard05 from './DashboardCard05'
import DashboardCard06 from './DashboardCard06'
import OtherApi from '../../apis/other.api'

function Index() {
 
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
                {/* <Selecter /> */}
                <DashboardCard01 />
                <DashboardCard02 />

                <DashboardCard03 />
                <DashboardCard04 />
                <DashboardCard05 />
                <DashboardCard06 />
                {/* <DashboardCard1 />
                <DashboardCard10 />
                <DashboardCard06 /> */}

            </div>
        </div>
    )
}

export default Index

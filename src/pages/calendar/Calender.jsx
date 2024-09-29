import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../utils/Utils.js";
import CalendarHeader from "../../calander-components/CalendarHeader";
import Sidebar from "../../calander-components/Sidebar";
import Month from "../../calander-components/Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "../../calander-components/EventModal";
function Calender() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}

            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex  flex-1">
                    {/* <Sidebar /> */}
                    <Month month={currenMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Calender;

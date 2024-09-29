import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext.jsx";
import { Box } from '@chakra-ui/react'
export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-400  min-w-42  flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => {
          return (
            <div key={idx}>
              <Box
                borderColor={evt.label}
                onClick={() => setSelectedEvent(evt)}
                className={`bg-${evt.label}-200 p-1 border-2 mx-1 h-20  text-gray-600  rounded mb-1 truncate`}
              >
                <div className="text-[#4d5e80] justify-between  text-center font-medium flex  items-center ">
                  <Box className={` w-14 h-6 text-white   rounded-md bg-${evt.label}-500 `}>11:22</Box>
                  <Box className={` w-14 h-6 text-white   rounded-md bg-${evt.label}-500 `}>11:00</Box>
                </div>
                <p className="text-[#4d5e80]  truncate mt-4 text-xm font-medium ">{evt.title}</p>
              </Box>

            </div>
          )
        })}
      </div>
    </div>
  );
}

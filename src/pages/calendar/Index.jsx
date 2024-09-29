import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import filterIcon from '../../Assets/icons/filterIcon.svg'
import searchIocn from '../../Assets/icons/searchIocn.svg'
import { Checkbox, InputGroup, InputRightElement, Input, VStack, Badge, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon, SmallAddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import DropdownFilter from '../../components/DropdownFilter';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserApi from "../../apis/user.api";
import { userTable } from "../../redux/redux-slice/tableData.slice";
import { useDispatch, useSelector } from "react-redux";
import Loading, { CardLoading } from "../../components/Loading";
import { FiUser } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Calender from "./Calender";

const Index = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Event Type');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);
    const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
    const [tableData, setTableData] = useState([]);
    const userApi = new UserApi();

    useEffect(() => {
        getAllUser();
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const getAllUser = async () => {
        if (tableData.length === 0) {
            setLoading(true);
            try {
                const getAllUserResponse = await userApi.getAllUser();
                if (getAllUserResponse.data.code === 200) {
                    dispatch(userTable(getAllUserResponse.data.data));
                    setLoading(false);
                } else {
                    toast.error(getAllUserResponse.data.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    }

    const handleFilterChange = (filter, isChecked) => {
        setSelectedStatusFilters(prevFilters => {
            if (isChecked) {
                return [...prevFilters, filter];
            } else {
                return prevFilters.filter(f => f !== filter);
            }
        });
    };

    const renderEventTypeContent = () => {
        return (
            <div className="w-full pb-2 grid grid-cols-12 gap-6 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
        );
    };

    const renderScheduleEventContent = () => {
        return (
            <div className="w-full pb-2 grid grid-cols-12 gap-6 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                <CardComponent2 />
                <CardComponent2 />
                <CardComponent2 />
                <CardComponent2 />
            </div>
        );
    };
    const CardComponent = () => {
        return (
            <div className="col-span-full flex flex-col border-[#e9a537] border-b-4 shadow-sm rounded-lg p-2  gap-4 md:col-span-6 h-80 bg-white xl:col-span-4 ">
                <h2 className=" text-xl font-inter lg:w-[90%]  text-black font-medium">Looking for the perfect blend of luxury but with a touch of rustic?</h2>
                <p className="flex text-[#e9a537]  gap-1 font-medium items-center"> <FiUser fontSize={20} />
                    ONE ON ONE
                </p>
                <p className=" text-sm font-inter lg:w-[80%]  text-black font-medium">Calendify always allows you to set the reminder to optimize task management roles and jobs.</p>
            </div>
        );
    };
    const CardComponent2 = () => {
        return (
            <div className="col-span-full flex flex-col border-[#e9a537] border-b-4 shadow-sm rounded-lg p-2  gap-2 md:col-span-6 h-80 bg-white xl:col-span-4 ">
                <p className="flex text-[#e9a537]  font-medium items-center">
                    April 5, 2024
                </p>
                <h2 className=" text-xl font-inter lg:w-[90%]  text-black font-medium">Looking for the perfect blend of luxury but with a touch of rustic?</h2>
                <p className="flex text-[#e9a537] gap-1  font-medium items-center"> <FiUser fontSize={20} />
                    ONE ON ONE
                </p>
                <p className=" text-sm font-inter lg:w-[90%]  text-black font-medium">Calendify always allows you to set the reminder to optimize task management roles and jobs.</p>
                <p className="flex text-[#e9a537]  text-xs gap-1  font-medium items-center"> <IoTimeOutline fontSize={20} />
                    10:00 AM - 1:00 PM
                </p>
                <p className="flex text-[#e9a537]  text-xs gap-1  font-medium items-center"> <CiLocationOn fontSize={20} />
                    4319 Wakefield Street, Philadelphia, PA 19126
                </p>
            </div>
        );
    };



    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            <div className="col-span-full xl:col-span-12  rounded-sm">
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-black px-2 mt-4 mb-4 font-bold">
                            Users
                        </h1>
                        <div className="px-2">
                            <h1 className="text-sm text-[#4d4d4d] px-2 mt-4 mb-4 font-medium">
                                <ArrowDownIcon />  Download
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center  overflow-x-auto justify-between gap-4">
                        <div className="flex items-center justify-center gap-1">
                            <button
                                type="button"
                                className={`w-32 h-10 pt-1 text-sm font-medium  focus:outline-none  rounded-full border border-gray-200  ${activeTab === 'Event Type' ? 'bg-[#e9a537] text-white' : 'text-black'}`}
                                onClick={() => handleTabClick('Event Type')}
                            >
                                Event Type
                            </button>
                            <button
                                type="button"
                                className={`w-32 h-10 pt-1 text-sm font-medium  focus:outline-none  rounded-full border border-gray-200  ${activeTab === 'Schedule Event' ? 'bg-[#e9a537] text-white' : 'text-black'}`}
                                onClick={() => handleTabClick('Schedule Event')}
                            >
                                Schedule Event
                            </button>
                            <button
                                type="button"
                                className={`w-32 h-10 pt-1 text-sm font-medium focus:outline-none  rounded-full border border-gray-200  ${activeTab === 'Calendar' ? 'bg-[#e9a537] text-white' : 'text-black'}`}
                                onClick={() => handleTabClick('Calendar')}
                            >
                                Calendar
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            {activeSearch && (
                                <InputGroup size='md'>
                                    <Input
                                        w={'full'}
                                        pr='1rem'
                                        autoFocus
                                        value={search}
                                        onBlur={() => setActiveSearch(false)}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Search'
                                        className="outline-none rounded-md focus:ring-transparent focus:outline-none"
                                    />
                                    <InputRightElement>
                                        <img className="cursor-pointer" src={searchIocn} alt="icon" />
                                    </InputRightElement>
                                </InputGroup>
                            )}
                            <img
                                onClick={() => setActiveSearch(!activeSearch)}
                                className={`cursor-pointer ${activeSearch ? "hidden" : "inline-block"}`}
                                src={searchIocn}
                                alt="icon"
                            />
                            <DropdownFilter onFilterChange={handleFilterChange} />
                            <button type="button"
                                className="w-40 h-10 pt-1 text-sm font-medium text-white focus:outline-none bg-[#e9a537] rounded-full border border-gray-200 hover:bg-[#e9a537]"
                                onClick={() => Navigate('/users/register')}>
                                Add Event <SmallAddIcon fontSize={24} textColor={'white'} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
                        {loading ?
                            <>
                                <div className="w-full pb-2 grid grid-cols-12 gap-6 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                                    <CardLoading hight="320px" />
                                    <CardLoading hight="320px" />
                                    <CardLoading hight="320px" />
                                    <CardLoading hight="320px" />
                                    <CardLoading hight="320px" />

                                </div>

                            </> : (
                                activeTab === 'Event Type' ? renderEventTypeContent() :
                                    activeTab === 'Schedule Event' ? renderScheduleEventContent() :
                                        activeTab === 'Calendar' ? renderCalendarContent() :
                                            null
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

const renderCalendarContent = () => {
    return (
        <div className=" md: lg:w-[1000px] xl:w-full ">
            <Calender />
        </div>
    );
};
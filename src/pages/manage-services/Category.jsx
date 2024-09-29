import { useState, useMemo, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import filterIcon from '../../Assets/icons/filterIcon.svg'
import searchIocn from '../../Assets/icons/searchIocn.svg'
import { Checkbox, InputGroup, InputRightElement, Input, Avatar, VStack, Badge, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon, SmallAddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import userImage from '../../Assets/Images/userImage.svg'
import DropdownFilter from "../../components/DropdownFilter";
import DropdownEditMenu from "../../components/DropdownEditMenu";
import ServicesApi from "../../apis/services.api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Index = () => {
    const Navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [tableData, setTableData] = useState([]);
    const [activeSearch, setActiveSearch] = useState(false)
    const [productList, setProductList] = useState(tableData);
    const [rowsLimit, setRowsLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [rangeSelecter, setRangeSelecter] = useState(false);
    const [selectedStatusFilters, setSelectedStatusFilters] = useState([]);
    const servicesnApi = new ServicesApi()

    const rangeSelecterAray = [10, 15, 25, 50, 75, 100]
    // Calculate the total number of pages
    const totalPage = Math.ceil(productList.length / rowsLimit);

    // Calculate the range of rows to display based on current page and rows limit
    const startIndex = currentPage * rowsLimit;
    const endIndex = Math.min(startIndex + rowsLimit, productList.length);
    const rowsToShow = productList.slice(startIndex, endIndex);

    // Function to handle pagination navigation
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage - 1));
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = tableData.slice(startIndex, endIndex);
        // setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    // Generate an array for pagination controls
    const customPagination = useMemo(() => {
        return Array.from({ length: totalPage }, (_, index) => index);
    }, [totalPage]);
    useEffect(() => {
        const filteredProducts = tableData.filter(product =>
            (product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.status.toString().includes(search)) &&
            (selectedStatusFilters.length === 0 || selectedStatusFilters.includes(product.status))
        );
        setProductList(filteredProducts);
    }, [search, selectedStatusFilters]);
    const handleFilterChange = (filter, isChecked) => {
        setSelectedStatusFilters(prevFilters => {
            if (isChecked) {
                return [...prevFilters, filter];
            } else {
                return prevFilters.filter(f => f !== filter);
            }
        });
    };
    const getAllService = async () => {
        try {
            const getAllServiceResponse = await servicesnApi.getAllService()
            if (getAllServiceResponse.data.code === 200) {
                setProductList(getAllServiceResponse.data.data)
                setTableData(getAllServiceResponse.data.data)
            } else {
                toast.error(getAllServiceResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }

    useEffect(() => {
        getAllService()
    }, [])
    const DeleteHandler = async (id) => {
        try {
            const getAllServiceResponse = await servicesnApi.deleteServiceById({
                serviceId: id
            })
            if (getAllServiceResponse.data.code === 200) {
                toast.success(getAllServiceResponse.data.message);
                getAllService()
            } else {
                toast.error(getAllServiceResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            <div className="col-span-full xl:col-span-12  bg-whit  rounded-sm">
                <div className="w-full  ">
                    <div className=" flex justify-between items-center ">
                        <h1 className=" text-xl text-black px-2 mt-4 mb-4 font-bold">
                            Services
                        </h1>
                        <div className="px-2">

                            <h1 className=" text-sm text-[#4d4d4d] px-2 mt-4 mb-4 font-medium">
                                <ArrowDownIcon />  Download
                            </h1>

                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <button type="button"
                            className=" w-40 h-10 pt-1  text-sm font-medium text-white focus:outline-none bg-[#e9a537] rounded-full border border-gray-200 hover:bg-[#e9a537] "
                            onClick={() => Navigate('/manage-services/services/register')}>
                            Add New <SmallAddIcon fontSize={24} textColor={'white'} />
                        </button>
                        <div className="flex items-center justify-center gap-1">
                            {activeSearch && (
                                <InputGroup size='md'>
                                    <Input
                                        w={'full'}
                                        pr='1rem'
                                        autoFocus
                                        value={search}
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
                        </div>
                    </div>
                    <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                        {productList.length === 0 ? (
                            <tr className="text-start  w-full    text-xs text-gray-500">! No results found.</tr>
                        ) : (
                            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter  ">
                                <thead className="rounded-lg text-base text-white font-semibold w-full">
                                    <tr className="bg-white border-b">
                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap">
                                            SN.
                                        </th>
                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400  sm:text-base font-bold whitespace-nowrap">
                                            <Checkbox size='lg' colorScheme='orange' />
                                        </th>
                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap">
                                            Image
                                        </th>
                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap">
                                            Name
                                        </th>

                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap">
                                            Price
                                        </th>
                                        <th className="flex items-center py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap gap-1">
                                            Status
                                        </th>
                                        <th className="py-2 px-3 text-[#343a40] dark:text-gray-400 sm:text-base font-bold whitespace-nowrap">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" ">
                                    {rowsToShow?.map((data, index) => (
                                        <tr
                                            className={"bg-white text-[#6c757d] font-medium  mb-1 border-b "}
                                            key={index}
                                        >
                                            <td
                                                className={` py-2 px-3 font-normal text-base `}
                                            >
                                                {data?.seqNumber}
                                            </td>
                                            <td
                                                className={` px-3 font-normal text-base `}
                                            >
                                                <Checkbox colorScheme='orange' />
                                            </td>
                                            <td
                                                className={` px-3 font-normal text-base `}
                                            >
                                                <Avatar src={data?.images[0]} />
                                            </td>
                                            <td
                                                className={`py-1 px-3 font-normal text-base `}
                                            >
                                                {data?.name}
                                            </td>

                                            <td
                                                className={`py-1 px-3 font-normal text-base `}
                                            >
                                                {data?.price}
                                            </td>

                                            <td
                                                className={`py-1 px-3 font-normal text-base `}
                                            >
                                                <Badge p={1} fontFamily={'Roboto'} textColor={'white'} px={2} rounded={'full'} bg={data.Status == "InProcess" ? "#dc3545" : data.Status == "Active" ? "rgba(6, 159, 71, 1)" : "rgba(233, 165, 55, 1)"}>
                                                    {data?.status}
                                                </Badge>

                                            </td>
                                            <td
                                                className={`py-1 px-3 font-normal text-base `}
                                            >
                                                <DropdownEditMenu align="right" className="relative inline-flex">
                                                    <li>
                                                        <Link to={`/services/register/?id=${data?.serviceId}`}>
                                                            <div className="font-medium text-sm text-slate-600  cursor-pointer flex py-1 px-3" to="#0">
                                                                Update
                                                            </div>
                                                        </Link>
                                                        <div className="font-medium text-sm  text-red-500 cursor-pointer flex py-1 px-3" to="#0"
                                                            onClick={() => DeleteHandler(data?.serviceId)}>
                                                            Delete
                                                        </div>
                                                    </li>
                                                </DropdownEditMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>)}
                    </div>
                    <div className="w-full pb-2  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">

                        <div className="text-lg">
                            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                            {currentPage == totalPage - 1
                                ? productList?.length
                                : (currentPage + 1) * rowsLimit}{" "}
                            of {productList?.length} entries
                        </div>

                        <div className="flex  relative gap-2">
                            {
                                rangeSelecter &&
                                <div className="h-[210px] cursor-pointer rounded-sm flex flex-col gap-3 text-center font-bold z-10 bg-white  shadow-2xl bottom-11 w-10 border  absolute">
                                    {rangeSelecterAray.map((item) => <div onClick={(e) => { setRowsLimit(item); setRangeSelecter(!rangeSelecter) }} key={item}>{item}</div>)}
                                </div>}
                            <div className="border rounded-lg pr-1">
                                <InputGroup onClick={() => setRangeSelecter(!rangeSelecter)}
                                >
                                    <Box
                                        w={14}
                                        fontSize={16}
                                        cursor={'pointer'}
                                        textAlign={'center'}
                                        mt={'5px'}

                                        onClick={() => setRangeSelecter(!rangeSelecter)}
                                    >
                                        {rowsLimit}
                                    </Box>
                                    <InputRightElement w={3} size="sm" mt={"-2px"}>
                                        <VStack gap={0}>
                                            <TriangleUpIcon fontSize={10} type="button" cursor={'pointer'}
                                            // onClick={() => setRowsLimit(rowsLimit + 1)}  
                                            />
                                            <TriangleDownIcon fontSize={10} cursor={'pointer'}
                                            // onClick={() => setRowsLimit(rowsLimit - 1)}
                                            />
                                        </VStack>
                                    </InputRightElement>
                                </InputGroup>
                            </div>
                            <ul
                                className="flex justify-center items-center gap-x-[10px] z-30"
                                role="navigation"
                                aria-label="Pagination"
                            >
                                <li
                                    className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                                        ? "bg-[#cccccc] dark:bg-slate-700 dark:hover:bg-slate-600/80   pointer-events-none"
                                        : " cursor-pointer"
                                        } `}
                                    onClick={previousPage}
                                >
                                    <IoMdArrowRoundBack />
                                </li>
                                {customPagination?.map((data, index) => (
                                    <li
                                        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px]   bg-[#FFFFFF] cursor-pointer ${currentPage == index
                                            ? "text-white bg-[#dc3545]  dark:bg-gray.900"
                                            : "border-[#E4E4EB] "
                                            }`}
                                        onClick={() => changePage(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border  ${currentPage == totalPage - 1
                                        ? "bg-[#cccccc] dark:bg-slate-700 dark:hover:bg-slate-600/80   pointer-events-none"
                                        : " cursor-pointer"
                                        }`}
                                    onClick={nextPage}
                                >
                                    <IoMdArrowRoundForward />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;

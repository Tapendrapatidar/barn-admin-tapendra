import { useState, useMemo, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import filterIcon from '../../Assets/icons/filterIcon.svg'
import searchIocn from '../../Assets/icons/searchIocn.svg'
import { Checkbox, InputGroup, InputRightElement, Text, Image, Heading, HStack, Stack, Card, CardBody, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon, SmallAddIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Horse_img5 from '../../Assets/Images/Horse_img5.png'
import { CiLocationOn } from "react-icons/ci";
import DropdownFilter from "../../components/DropdownFilter";
import DropdownEditMenu from "../../components/DropdownEditMenu";
import BarnApi from "../../apis/barn.api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CardLoading } from "../../components/Loading";

const Index = () => {
    const Navigate = useNavigate();
    const [cardData, setCardData] = useState([])
    const barnApi = new BarnApi()
    const [loading, setLoading] = useState(false)
    const getAllBarn = async () => {
        try {
            setLoading(true)
            const getAllBarnResponse = await barnApi.getAllBarn()
            if (getAllBarnResponse.data.code === 200) {
                setCardData(getAllBarnResponse.data.data)
                setLoading(false)
            } else {
                toast.error(getAllBarnResponse.data.message);
            }
        } catch (error) {
            toast.error("something went wrong");
        }
    }

    useEffect(() => {
        getAllBarn()
    }, [])
    const DeleteHandler = async (id) => {
        try {
            const getAllBarnResponse = await barnApi.deleteBarnById({
                barnId: id
            })
            if (getAllBarnResponse.data.code === 200) {
                toast.success(getAllBarnResponse.data.message);
                getAllBarn()
            } else {
                toast.error(getAllBarnResponse.data.message);
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
                            Barns
                        </h1>
                        <div className="px-2">

                            <h1 className=" text-sm text-[#4d4d4d] px-2 mt-4 mb-4 font-medium">
                                <ArrowDownIcon />  Download
                            </h1>

                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button type="button"
                                className=" w-40 h-10 pt-1  text-sm font-medium text-white focus:outline-none bg-[#e9a537] rounded-full border border-gray-200 hover:bg-[#e9a537] "
                                onClick={() => Navigate('/barns/register')}>
                                Add New <SmallAddIcon fontSize={24} textColor={'white'} />
                            </button>
                        </div>
                        <div className="flex gap-1">
                            <img className=" cursor-pointer" src={searchIocn} alt="icon" />
                            <DropdownFilter />
                        </div>
                    </div>
                    <div className="w-full pb-2 grid grid-cols-12 gap-6 overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">

                        {!loading ?
                            <>
                                {cardData.length != 0 ?
                                    (cardData && cardData?.map((item, index) => {
                                        const src = item?.images[0]
                                        return (
                                            <div key={index} className="col-span-full flex gap-2 md:col-span-6 xl:col-span-4 ">
                                                <Link key={index} to={`/barns?id=${item?.barnId}&status=${true}`}>
                                                    <Card boxShadow={'md'} border={'1px solid rgba(226, 232, 240, 1)'} maxW={'480px'} borderRadius={'10px'} overflow={'hidden'} pos={'relative'}>
                                                        <CardBody p={'0'}>
                                                            <Box pos={'absolute'} right={4} top={4}>
                                                                <DropdownEditMenu align="right" className="relative inline-flex">
                                                                    <li>
                                                                        <Link to={`/barns/register/?id=${item?.barnId}`}>
                                                                            <div className="font-medium text-sm text-slate-600  cursor-pointer flex py-1 px-3" to="#0">
                                                                                Update
                                                                            </div>
                                                                        </Link>
                                                                        <div className="font-medium text-sm  text-red-500 cursor-pointer flex py-1 px-3" to="#0"
                                                                            onClick={() => DeleteHandler(item?.barnId)}>
                                                                            Delete
                                                                        </div>

                                                                    </li>
                                                                </DropdownEditMenu>
                                                            </Box>
                                                            <Image maxH={'290px'} p={2} objectFit={'cover'} minH={80} w={'100%'} src={src} align={'Horse Image'} />
                                                            <Stack p={3} spacing='0'>
                                                                <HStack justifyContent={'space-between'}>
                                                                    <HStack>
                                                                        <CiLocationOn color="#FFBA4B" fontWeight={'900'} fontSize={'20'} />
                                                                        <Text textColor={'#718096'} noOfLines={1} fontSize={'12px'} fontWeight={'400'}>
                                                                            {item?.address?.address?.streetName}{item?.address?.address?.city}
                                                                        </Text>
                                                                    </HStack>
                                                                    <Text textColor={'#718096'} fontSize={'12px'} fontWeight={'400'}>
                                                                        {item?.date}
                                                                    </Text>
                                                                </HStack>
                                                                <Heading textColor={'#2A282F'} fontWeight={700} fontSize={'18px'}>
                                                                    {item?.name}
                                                                </Heading>
                                                                <Text textColor={'#718096'} fontSize={'14px'} fontWeight={'400'}>
                                                                    Share Hand initiates a thorough assessment to identify the most pressing needs within the communities.
                                                                </Text>
                                                                <Text textColor={'#2A282F'} fontWeight={'bold'} fontSize={'14px'}>
                                                                    By  : Aman Patel
                                                                </Text>
                                                                <Text textColor={'#FFBA4B'} fontSize={'24px'} fontWeight={'700'}>{item?.price}/-</Text>
                                                            </Stack>
                                                        </CardBody>
                                                    </Card>
                                                </Link>
                                            </div>

                                        )
                                    }))

                                    : <h3 className=" col-span-6 text-start flex  m-4 text-2xl text-gray-500">! No results found.</h3>
                                }
                            </>
                            : <>
                                <CardLoading />
                                <CardLoading />
                                <CardLoading />
                                <CardLoading />
                                <CardLoading />
                                <CardLoading />
                            </>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;


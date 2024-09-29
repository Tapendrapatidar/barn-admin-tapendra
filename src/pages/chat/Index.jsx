import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Flex,
  Button,
  Input,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  VStack,
  Avatar,
  Image,
  IconButton,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { TfiGallery } from "react-icons/tfi";

import { SearchIcon } from "@chakra-ui/icons";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import { AttachmentIcon } from "@chakra-ui/icons";
import { FaVideo } from "react-icons/fa";
import CallIcon from '../../Assets/icons/call.svg';
import VideoCallIcon from '../../Assets/icons/videoCall.svg';
import ImfoIcon from '../../Assets/icons/imfo.svg';
import { FaRegImages } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

import ChatBubble from "./chatBody/messageBubble";
import toast from "react-hot-toast";
import { BiFullscreen } from "react-icons/bi";

const baseURL = import.meta.env.VITE_LIVE_CHAT_SOCKET;
const Index = ({ }) => {

  const socket = useRef();
  const emojiPickerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [file1, setFile1] = useState([]);
  const [fileName1, setFileName1] = useState([]);
  const [fileName2, setFileName2] = useState([]);
  const [imageView, setImageView] = useState([]);
  const [checkFile, setCheckFile] = useState("image");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emoji, setEmoji] = useState(false);

  //for date formate
  let displayedDate = null;
  const [inputMessage, setInputMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    console.log("send message")
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  function handleCancel(indexToRemove) {
    const filteredFiles = imageView.filter(
      (file, index) => index !== indexToRemove
    );
    const fileListArray = Array.from(file1); // Convert FileList to array
    const filteredArray = fileListArray.filter(
      (file, index) => index !== indexToRemove
    );
    const dataTransfer = new DataTransfer();
    filteredArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    setFile1(dataTransfer.files);
    setImageView(filteredFiles);
  }
  function handleChange1(event) {
    //image
    if (event.target.files.length < 7) {
      setFile1(event.target.files);
      setFileName1(event.target.value);
      const files = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageView(files);
      setCheckFile("Image");
    } else {
      toast.error(`Max selects images 6`);
    }
  }
  function handleChange2(event) {
    //video
    if (event.target.files.length < 7) {
      setFile1(event.target.files);
      setFileName2(event.target.value);
      const files = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageView(files);
      setCheckFile("Videos");
    } else {
      toast.error("Max selects images 6");
    }
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };




  return (
    <>
      <div className=" pt-4 px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
        <Flex
          direction="row"
          height={{ base: "90vh", md: "85vh" }}
          maxW={"full"}
          boxShadow={'md'}
          bg={'white'}
          borderTop={'1px solid rgba(219, 219, 219, 1)'}
          rounded={'xl'}
        >
          <Flex flexDir={'column'} w={'30%'} borderRight={'1px solid rgba(219, 219, 219, 1)'} h={'100%'}>
            <Box h={'10%'} borderBottom={'1px solid rgba(219, 219, 219, 1)'} w={'full'} >
              <Text fontWeight={'600'} mt={4} textAlign={'center'} fontSize={'20'} textColor={'#262626'}>upvox_</Text>
            </Box>
            <Box h={'90%'} display={'flex'} flexDir={'column'} gap={'1px'} overflowY={'auto'}>
              <HStack p={2} mt={1} bg={'#efefef'}>
                <Avatar size={'md'}></Avatar>
                <span className={`text-sm font-medium ml-3  duration-200 `}>
                  Chirag Singla
                </span>
              </HStack>

              <HStack p={2} mt={1} bg={'#efefef'}>
                <Avatar size={'md'}></Avatar>
                <span className={`text-sm font-medium ml-3  duration-200 `}>
                  Chirag Singla
                </span>
              </HStack>

              <HStack p={2} mt={1} bg={'#efefef'}>
                <Avatar size={'md'}></Avatar>
                <span className={`text-sm font-medium ml-3  duration-200 `}>
                  Chirag Singla
                </span>
              </HStack>

            </Box>

          </Flex>

          <Flex w={'70%'} h={'100%'} flexDir={'column'}>
            <HStack pos={'relative'} borderBottom={'1px solid rgba(219, 219, 219, 1)'} justifyContent={'space-between'} px={2} h={'10%'} w={'100%'} >
              <HStack p={2} >
                <Avatar size={'sm'}></Avatar>
                <Box>
                  <Text fontWeight={'600'} fontSize={'16px '} textColor={'rgba(38, 38, 38, 1)'} fontFamily={'Roboto'} textAlign={'start'} >Chirag Singla</Text>
                  <Text fontWeight={'400'} fontSize={'12px '} fontFamily={'Roboto'} textColor={'rgba(142, 142, 142, 1)'} textAlign={'start'} >Active 2h ago</Text>
                </Box>
              </HStack>
              <HStack>
                <Image cursor={'pointer'} src={ImfoIcon} alt={'imfo icon'} />
                {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                  Open
                </Button> */}
                <DrawerExample btnRef={btnRef} onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
              </HStack>
            </HStack>
            <Flex
              direction="column"
              flex="1"
              overflowY="auto"
              ref={divRef}
              bgSize="contain"
              style={{
                width: "100%",
                height: "160px",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {messages.map((msg, index) => {
                const shouldDisplayDate =
                  !displayedDate ||
                  displayedDate !== formatDate(new Date(msg.createdAt));
                if (shouldDisplayDate) {
                  displayedDate = formatDate(new Date(msg.createdAt));
                }
                return (
                  <ChatBubble
                    key={index}
                    message={'asdf'}
                    sender={'asdfs'}
                    time={msg.createdAt}
                    media={''}
                    // isSender={msg.senderId === userId ? true : false}
                    displayDate={'sdf'}
                  />
                );
              })}
            </Flex>
            <Flex direction="row" overflow={"auto"} scrollBehavior={"smooth"}>
              {checkFile == "Image"
                ? imageView.map((src, index) => (
                  <>
                    <Img
                      key={index}
                      src={src}
                      alt={`Video ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        padding: "10px",
                      }}
                    />
                    <button
                      onClick={() => handleCancel(index)}
                      style={{
                        position: "relative",
                        top: -26,
                        right: 33,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <AiOutlineCloseCircle
                        style={{ color: "red", fontSize: 24 }}
                      />
                    </button>
                  </>
                ))
                : imageView.map((src, index) => (
                  <>
                    <video
                      key={index}
                      src={src}
                      alt={`Video ${index + 1}`}
                      autoPlay={true}
                      loop={true}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        padding: "10px",
                      }}
                    />
                    <button
                      onClick={() => handleCancel(index)}
                      style={{
                        position: "relative",
                        top: -26,
                        right: 33,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <AiOutlineCloseCircle
                        style={{ color: "red", fontSize: 24 }}
                      />
                    </button>
                  </>
                ))}
            </Flex>
            {emoji ? (
              <EmojiPicker
                height={350}
                width={BiFullscreen}
                searchDisabled={"false"}
                suggestedEmojisMode={"recent"}
                emojiStyle={"google"}
                onEmojiClick={(emojiObject) => {
                  const { emoji } = emojiObject;
                  setInputMessage((prevValue) => prevValue + emoji);
                  // setChosenEmoji(emojiObject.emoji);
                }}
              // zIndex="2"
              />
            ) : null}
            <Flex
              display={{ base: "flex", md: "flex" }}
              justify={'center'}
              alignItems="center"
              mb={10}
            >
              <InputGroup>
                <InputLeftElement mx={2}>
                  <GrEmoji
                    // colorScheme="green"
                    name="Emoji"
                    // color="green"
                    size={"30px"}
                    onClick={() => {
                      emoji ? setEmoji(false) : setEmoji(true);
                    }}
                  />
                </InputLeftElement>
                <Input
                  pr={20}
                  placeholder="Type your message"
                  value={inputMessage}
                  autoFocus
                  borderRadius={'full'}
                  border={"1px solid rgba(219, 219, 219, 1)"}
                  borderColor={"rgba(219, 219, 219, 1)"}
                  focusBorderColor="1px solid  black"
                  _hover={{
                    borderColor: "black !important",
                  }}
                  mx={2}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      setEmoji(false);
                      handleSendMessage();
                    }
                  }}
                />
                <InputRightElement mr={10}  >
                  <Menu colorScheme="black">
                    <MenuButton
                      // mx={{ base: 0, sm: 2 }}
                      bg={'transparent'}
                      // color={'transparent'}
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: 'transparent' }}
                      // my={{ base: 2, md: 0 }}
                      cursor={"pointer"}
                      as={Button}
                      pl={2}
                      rightIcon={<TfiGallery />}
                    ></MenuButton>
                    {/* <MenuList colorScheme="black">
                  <MenuItem >
                    <Button
                      bg={'black'}
                      color={'white'}
                      _hover={{ bg: 'black' }}
                      _active={{ bg: 'black' }}
                      mx={{ base: 0, sm: 2 }}
                      my={{ base: 2, md: 0 }}
                      cursor={"pointer"}
                      width={"full"}
                    >
                      <input
                        accept="video/*"
                        id="video-upload"
                        type="file"
                        style={{ display: "none", width: "Full", height: "auto" }}
                        multiple
                        onChange={handleChange2}
                        value={fileName2}
                        htmlFor="video-upload"
                      />
                      <label htmlFor="video-upload">
                        <HStack colorScheme="green">
                          <FaVideo cursor={"pointer"} />
                          <Text>Videos select here</Text>
                        </HStack>
                      </label>
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button // Images
                      bg={'black'}
                      color={'white'}
                      _hover={{ bg: 'black' }}
                      _active={{ bg: 'black' }}
                      mx={{ base: 0, sm: 2 }}
                      my={{ base: 2, md: 0 }}
                      cursor={"pointer"}
                      width={"full"}
                    >
                      <input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        style={{ display: "none" }}
                        multiple
                        width={"full"}
                        onChange={handleChange1}
                        value={fileName1}
                      />
                      <label htmlFor="image-upload">
                        <HStack>
                          <FaRegImages cursor={"pointer"} />
                          <Text>Images select here</Text>
                        </HStack>
                      </label>
                    </Button>
                  </MenuItem>
                </MenuList> */}
                  </Menu>
                  <Text
                    cursor={'pointer'}
                    fontSize={'24px'}
                    // color={'#006C1E'}
                    // ml={{ base: 2, md: 2 }}
                    my={{ base: 2, md: 0 }}
                    onClick={() => {
                      handleSendMessage();
                      setEmoji(false);
                    }}
                    textSize="large"
                  >
                    <IoIosSend />
                  </Text>

                </InputRightElement>
              </InputGroup>
              {/* <Button
          colorScheme="green"
          ml={{ base: 2, md: 2 }}
          my={{ base: 2, md: 0 }}
          onClick={() => {
            handleSendMessage();
            setEmoji(false);
          }}
        >
          <IoIosSend />
        </Button> */}

            </Flex>
          </Flex>
        </Flex>

      </div>
    </>


  );
};

export default Index
function DrawerExample({ isOpen, onOpen, onClose, btnRef }) {


  return (
    <>

      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        finalFocusRef={btnRef}
        position='absolute'
      >
        <DrawerOverlay />
        <DrawerContent w={20} top={30} pos={'absolute'}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
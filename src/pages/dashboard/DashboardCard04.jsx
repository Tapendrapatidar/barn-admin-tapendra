import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../../components/DropdownEditMenu';
import LineChart01 from '../../charts/LineChart01';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { Progress, Badge, Box, HStack, Text, Flex } from '@chakra-ui/react'
import foodImage from '../../Assets/Images/foodImage.png'


function DashboardCard04() {
  const [progress, setProgress] = useState(80);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 1));
  //   }, 90);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <Box border={'1px solid rgba(239, 240, 246, 1)'} className=" p-2  col-span-full sm:col-span-6 bg-white  shadow-sm rounded-2xl">
      <Text textColor={'rgba(0, 0, 0, 0.5)'} fontSize={'13px'}>Strongest Topics</Text>
      <div className="px-5  py-4 flex flex-col gap-5 pt-5">
        <CustomProgressBar src={foodImage} name={'Food Safety'} progress={progress} />
        <CustomProgressBar src={foodImage} name={'Compliance Basics Procedures '} progress={30} />
        <CustomProgressBar src={foodImage} name={'Company Networking'} progress={90} />

      </div>
    </Box>
  );
}

export default DashboardCard04;

const CustomProgressBar = ({ progress, name, src }) => {

  return (
    <HStack>
      <Box >
        <img className=' w-20' src={src} alt='image' />
      </Box>
      <Box w={'100%'}>
        <Box pb={2} fontSize={'14px'} textColor={'rgba(0, 0, 0, 1)'} fontWeight={'600'} mb={-2} >
          {name}
        </Box>
        <HStack w={'100%'} gap={2} justify={'space-between'} >
          <Box className=' !w-[90%]'>
            <Progress
              value={progress}
              className=' !bg-[#c9ffe8]'
              colorScheme="2fea9b"
              size="md"
              borderRadius="md"
            // marginTop="20px"
            />
          </Box>
          <HStack >
            <Text fontSize={'13px'} fontWeight={'600'} textColor={'rgba(0, 0, 0, 0.7)'}>
              {progress}%
            </Text>
            <Text fontSize={'13px'} fontWeight={'600'} textColor={'rgba(0, 0, 0, 0.3)'} as='span'>Correct</Text>
          </HStack>
        </HStack>
      </Box>
    </HStack>
  );
};
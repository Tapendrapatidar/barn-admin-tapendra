import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../../components/DropdownEditMenu';
import LineChart01 from '../../charts/LineChart01';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { Progress, Badge, Box, HStack, Text, Flex, Avatar } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import foodImage from '../../Assets/Images/foodImage.png'


function DashboardCard06() {
  const [progress, setProgress] = useState(80);

  return (
    <Box border={'1px solid rgba(239, 240, 246, 1)'} height={'300px'} overflow={'auto'} className=" p-2 scrollbarhidden  col-span-full sm:col-span-6 bg-white  shadow-sm rounded-2xl">
      <Text textColor={'rgba(0, 0, 0, 0.5)'} fontSize={'13px'}>User Leaderboard</Text>
      <div className="px-5   py-4 flex flex-col gap-5 pt-5">
        <UserData src={foodImage} number={1} name={'Jesse Thomas'} status={true} progress={progress} >
          637 Points - 98% Correct
        </UserData>
        <UserData src={foodImage} number={1} name={'Jesse Thomas'} status={true} progress={progress} >
          637 Points - 98% Correct
        </UserData>
        <UserData src={foodImage} number={1} name={'Jesse Thomas'} status={true} progress={progress} >
          637 Points - 98% Correct
        </UserData>
        <UserData src={foodImage} number={2} name={'Jesse Thomas'} status={false} progress={progress} >
          637 Points - 98% Correct
        </UserData>
        <UserData src={foodImage} number={2} name={'Jesse Thomas'} status={false} progress={progress} >
          637 Points - 98% Correct
        </UserData>
        <UserData src={foodImage} number={2} name={'Jesse Thomas'} status={false} progress={progress} >
          637 Points - 98% Correct
        </UserData>
      </div>
    </Box>
  );
}

export default DashboardCard06;

const UserData = ({ number, name, src, children, status = false }) => {

  return (
    <HStack justifyContent={'space-between'}>
      <HStack>
        <Avatar className=' w-20 h-20 rounded-full' src={src} alt='image' />
        <Box>
          <Text pb={2} fontSize={'14px'} textColor={'rgba(0, 0, 0, 1)'} fontWeight={'600'} mb={-2} >
            {name}
          </Text>
          <Text pb={2} fontSize={'12px'} textColor={'rgba(0, 0, 0, 0.5)'} fontWeight={'500'} mb={-2} >
            {children}
          </Text>
        </Box>
      </HStack>
      <Box fontSize={'16px'} textColor={'rgba(21, 30, 35, 1)'} fontWeight={'bold'}>
        {number} <Text as={'span'}>
          {status ?
            <TriangleUpIcon textColor={"rgba(31, 224, 143, 1)"} />
            : <TriangleDownIcon textColor={"rgba(255, 62, 19, 1)"} />}
        </Text>
      </Box>

    </HStack>
  );
};
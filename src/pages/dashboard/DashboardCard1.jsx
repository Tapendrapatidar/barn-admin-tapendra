import React, { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { TbListNumbers } from "react-icons/tb";
import { GoShareAndroid } from "react-icons/go";
import EditMenu from '../../components/DropdownEditMenu';
import LineChart01 from '../../charts/LineChart01';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import { Text } from '@chakra-ui/react'
import OtherApi from '../../apis/other.api';
import { CardLoading, DashboardCardLoading } from '../../components/Loading';

function DashboardCard1() {
  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      '12-01-2021', '01-01-2022', '02-01-2022',
      '03-01-2022', '04-01-2022', '05-01-2022',
      '06-01-2022', '07-01-2022', '08-01-2022',
      '09-01-2022', '10-01-2022', '11-01-2022',
      '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
          540, 466, 540, 466, 385, 432, 334,
          334, 289, 289, 200, 289, 222, 289,
          289, 403, 554, 304, 289, 270, 134,
          270, 829, 344, 388, 364,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line

    ],
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  const otherApi = new OtherApi()
  const getdashboard = async (id) => {
    setLoading(true)
    try {
      const getdashboardResponse = await otherApi.getdashboard()
      if (getdashboardResponse.data.code === 200) {
        setData(getdashboardResponse.data.data);
      } else {
        toast.error(getdashboardResponse.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getdashboard()
  }, [])
  console.log(data);

  return (
    <div className="col-span-full  gap-4 xl:col-span-6 ">
      <div className="flex flex-wrap  gap-1">
        <Card loading={loading} Tittle={'Active Users'} Numbers={data?.totalActiveUsers} />
        <Card loading={loading} Tittle={'Total  Admin'} Numbers={data?.totalAdmins} />
        <Card loading={loading} Tittle={'Total Barn'} Numbers={data?.totalBarns} />
        <Card loading={loading} Tittle={'Total Services'} Numbers={data?.totalServices} />
        <Card loading={loading} Tittle={'Total Product'} Numbers={data?.totalProducts} />
        <Card loading={loading} Tittle={'Today Sales '} Numbers={data?.todaysProductSold} />
      </div>
    </div>


  );
}

export default DashboardCard1;

const Card = ({ Tittle, Numbers, chartData = false, loading }) => {
  return (
    <>
      {
        loading ? <>
          <DashboardCardLoading /></> :
          <div className=' shadow-sm flex-1 p-4   rounded-xl bg-white  h-[150px] border min-w-[150px] max-w-full'>
            <Text fontSize={'14px'} fontWeight={500} textColor={'rgba(0, 0, 0, 0.7)'}>
              {Tittle}
            </Text>
            <h3 className=' text-black pt-2  text-start  font-bold text-2xl'>{Numbers}</h3>
            <div className=' h-20  pb-4 p-0  '>
              {
                chartData ?
                  <LineChart01 data={chartData} width={309} height={100} /> : ""
              }
            </div>

          </div>
      }
    </>
  )
}

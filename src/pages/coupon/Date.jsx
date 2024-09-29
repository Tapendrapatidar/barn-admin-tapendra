import React, { useState } from "react";
import "../../../node_modules/antd/dist/reset.css";
import { DatePicker, Form } from "antd";

export const DatePickerComopnent = () => {
    const [dateRange, setDateRange] = useState([]);
    console.log(dateRange);
    return (
        // <Form.Item className=" text-black font-medium" label="Start Date - End Date" colon={false}>
        <DatePicker.RangePicker
            format="MMM Do, YYYY"
            value={dateRange}
            className=" h-10 border-2 border-[#cbd5e1]"
            separator={"-"}
            onChange={x => {
                setDateRange(x);
            }}
            allowClear={true}

        />
        // </Form.Item>
    );
};


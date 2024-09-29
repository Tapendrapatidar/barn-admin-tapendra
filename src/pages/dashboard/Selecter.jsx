import React from 'react'
import { Select, Box } from '@chakra-ui/react'
function Selecter() {
    return (
        <div className="col-span-full flex gap-4 xl:col-span-12 ">
           

            <select
                className="custom-select"
                placeholder="Timeframe:"
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <select
                className="custom-select"
                placeholder="Timeframe:"
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <select
                className="custom-select"
                placeholder="Timeframe:"
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

        </div>
    )
}

export default Selecter
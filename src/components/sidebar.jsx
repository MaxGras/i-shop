import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSortingState } from '../features/smartphones/phoneSlice';
export function SideBar() {
    const dispatch = useDispatch();
    const [val,setVal] = useState("default");


const handleSort = (e)=>{
    setVal(e.target.value);
    dispatch(
        addSortingState(e.target.value)
    )
}
    const answer = "Sorting ascending";

    return (
        <aside className="w-[15%] bg-gray-300 rounded-xl flex flex-col p-[1%] h-100%">
            <h2 className="self-center">Filters:</h2>

            <FormControl className='h-full mt-[3%] px-[4%] flex flex-col'>
                <FormLabel id="demo-radio-buttons-group-label">{answer}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="default"
                    value={val}
                    name="radio-buttons-group"
                    onChange={handleSort}
                >
                    <FormControlLabel value="default" control={<Radio />} label="None" />
                    <FormControlLabel value="count" control={<Radio />} label="Count" />
                    <FormControlLabel value="weight" control={<Radio />} label="Weight" />
                    <FormControlLabel value="name" control={<Radio />} label="Alpabet" />

                </RadioGroup>

            </FormControl>

        </aside>
    );
}
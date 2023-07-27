import { useParams } from "react-router-dom";
import { selectPhoneById } from "./phoneSlice";

import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { editOne } from "./phoneSlice";
import { useDispatch } from "react-redux";
export function PhoneEditComponent() {
    const idSelected = useParams().id;
    const selectedPhone = useSelector((state) => selectPhoneById(state, idSelected));
    const dispatch = useDispatch();


    const [open, setOpen] = useState(true);
    const [newInfo, setNewInfo] = useState({
        id: '',
        name: '',
        imageUrl: '',
        count: '',
        size: {
            width: '',
            height: ''
        },
        weight: ''
    }
    );


    if (!selectedPhone) {

        return (
            <div>

            </div>
        )
    }
    const handleEdit = () => {
        dispatch(
            editOne(newInfo)

        )

    }
    function handleClose() {
        setOpen(false);
        setNewInfo(selectedPhone);

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "width" || name === "height") {
            setNewInfo((prevInfo) => ({
                ...prevInfo,
                size: {
                    ...prevInfo.size,
                    [name]: Number(value)
                }
            }));
        }
       else if(name==="count"){
        setNewInfo((prevInfo)=>({
            ...prevInfo,
            [name]: Number(value)
        }))
       }
        else {
            setNewInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value

            }));
        }
    };

    return (

        <div className="flex h-[92vh] p-[2%]">
            <Modal open={open} onClose={handleClose}>
                <Box className="bg-gray-800/95 w-1/4 h-1/4 mx-auto my-64 flex flex-col justify-evenly items-center text-white text-lg">
                    <h6>Wait please</h6>
                    <Button variant='contained' onClick={() => { handleClose() }}>Ok</Button>
                </Box>
            </Modal>
            <div className="w-[70%] bg-gray-100 mr-[5%] rounded-xl p-[2%] flex flex-col">
                <p>Name:</p>
                <input type="text" name="name" value={newInfo.name} onChange={handleChange} className="w-full" />
                <p>Image URL:</p>
                <input type="text" name="imageUrl" value={newInfo.imageUrl} onChange={handleChange} className="w-full" />
                <p>Count:</p>
                <input type="number" name="count" value={newInfo.count} onChange={handleChange} className="w-full" />
                <p>Weight:</p>
                <input type="text" name="weight" value={newInfo.weight} onChange={handleChange} className="w-full" />
                <p>Width:</p>
                <input type="number" name="width" value={newInfo.size.width} onChange={handleChange} className="w-full" />
                <p>Height:</p>
                <input type="number" name="height" value={newInfo.size.height} onChange={handleChange} className="w-full" />
                <div className="flex flex-1 flex-col justify-evenly">
                    <Button variant="contained" className="w-full h-[25%]" onClick={handleEdit} >Save</Button>
                </div>


            </div>

            <div className="bg-gray-200 w-[30%] rounded-xl flex flex-col items-center ">
                <h5 className="text-2xl mb-[5%]">Your card now</h5>
                <img src={selectedPhone.imageUrl} alt="Phone" className="w-8/12 self-center rounded-3xl" />
                <h5 className="my-[10%]">Name: {selectedPhone.name}</h5>
                <div className=" grid grid-cols-2 gap-x-20">
                    <p>Count: {selectedPhone.count}</p>
                    <p>Width: {selectedPhone.size.width}</p>
                    <p>Weight: {selectedPhone.weight}</p>
                    <p>Height: {selectedPhone.size.height}</p>
                </div>

            </div>
        </div>
    )



}
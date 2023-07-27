
import { useState } from "react"
import { Box, Button, Modal, TextField } from "@mui/material"

import { addOne, } from "./phoneSlice"
import { useDispatch } from "react-redux"
import LinkButton from "../../components/linkButton";

const { customAlphabet } = require('nanoid');
export function PhoneAddingComponent() {


    const numbers = '0123456789';
    const generateOnlyNumbers = customAlphabet(numbers, 10);
    const [open, setOpen] = useState(false);
    const [newInfo, setNewInfo] = useState({
        id: generateOnlyNumbers(),
        name: "",
        imageUrl: "",
        count: 0,
        size: {
            width: 0,
            height: 0
        },
        weight: "",
        comments: [{ commentId: undefined }]
    })
    const dispatch = useDispatch();
    const handleAddingNewPhone = () => {
        dispatch(
            addOne(newInfo)
        )
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
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
        else if (name === "count") {
            setNewInfo((prevInfo) => ({
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
        <div className="w-full h-[92vh] flex items-center justify-center flex">

            <div className="w-[35%] h-[90%] bg-gray-300 rounded-xl  p-[2%] flex flex-col justify-evenly">

                {newInfo.imageUrl === "" ? <p className="self-center pt-[10%] h-[25%]">Place a correct URL to the field and you will see demo</p> : <img src={newInfo.imageUrl} alt="uncorrect URL" className="self-center h-[25%]" />}

                <TextField id="outlined-basic" label="Name of Phone" variant="outlined" value={newInfo.name} name="name" onChange={handleChange} />
                <TextField id="outlined-basic" label="Image URL of Phone" variant="outlined" value={newInfo.imageUrl} name="imageUrl" onChange={handleChange} />
                <TextField id="outlined-basic" label="Counts of Phones" type="number" variant="outlined" value={newInfo.count} name="count" onChange={handleChange} />
                <TextField id="outlined-basic" label="Weight of Phone" variant="outlined" value={newInfo.weight} name="weight" onChange={handleChange} />
                <TextField id="outlined-basic" label="Width" type="number" variant="outlined" value={newInfo.size.width} name="width" onChange={handleChange} />
                <TextField id="outlined-basic" label="Height" type="number" variant="outlined" value={newInfo.size.height} name="height" onChange={handleChange} />
                <Button variant="contained" className="h-[8%]" onClick={handleAddingNewPhone} >SAVE</Button>
                <Modal open={open} onClose={handleClose} className="flex justify-center items-center">
                    <Box className={"bg-gray-800/95 w-1/4 h-1/4 flex flex-col justify-evenly items-center "}>
                        <h5 className="text-lg text-white">Phone was added!</h5>
                        <LinkButton to={"/"}> OK </LinkButton>
                    </Box>
                </Modal>


            </div>

        </div>
    )



}
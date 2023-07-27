import { useDispatch, useSelector } from "react-redux";
import { selectPhoneById } from "./phoneSlice";
import { useParams } from "react-router-dom";
import { addOneCM } from "../comments/commentSlice";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { CommentCard } from "../comments/commentCard";
import { ModalWrapper } from "../../components/modalWindow";
import { selectCommentIds } from "../comments/commentSlice";
import TextField from '@mui/material/TextField';
const { customAlphabet } = require('nanoid');
export function SinglePhonePage() {

    const idSelected = useParams().id;
    const dispatch = useDispatch();
    const numbers = '0123456789';
    const generateOnlyNumbers = customAlphabet(numbers, 10);
    const [commentValue,newCommentValue]=useState({
        id:0,
        productId: idSelected,
        description: '',
        date: ''
    })
    function handleAddComment(){
        dispatch(
            addOneCM(
                commentValue
            )
        )
        handleCloseAddComment()
    }
    function newDateNow() {
        
        const now = new Date();
      
       
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
      
        
        const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`;

        return formattedDate;
      }
    const handleCommentChange = (e)=>{
        newCommentValue({
            ...commentValue,
            id: generateOnlyNumbers(),
            description: e.target.value,
            date: newDateNow()
        })
    }
    const [openAddComment, setOpenAddCommet] = useState(false);
    const handleOpenAddComment= ()=>{
        setOpenAddCommet(true)
    }
    const handleCloseAddComment = ()=>{
        setOpenAddCommet(false);
    }
    const commentIdArr = useSelector(selectCommentIds);

    const commentCards = commentIdArr.map(a => {
        return <CommentCard key={a} idCM={a} idPH={idSelected} />;
    })

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    function handleOpen(type) {
        setModalType(type);
        setOpen(true);

    }
    const handleClose = () => setOpen(false);
    const selectedPhone = useSelector((state) => selectPhoneById(state, idSelected));

    if (!selectedPhone) {
        return (
            <div>

            </div>
        )
    }
    
    return (
        <div className="flex p-[2%] h-[92vh]">
            <div className="flex flex-col bg-gray-200 rounded-xl w-[65%] h-[100%] p-[2%] justify-between ">
                <img className="w-4/12 self-center rounded-3xl " src={selectedPhone.imageUrl} alt="Phone:)" />
                <h5>Name: {selectedPhone.name}</h5>
                <div className=" grid grid-cols-2 gap-x-20">
                    <p>Count: {selectedPhone.count}</p>
                    <p>Width: {selectedPhone.size.width}</p>
                    <p>Weight: {selectedPhone.weight}</p>
                    <p>Height: {selectedPhone.size.height}</p>
                </div>
                <div className="flex w-full justify-evenly ">
                    <Button variant='contained' onClick={() => handleOpen(true)}>Edit</Button>
                    <ModalWrapper state={open} handleClose={handleClose} param={modalType} id={idSelected}></ModalWrapper>
                    <Button variant='contained' onClick={() => handleOpen(false)}>Delete</Button>
                </div>
            </div>
            <div className="bg-gray-200 rounded-xl h-full w-[35%] ml-[2%] flex flex-col p-[2%] justify-between">
                <div className="h-full flex flex-col">
                {commentCards}
                </div>
                <Button variant="contained" onClick={handleOpenAddComment} >Add Comment</Button>
                <Modal
                open={openAddComment}
                onClose={handleCloseAddComment}
                className="flex justify-center items-center"
                >
                    <Box className="w-[35%] h-[28%] bg-blue-600/95 flex justify-evenly items-center p-[2%] flex flex-col">
                    <TextField id="outlined-basic" label="Your Comment" variant="filled" className="bg-zinc-200 w-full" onChange={handleCommentChange}  />
                    <Button variant="contained" onClick={()=>handleAddComment()}>Add</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

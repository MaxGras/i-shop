
import { useSelector } from 'react-redux'
import { selectPhoneById } from './phoneSlice';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { ModalWrapper } from '../../components/modalWindow'; 
import LinkButton from '../../components/linkButton';
export function PhoneCard({ idPH }) {


    const phoneOne = useSelector((state) => selectPhoneById(state, idPH));

 
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    function handleOpen(type){
        setModalType(type);
        setOpen(true);
      
    }
    const handleClose = () => setOpen(false);

    return (
        <div className="flex flex-col items-center bg-gray-300 rounded-3xl h-[43vh] py-4 justify-evenly ">
            <img className="w-4/12" src={phoneOne.imageUrl} alt="Phone:)" />
            <h5>{phoneOne.name}</h5>
            <div className=" grid grid-cols-2 gap-x-20">
                <p>Count: {phoneOne.count}</p>
                <p>Width: {phoneOne.size.width}</p>
                <p>Weight: {phoneOne.weight}</p>
                <p>Height: {phoneOne.size.height}</p>
            </div>
            <div className="flex w-full justify-evenly ">
                <Button variant='contained' onClick={()=>handleOpen(true)}>Edit</Button>
                <ModalWrapper state={open} handleClose = {handleClose} param ={modalType} id = {phoneOne.id}></ModalWrapper>
                 <LinkButton to={`/phones/${phoneOne.id}`}>View Phone</LinkButton>
                <Button variant='contained' onClick={()=>handleOpen(false)}>Delete</Button>
            </div>
        </div>
    )
}   
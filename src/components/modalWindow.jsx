import { Button } from "@mui/material";
import LinkButton from "./linkButton";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { deleteOne } from "../features/smartphones/phoneSlice";
import { useDispatch } from "react-redux";

export function ModalWrapper({ state, handleClose, param, id }) {

    const str = "Are you sure to" + (param ? " edit" : " delete") + " the phone card?";
    const dispatch = useDispatch();

    return (
        <Modal open={state} onClose={handleClose}>
            <Box className="bg-gray-800/95 w-1/4 h-1/4 mx-auto my-64 flex flex-col justify-evenly items-center text-white text-lg">
                <h6>{str}</h6>
                <div className="flex justify-evenly w-full">
                    {param ? (
                        <LinkButton to={`/phones/${id}/edit`}> Yes</LinkButton>) : (
                        <LinkButton to={'/'} onClick={() => {
                    
                            dispatch(
                                deleteOne(id)
                            )
                        }}>Yes</LinkButton>
                    )}

                    <Button variant='contained' onClick={handleClose}>No</Button>
                </div>

            </Box>
        </Modal>
    )


}




import { useDispatch, useSelector } from "react-redux";
import { selectCommentById } from "./commentSlice";
import { Button } from "@mui/material";
import { deleteOneCM } from "./commentSlice";

export function CommentCard({idCM, idPH}){
    const dispatch = useDispatch();
    const selectedCommet = useSelector((state)=>selectCommentById(state,idCM));
    const handleDeleteComment= ()=>{
        dispatch(deleteOneCM(idCM))
    }
console.log(typeof(idPH))
    if(selectedCommet.productId === Number(idPH)){
      
        return(
            <div className="w-full p-[2%] h-[10%] border-2 border-gray-600 rounded-3xl mb-[1.5%] flex justify-between">
              <div>
              <h6 className="text-black">{selectedCommet.description}</h6>
              <p className="text-sm">{selectedCommet.date}</p>
              </div>
              <Button variant="contained" onClick={handleDeleteComment}>Delete</Button>
            </div>
        )
    }
    else{
        return
    }
  
}
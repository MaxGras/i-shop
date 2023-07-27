import { SideBar } from "./sidebar";
import { PhoneList } from "../features/smartphones/phoneList";

export function HomePage(){

    return(
        <div className="flex  p-5">
            <SideBar></SideBar>
            <PhoneList></PhoneList>

        </div>
    )
}
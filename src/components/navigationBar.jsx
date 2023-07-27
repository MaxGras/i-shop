
import LinkButton from "./linkButton";

export function NavBar(){


    return(
        <div className="h-[8vh] bg-blue-600 flex items-center">
            <div className="flex items-center px-5 justify-between w-[20%]">
           <LinkButton to ="/">PHONES</LinkButton>
           <LinkButton  to="/phones/adding">ADDING</LinkButton>
         
        </div>
        </div>
    );

}
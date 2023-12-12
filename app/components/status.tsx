import { IconType } from "react-icons/lib";

interface StatusProps{
  label:string;
  icon:IconType;
  color:string;
  bg:string;
}
const Status:React.FC<StatusProps> = ({label,icon:Icon,color,bg}) => {
  return ( <div className={`rounded flex px-1 gap-1 items-center ${bg} ${color}`}>
    {label} <Icon size={15}/>
  </div> );
}
 
export default Status;
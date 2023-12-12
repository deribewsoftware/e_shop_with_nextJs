import { IconType } from "react-icons";

interface ActionBtnProps{
  icon:IconType;
  onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void;
  disabled?:boolean;
}
const ActionBtn:React.FC<ActionBtnProps> = ({icon:Icon,onClick,disabled}) => {
  return ( <button onClick={onClick}
    disabled={disabled}
  className={`
  flex
  w-[40px]
  h-[30px]
  rounded
  border
  border-slate-400
  text-slate-700
  items-center
  justify-center
  cursor-pointer
  ${disabled && "opacity-50 cursor-not-allowed"}
  `}
  >
   <Icon size={18}/>
  </button> );
}
 
export default ActionBtn;
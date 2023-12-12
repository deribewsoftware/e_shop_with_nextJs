import { IconType } from "react-icons/lib";

interface AdminNavItemProps{
  selected?:boolean;
  icon:IconType
  label:string;
}

const AdminNavItem:React.FC<AdminNavItemProps> = ({selected,icon:Icon,label}) => {
  return ( <div className={`flex
   items-center 
  text-center 
  p-2 
  gap-1
   border-b-2 
   justify-center 
   
   hover:text-slate-800
    transition 
    cursor-pointer
    ${selected? 'border-slate-800 text-slate-800':'border-transparent text-slate-500'}
    `}>
      <Icon size={20}/>
      <div className="text-sm font-medium text-center break-normal">{label}</div>
    </div> );
}
 
export default AdminNavItem;
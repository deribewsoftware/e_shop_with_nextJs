import Image from "next/image";
import {FaUserCircle} from 'react-icons/fa'

interface AvatarProps{
  src?:string|null|undefined;
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  if(src){
    return <Image
    height={30}
    width={30}
    src={src}
    alt="avatar"
    className="rounded-full "
    />
  }
  else{
    return <FaUserCircle size={24}/>;
  }
 
}
 
export default Avatar;
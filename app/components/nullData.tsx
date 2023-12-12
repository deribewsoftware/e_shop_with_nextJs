interface NulldataProps{
  title:string;
}


const Nulldata:React.FC<NulldataProps> = ({title}) => {
  return ( <div className="w-full text-xl md:text-2xl h-[50vh]  flex justify-center items-center">
    <p className="font-medium">{title}</p>
  </div> );
}
 
export default Nulldata;
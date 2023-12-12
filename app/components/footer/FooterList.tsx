interface FooterListProps{
  children:React.ReactNode;
}
const FooterList:React.FC<FooterListProps> = ({children}) => {
  return ( 
  <div className="w-full sm:w-1/2 md:1/4 lg:1/6 mb-b flex flex-col gap-2">
{children}
  </div> );
}
 
export default FooterList;
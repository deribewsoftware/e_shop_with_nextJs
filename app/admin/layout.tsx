import AdminNav from "../components/admin/adminnav";

export const metadata={
  title:"E~shop Admin",
  description:"E~shop Admin Dashboard"
}
const AdminLayou = ({children}:{children:React.ReactNode}) => {
  return ( <div className="">
    <AdminNav/>
    {children}
  </div> );
}
 
export default AdminLayou;
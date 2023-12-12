const FormWrap = ({children}:{children:React.ReactNode}) => {
  return ( <div className="
  min-h-fit
  h-full
  flex
  justify-center
  items-center
  pt-24
  pb-12
  ">
<div className="
max-w-[650px]
 w-full 
 flex
 flex-col
 items-center
 gap-6
 shadow-xl
 rounded-md
 shadow-slate-200
 p-4
 md:p-8

 ">

  {children}

 </div>



  </div> );
}
 
export default FormWrap;
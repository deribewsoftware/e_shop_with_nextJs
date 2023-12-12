import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps{
  id:string;
  label:string;
  type?:string;
  disabled?:boolean;
  required?:boolean;
  placehoder?:string;
  register:UseFormRegister<FieldValues>;
  errors:FieldErrors;
}

const Input:React.FC<InputProps> = ({id,label,type,disabled,register,required,placehoder,errors}) => {
  return ( <div className="input w-full relative">
    <input className={`
    peer
    p-4
    pt-6
    border-2
    bg-white
    font-light
    rounded-md
    w-full
    outline-none
    transition
    disabled:opacity-70
    diabled:cursor-not-allowed
    ${errors[id]? 'border-rose-400':'border-slate-300'}
    ${errors[id]? 'focus:border-rose-400':'focus:border-slate-400'}
    `} 
    placeholder={placehoder}
    autoComplete="off"
    disabled={disabled}
    {...register(id,{required})}
    type={type}  id={id} />
    <label className={`
    absolute
    cursor-text
    duration-150
    transform
    -translate-y-3
    top-5
    z-10
    origin-[0]
    left-4
    peer-placeholder-shown:scale-100
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-4
    ${errors[id]? 'text-rose-500':'text-slate-400'}

    `} htmlFor={id}>{label}</label>
  </div> );
}
 
export default Input;
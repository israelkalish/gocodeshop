import './Button.css'

export const Button = ({value,onClick,disabled,id,name,className}) => {
  return(
    <button value = {value} onClick={onClick} className={className} id={id} disabled={disabled} name={name}>{value}</button>
    )
}
 
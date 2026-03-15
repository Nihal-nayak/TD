import React from 'react'

const Buttons = ({name , onClick , disabled,icon: Icon}) => {
  return (
    <button onClick={onClick}  disabled={disabled} className='rounded-md bg-violet-700 hover:bg-violet-900  px-3 py-1 text-sm cursor-pointer font-bold text-white'> {Icon && <Icon size={18} />}
     {name && <span>{name}</span>}
     </button>
  )
}

export default Buttons

import React from 'react'

function Formgroup({label,placeholder,value,onChange}) {
return (
    <div className='form-group'>
        <label htmlFor={label}>{label}</label>
        <input type="text" name={label} placeholder={placeholder} value={value} onChange={onChange}/>

    
    </div>
)
}

export default Formgroup

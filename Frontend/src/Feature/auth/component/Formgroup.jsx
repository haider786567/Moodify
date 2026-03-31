import React from 'react'

function Formgroup({ label, placeholder, value, onChange, type = "text" }) {
return (
    <div className='form-group'>
        <label htmlFor={label}>{label}</label>
        <input 
            type={type} 
            name={label} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
        />
    </div>
)
}

export default Formgroup

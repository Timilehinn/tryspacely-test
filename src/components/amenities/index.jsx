import React from 'react'
import Check from '../../assets/icons/Check-Fill.svg'

const AmentyComp = ({
  label,
  options
}) => {
  return (
    <div className="amenty">
      <h4>{label}</h4>
      <ul>
        {options.map(amty => (
          <li key={amty} className="amenty_list"><Check />{amty}</li>
        ))}
      </ul>
    </div>
  )
}

export default AmentyComp
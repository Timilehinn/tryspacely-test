import React from 'react'
import { Field, ErrorMessage } from 'formik'

const SelectOption = (props) => {
  const { label, name, options, ...rest } = props
  return (
    <main>
      <label htmlFor={name}> {label}</label>
      <Field as='select' id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage
        component='span'
        name={name}
        className='error my-2 text-[#DA3D2A] '
      />
    </main>
  )
}

export default SelectOption

import React, { useEffect } from 'react';
import translate from '../assets/translate.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const FormElement = (props) => {
  const { language } = useLanguage();

  const { label, type, options, readOnly, formInfo, setFormInfo } = props;

  const labelText = translate[label] ? (language ? translate[label][0] : translate[label][1]) : label.toUpperCase();

  useEffect(() => {
    if (type === 'date' && !formInfo[label]) {
      setFormInfo({ ...formInfo, [label]: getCurrentDate() });
    } else if (type === 'dropdown' && !formInfo[label]) {
      setFormInfo({ ...formInfo, [label]: options[0].value });
    }
  });

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [label]: e.target.value.toUpperCase() });
  };

  const getCurrentDate = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns 0-11
    let day = date.getDate();

    // Ensure month and day are in 2-digit format
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  };

  const renderInput = (type) => {
    switch (type) {
      case 'text':
        return (
          <input
            className='input w-2/3'
            placeholder={labelText}
            type={type}
            value={formInfo[label] || ''}
            onChange={handleChange}
          />
        );
      case 'number':
        return (
          <input
            className='input w-2/3'
            placeholder={labelText}
            type={'text'}
            value={formInfo[label] || ''}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers, both positive and negative
              if (/^-?\d*$/.test(value)) {
                handleChange(e);
              }
            }}
          />
        );
      case 'date':
        return (
          <input
            className='input w-2/3'
            placeholder={labelText}
            type={type}
            value={formInfo[label] || getCurrentDate()}
            onChange={handleChange}
          />
        );
      case 'dropdown':
        return (
          <select className='input w-2/3' value={formInfo[label] || options[0].value} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            className='input w-2/3'
            placeholder={labelText}
            type={type}
            value={formInfo[label] || ''}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <div className='flex my-2'>
      <label htmlFor={label} className='w-1/3'>
        {labelText}
      </label>
      {readOnly ? <span className='w-2/3'>{formInfo[label]}</span> : renderInput(type)}
    </div>
  );
};

export default FormElement;

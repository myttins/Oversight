import React from 'react';
import { useOutletContext } from 'react-router';
import translate from '../assets/translate';

const FormElement = (props) => {
  const [language] = useOutletContext();

  const { label, readOnly, defaultValue, value, handleOnChange} = props;

  return (
    <div className="flex my-2">
      <span className="w-1/3">
        {language ? translate[label][0] : translate[label][1]}
      </span>
      <input
        className="input w-2/3"
        placeholder={label}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={value || ''}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
};

export default FormElement;

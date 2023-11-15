import React from 'react';
import { useOutletContext } from 'react-router';
import translate from '../../../assets/translate';

const FormElement = (props) => {
  const { language } = useOutletContext();

  const { label, type, readOnly, formInfo, setFormInfo } = props;

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

  return (
    <div className="flex my-2 border">
      <label htmlFor={label} className="w-1/3">
        {language ? translate[label][0] : translate[label][1]}
      </label>
      <input
        className="input w-2/3"
        placeholder={translate[label][0]}
        type={type}
        readOnly={readOnly}
        value={formInfo[label] || (type === 'date' ? getCurrentDate() : '')}
        onChange={(e) => setFormInfo({ ...formInfo, [label]: e.target.value.toUpperCase() })}
      />
    </div>
  );
};

export default FormElement;

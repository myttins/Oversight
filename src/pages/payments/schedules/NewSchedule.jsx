import React, { useEffect, useState } from 'react';
import FormElement from '../../../util/FormElement';

import axios from 'axios';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import { useNavigate } from 'react-router';

const NewSchedule = () => {
  const [form, setForm] = useState({
    period: 'month',
    day: '1',
    frequency: '1',
  });
  const [labelAndAmount, setLabelAndAmount] = useState({});
  const { showBanner } = useMessageBanner();
  const navigate = useNavigate()

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUNE',
    'JULY',
    'AUG',
    'SEPT',
    'NOV',
    'DEC',
  ];

  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push({ label: i, value: i });
  }

  const handleSubmit = async () => {
    try {
      if (!labelAndAmount.label || !labelAndAmount.amount) return;
      if (!validateData(form)) throw Error('Invalid input.');
      const { expression, description } =
        generateExpressionAndDescription(form);

      const body = {
        label: labelAndAmount.label,
        amount: labelAndAmount.amount,
        expression: expression,
        description: description,
      };
      const response = await axios.post('/api/payments/schedule', body);
      showBanner({
        style: 'success',
        message: response.data.message,
      });
      navigate('/payments/schedules')
    } catch (error) {
      console.error(error);
      showBanner({
        style: 'error',
        message: error.message || error.response.data.message,
      });
    }
  };

  const generateExpressionAndDescription = (form) => {
    if (form.period === 'hour') {
      return { expression: `0 * * * *`, description: 'EVERY HOUR' };
    } else if (form.period === 'month') {
      return {
        expression: `0 0 0 ${form.day} 1/${form.frequency} * *`,
        description: `EVERY ${form.frequency} MONTH(S) ON DAY ${form.day}`,
      };
    } else if (form.period === 'week') {
      return {
        expression: `0 0 0 * * ${form.day}`,
        description: `EVERY WEEK ON ${daysOfWeek[form.day - 1]}`,
      };
    } else if (form.period === 'year') {
      return {
        expression: `0 0 0 ${form.day} ${form.month} *`,
        description: `EVERY YEAR ON ${months[form.month - 1]} ${form.day}`,
      };
    }
  };

  const validateData = (form) => {
    if (form.period === 'hour') {
      return true;
    } else if (form.period === 'month') {
      if (!form.day && !form.frequency) return false;
      if (!form.frequency.length) return false;
    } else if (form.period === 'week') {
      if (!form.day) return false;
    } else if (form.period === 'year') {
      if (form.month === '2' && form.day > '28') return false;
      if (form.month === ('4' || '6' || '9' || '11') && form.day > '30')
        return false;
    } else {
      return false;
    }
    return true;
  };

  const renderBox = () => {
    const outerDivStyle = 'border p-4 m-4';
    switch (form.period) {
      case 'year':
        return (
          <div className={outerDivStyle}>
            <div>YEAR</div>
            <span>DESCRIPTION: </span>
            <span>{`EVERY YEAR ON ${months[form.month - 1] || '__'} ${
              form.day
            }`}</span>
            <FormElement
              label={'month'}
              type={'dropdown'}
              options={months.map((month, i) => {
                return { label: month, value: i + 1 };
              })}
              readOnly={false}
              formInfo={form}
              setFormInfo={setForm}
            />
            <FormElement
              label={'day'}
              type="dropdown"
              options={days}
              readOnly={false}
              formInfo={form}
              setFormInfo={setForm}
            />
          </div>
        );
      case 'month':
        return (
          <div className={outerDivStyle}>
            <div>MONTH</div>
            <span>DESCRIPTION: </span>
            <span>
              {`EVERY ${form.frequency || '__'} MONTH(S) ON DAY ${
                form.day || '__'
              }`}
            </span>
            <FormElement
              label={'day'}
              type="dropdown"
              options={days}
              readOnly={false}
              formInfo={form}
              setFormInfo={setForm}
            />
            <FormElement
              label={'frequency'}
              type="number"
              readOnly={false}
              formInfo={form}
              setFormInfo={setForm}
            />
          </div>
        );
      case 'week':
        return (
          <div className={outerDivStyle}>
            <div>WEEK</div>
            <span>DESCRPTION: </span>
            <span>{`EVERY ${daysOfWeek[form.day - 1]}`}</span>
            <FormElement
              label={'day'}
              type="dropdown"
              options={daysOfWeek.map((day, i) => {
                return { label: day, value: i + 1 };
              })}
              readOnly={false}
              formInfo={form}
              setFormInfo={setForm}
            />
          </div>
        );
      case 'hour':
        return (
          <div className={outerDivStyle}>
            <div>HOUR</div>
            <span>DESCRIPTION: EVERY HOUR</span>
          </div>
        );
    }
  };
  return (
    <div className="bg-white p-4">
      <h1>NEW SCHEDULE</h1>
      <FormElement
        label={'label'}
        type="text"
        readOnly={false}
        formInfo={labelAndAmount}
        setFormInfo={setLabelAndAmount}
      />
      <FormElement
        label={'amount'}
        type="number"
        readOnly={false}
        formInfo={labelAndAmount}
        setFormInfo={setLabelAndAmount}
      />
      <button
        className={form.period === 'year' ? 'underline' : null}
        onClick={() => setForm({ period: 'year', month: '1', day: '1' })}
      >
        YEAR
      </button>
      <button
        className={`mx-2 ${form.period === 'month' ? 'underline' : ''}`}
        onClick={() => setForm({ period: 'month', day: '1', frequency: '1' })}
      >
        MONTH
      </button>
      <button
        className={`${form.period === 'week' ? 'underline' : ''}`}
        onClick={() => setForm({ period: 'week', day: '1' })}
      >
        WEEK
      </button>
      <button
        className={`mx-2 ${form.period === 'hour' ? 'underline' : ''}`}
        onClick={() => setForm({ period: 'hour' })}
      >
        HOUR
      </button>
      {renderBox()}
      <button className="btn" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default NewSchedule;

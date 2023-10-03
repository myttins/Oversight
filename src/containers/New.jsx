import React from 'react';

const New = () => {
  const handleSubmit = () => {};
  const inputStyle = 'block border my-2 w-full p-2';
  return (
    <div>
      <h1 className="mt-6 text-2xl">New Vehicle</h1>
      <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
        <input
          className={inputStyle}
          type="text"
        //   onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Plate"
        />
        <input
          className={inputStyle}
          type="text"
        //   onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Year"
        />
        <input
          className={inputStyle}
          type="text"
        //   onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Model"
        />
        <button
          className="border-2 border-slate-700 rounded-full bg-slate-700 text-white px-4 py-1 hover:text-black hover:bg-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default New;

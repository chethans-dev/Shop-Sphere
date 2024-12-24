/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
const Input = ({ labelName = "", type="text" }) => {
  const name = labelName.split(" ")[0].toLowerCase();
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelName}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          required
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;

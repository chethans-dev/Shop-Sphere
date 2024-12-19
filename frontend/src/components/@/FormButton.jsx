/* eslint-disable react/prop-types */
const FormButton = ({ title, ...rest }) => {
  return (
    <div>
      <button
        type="submit"
        className="text-white flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        {...rest}
      >
        {title}
      </button>
    </div>
  );
};

export default FormButton;

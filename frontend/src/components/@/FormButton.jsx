/* eslint-disable react/prop-types */
const FormButton = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className="text-black flex w-full justify-center rounded-md bg-customBlue px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {title}
      </button>
    </div>
  );
};

export default FormButton;

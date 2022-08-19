export const formStyles = {
  defaults: [
    'flex justify-center items-center w-full h-full lg:w-[fit-content] lg:max-w-lg lg:bg-slate-800 rounded-lg space-x-2',
  ],
  authFormDefaults: [
    'p-8 py-12 flex-col lg:border-[1px] lg:border-indigo-400 shadow-lg',
  ],
  labelandInputWrapper: [
    'relative z-0 w-full min-w-[20vw] mb-6 group flex items-center',
  ],
  input: [
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none dark:text-white dark:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer',
  ],
  inputPassword: [
    'flex py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none dark:text-white dark:border-indigo-300 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer',
  ],
  label: [
    'peer-focus:font-medium absolute text-xs text-indigo-500 dark:text-indigo-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
  ],
  formButton: [
    'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-1 focus:outline-none focus:ring-indigo-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-100 h-[fit-content]',
  ],
  headerWrapper: ['text-white text-center pb-12 pt-2'],
  headerTitle: ['font-bold text-2xl flex items-center  justify-center mb-2'],
  headerParagraph: ['text-xs opacity-60'],
  showPasswordButtonActive: [
    'absolute right-0 text-white text-[0.6rem] uppercase font-bold bg-red-500 px-1 rounded-sm hover:bg-red-600 cursor-pointer',
  ],
  showPasswordButtonInactive: [
    'absolute right-0 text-white text-[0.6rem] uppercase font-bold bg-indigo-500 px-1 rounded-sm hover:bg-indigo-600 cursor-pointer',
  ],
  formSuggestion: [
    'flex items-center justify-center flex-col mt-4 text-indigo-400 uppercase text-sm font-bold',
  ],
  formAltSuggestion: [
    'text-xs text-center mt-4 text-white font-medium hover:underline cursor-pointer normal-case transition-all',
  ],
};

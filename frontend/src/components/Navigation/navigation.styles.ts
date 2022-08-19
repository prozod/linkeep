export const navigationStyles = {
  Wrapper: [
    'bg-transparent backdrop-blur-xl text-white py-4 px-8 flex justify-between',
  ],
  Items: ['flex items-center space-x-2'],
  Item: [
    'rounded-lg px-4 py-2 transition-all border-[1px] border-transparent text-sm',
  ],
  Logo: [
    'flex flex-col justify-center items-center text-lg font-bold  transition-all px-2 py-2 lg:flex-row',
  ],
  Icons: [
    'flex justify-center items-center text-lg font-bold  transition-all px-4',
  ],
  dashboardNavIcons: ['flex'],
};

export const navigationAnimation = {
  Item: [
    'hover:bg-slate-800 hover:border-[0.5px] hover:border-indigo-400  cursor-pointer',
  ],
  Logo: ['hover:bg-slate-800 cursor-pointer rounded-lg'],
};

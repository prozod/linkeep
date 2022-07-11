export const styles = {
  Wrapper: [
    'bg-transparent backdrop-blur-xl text-white py-4 px-8 flex justify-between',
  ],
  Items: ['flex items-center space-x-2'],
  Item: [
    'rounded-full px-4 py-2 transition-all border-[1px] border-transparent text-sm',
  ],
  Logo: [
    'flex justify-center items-center text-xl font-bold px-3 transition-all',
  ],
  dashboardNavIcons: ['flex space-x-2'],
};

export const animation = {
  Item: [
    'hover:bg-gradient-to-r from-indigo-500 to-blue-600 hover:border-[1px] hover:border-indigo-400  cursor-pointer',
  ],
  Logo: ['hover:bg-slate-800 cursor-pointer rounded-full'],
};

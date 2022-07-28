export const sidebarStyles = {
  defaults: ['bg-slate-900 h-full'],
  title: ['flex items-center justify-between pt-3 pb-2 px-4'],
  line: ['h-[2px] w-full bg-slate-700'],
  wrapper: ['flex items-center space-x-1 px-2 text-sm bg-red-200'],
  active: ['bg-slate-800'],
  items: [
    'py-3 px-4 transition-all w-full flex items-center space-x-1 text-sm cursor-pointer truncate ... overflow-hidden',
  ],
  spinnerContainer: ['w-full flex items-center justify-center'],
  addIcon: ['cursor-pointer p-2 rounded-full transition-all'],
};
export const sidebarAnimation = {
  items: ['hover:bg-slate-800 hover:text-indigo-400 '],
  addIcon: ['hover:bg-slate-800 hover:text-indigo-400'],
};

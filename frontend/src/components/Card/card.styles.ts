export const cardStyles = {
  container: [
    'relative border-[1px] border-slate-800 text-sm shadow-md rounded-lg hover:scale-[97%] bg-gray-300 transition-all cursor-pointer w-[fit-content] hover:shadow-lg hover:border-indigo-500',
  ],
  link_wrapper: ['bg-slate-800 w-[350px] h-64 rounded-md'],
  link_image_container: [
    'w-full h-2/4 relative bg-slate-700 rounded-t-md overflow-hidden',
  ],
  link_image: ['bg-transparent'],
  link_info: ['p-4'],
  link_title: ['text-md font-bold'],
  link_description: ['text-sm truncate text-gray-200 opacity-50'],
  link_url: ['text-sm truncate opacity-50'],
  skeleton_wrapper: ['bg-slate-800 w-[350px] h-64 rounded-md'],
  skeleton_image: [
    'w-full h-2/4 relative bg-gradient-to-r from-slate-700 to-slate-600 rounded-t-md overflow-hidden animate-pulse',
  ],
  skeleton_info: ['p-4 w-full h-2/4 space-y-2 animate-pulse'],
  skeleton_title: ['bg-slate-700 w-full min-h-[25px] rounded-md'],
  skeleton_text: ['bg-slate-700 w-full min-h-[15px] rounded-md'],
};

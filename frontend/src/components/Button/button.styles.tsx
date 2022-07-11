export const buttonStyles = {
  defaults: ['px-6 py-4 rounded-md transition-all text-white'],
  outline: ['border-2 border-pink-300 text-pink-300'],
  heroCTA: [
    'bg-gradient-to-r from-indigo-700 to-blue-800 text-white px-8 py-4 transition-all shadow-lg border-[1px] border-indigo-500',
  ],
  hero: [
    'bg-transparent border-[1px] border-white text-white px-8 py-4 transition-all shadow-lg',
  ],
};

export const buttonAnimations = {
  outline: ['hover:bg-pink-300 hover:text-neutral-800 hover:scale-95'],
  heroCTA: ['hero:bg-indigo-400 hover:scale-95'],
};

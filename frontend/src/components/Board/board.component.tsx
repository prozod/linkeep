const Board = ({ children }: { children: JSX.Element | React.ReactNode }) => {
  return <main>{children}</main>;
};

export default Board;

Board.Title = function BoardTitle({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) {
  return <h1 className='pt-2 pb-4 text-lg'>{children}</h1>;
};

Board.Empty = function EmptyBoard() {
  return (
    <section className='flex w-full h-full items-center justify-center flex-col'>
      <p className='mb-8'>Looks a bit empty over here!</p>
      <div className='flex items-center space-x-2'>
        <p className='bg-slate-800 p-8 rounded-md'>Browse collections</p>
        <span className='text-slate-600 font-bold opacity-60'>OR</span>
        <p className='bg-slate-800 p-8 rounded-md'>View profile</p>
      </div>
    </section>
  );
};

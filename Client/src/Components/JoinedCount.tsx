interface countProps {
  count: number;
}

export const JoinedCount = ({ count }: countProps) => {
  return (
    <div className="h-7 pl-3 w-40 border-2 mt-3 bg-green-600 rounded-2xl">
      <span>{count}</span>
      <span> People Joined</span>
    </div>
  );
};

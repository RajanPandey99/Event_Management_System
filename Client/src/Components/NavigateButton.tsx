interface navigateProps {
  label: string;
  onClick: () => void;
}

export const NavigateButton = ({ onClick, label }: navigateProps) => {
  return (
    <button
      onClick={onClick}
      className=" flex justify-center items-center h-20 w-40 rounded-3xl bg-blue-300 text-1xl font-bold"
    >
      {label}
    </button>
  );
};

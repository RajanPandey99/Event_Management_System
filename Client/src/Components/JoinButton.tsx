interface joinButtonProps {
  label: string;
  eventId: number;
  onClickEvent: (e: number) => void;
}
export const JoinButton = ({
  eventId,
  onClickEvent,
  label,
}: joinButtonProps) => {
  return (
    <button
      onClick={() => onClickEvent(eventId)}
      className={`${
        label === "Join" ? "bg-blue-600" : "bg-red-600"
      } h-7 w-15 border-2 mt-3 rounded-2xl`}
    >
      {label}
    </button>
  );
};

interface joinButtonProps {
  label:string,
  eventId: number;
  onClickEvent: (e: number) => void;
}
export const JoinButton = ({ eventId, onClickEvent, label }: joinButtonProps) => {
  return (
    <button
      onClick={() => onClickEvent(eventId)}
      className="h-7 w-15 border-2 mt-3 bg-blue-600 rounded-2xl"
    >
      {label}
    </button>
  );
};

interface joinButtonProps {
  eventId: number;
  onClickEvent: (e: number) => void;
}
export const JoinButton = ({ eventId, onClickEvent }: joinButtonProps) => {
  return (
    <button
      onClick={() => onClickEvent(eventId)}
      className="h-7 w-15 border-2 mt-3 bg-blue-600 rounded-2xl"
    >
      Join
    </button>
  );
};

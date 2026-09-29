import type { Events } from "../Types/Events";

interface ShowEventsProps {
  events: Events.EventResponse[];
  date: string;
}

export const ShowEvents = ({ events, date }: ShowEventsProps) => {  
  return (
    <div>
      {events.map(
        (event) =>
          event.dateOfEvent.toString() === date && (
            <div key={event.id}>
             <p className="text-1xl">{event.title}</p>
            </div>
          )
      )}
    </div>
  );
};
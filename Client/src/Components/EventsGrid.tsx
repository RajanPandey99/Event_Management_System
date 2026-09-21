import type { Events } from "../Types/Events";
import { JoinButton } from "./JoinButton";
import { JoinedCount } from "./JoinedCount";

interface eventProps {
  events: Events.EventResponse[];
  onJoinEvent?: (eventId: number) => void;
}

export const EventsGrid = ({ events, onJoinEvent }: eventProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {events &&
        events.map((event, index) => (
          <div
            className="bg-blue-300 shadow-2xl rounded-2xl border-2 p-2 h-50"
            key={index}
          >
            <h2>{event.title}</h2>

            <p>Date: {event.dateOfEvent.toString()}</p>
            <p>Time: {event.timeOfEvent}</p>
            <p>Category: {event.category}</p>
            <p>Location: {event.location}</p>

            {event.description && <p>{event.description}</p>}
            <div className="flex flex-row gap-4">
              {onJoinEvent && (
                <JoinButton
                  eventId={event.id}
                  onClickEvent={() => onJoinEvent(event.id)}
                  label="Join"
                />
              )}
              <JoinedCount count={event.count} />
            </div>
          </div>
        ))}
    </div>
  );
};

import { getUser } from "../Services/getUser";
import type { Events } from "../Types/Events";
import type { UserNamespace } from "../Types/User";
import { useState, useEffect } from "react";
import { get } from "../Services/api";
import { toast } from "react-toastify";
import { Button } from "rsuite";

interface eventProps {
  events: Events.EventResponse[];
  onJoinEvent?: (eventId: number) => Promise<boolean>;
  onLeaveEvent?: (eventId: number) => Promise<boolean>;
}

export const EventsGrid = ({
  events,
  onJoinEvent,
  onLeaveEvent,
}: eventProps) => {
  const user: UserNamespace.User = getUser();

  const [joinedId, setJoinedIds] = useState<number[]>([]);

  useEffect(() => {
    async function getJoinedIds() {
      const response = await get<number[]>("join/joinedevents", user.id);

      if (!response.ok) {
        toast(`Something went wrong ${response.message}`);
        return;
      }
      setJoinedIds(response.data ?? []);
    }
    getJoinedIds();
  }, [user.id]);

  async function leaveEvent(eventId: number) {
    if (!onLeaveEvent) return;
    const response: boolean = await onLeaveEvent(eventId);

    if (response) {
      setJoinedIds((prev) => prev.filter((e) => e !== eventId));
    }
  }

  async function joinEvent(eventId: number) {
    if (!onJoinEvent) return;
    const response: boolean = await onJoinEvent(eventId);

    if (response) {
      setJoinedIds((prev) => [...prev, eventId]);
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {events.length === 0 ? (
        <p className="w-full text-center text-4xl text-gray-500">
          No events for this date
        </p>
      ) : (
        events.map((event, index) => (
          <div
            className="bg-blue-300! shadow-2xl! rounded-2xl! border-2! p-2! h-50!"
            key={index}
          >
            <h4>{event.title}</h4>

            <p>Date: {event.dateOfEvent.toString()}</p>
            <p>Time: {event.timeOfEvent}</p>
            <p>Category: {event.category}</p>
            <p>Location: {event.location}</p>

            {event.description && <p>{event.description}</p>}

            <div className="flex! flex-row! gap-4!">
              {user.id !== -1 &&
                (joinedId.includes(event.id)
                  ? onLeaveEvent && (
                      <Button
                        onClick={() => leaveEvent(event.id)}
                        className="bg-red-600! w-20!"
                      >
                        Leave
                      </Button>
                    )
                  : onJoinEvent && (
                      <Button
                        onClick={() => joinEvent(event.id)}
                        className="bg-blue-600! w-20!"
                      >
                        Join
                      </Button>
                    ))}

              <Button className="bg-green-600!">
                {event.count} People Joined
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

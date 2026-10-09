import type { Events } from "../Types/Events";
import { EventsGrid } from "../Components/EventsGrid";
import { get } from "../Services/api";
import { JoinEvent, LeaveEvent } from "../Services/EventService";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Home = () => {
  const todaysDate = new Date().toLocaleDateString("en-CA");

  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery<Events.EventResponse[]>({
    queryKey: ["todaysEvents"],

    queryFn: async () => {
      const response = await get<Events.EventResponse[]>(
        `event/upcomming?date=${todaysDate}`,
      );

      if (!response.ok) {
        toast.error(response.message || "Unable to fetch events");
      }
      return response.data ?? [];
    },
  });

  async function joinEvent(eventId: number): Promise<boolean> {
    return JoinEvent(eventId, queryClient);
  }

  async function leaveEvent(eventId: number): Promise<boolean> {
    return LeaveEvent(eventId, queryClient);
  }
  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold">Todays Events..</h3>
        <div className="flex flex-row">
          <EventsGrid
            events={events}
            onJoinEvent={joinEvent}
            onLeaveEvent={leaveEvent}
          />
        </div>
      </div>
    </div>
  );
};

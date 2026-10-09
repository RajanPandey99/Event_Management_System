import { EventsGrid } from "../Components/EventsGrid";
import { get } from "../Services/api";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import type { Events } from "../Types/Events";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JoinEvent, LeaveEvent } from "../Services/EventService";

export const ShowEvents = () => {
  const queryClient = useQueryClient();
  const { date: urlDate, end: urlEnd } = useParams();

  const { data: events = [] } = useQuery<Events.EventResponse[]>({
    queryKey: ["events", urlDate, urlEnd],

    queryFn: async () => {
      let response;

      if (urlEnd) {
        response = await get<Events.EventResponse[]>(
          `event/inrange?start=${urlDate}&end=${urlEnd}`,
        );
      } else {
        response = await get<Events.EventResponse[]>(`event/?date=${urlDate}`);
      }
      if (!response.ok) {
        toast.error(response.message || "Unable to fetch events");
      }
      return response.data ?? [];
    },

    enabled: Boolean(urlDate),
  });

  async function joinEvent(eventId: number): Promise<boolean> {
    return JoinEvent(eventId, queryClient);
  }

  async function leaveEvent(eventId: number): Promise<boolean> {
    return LeaveEvent(eventId, queryClient);
  }
  return (
    <EventsGrid
      events={events}
      onJoinEvent={joinEvent}
      onLeaveEvent={leaveEvent}
    />
  );
};

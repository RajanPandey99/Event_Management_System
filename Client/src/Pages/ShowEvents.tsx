import { useEffect } from "react";
import { useState } from "react";
import type { UserNamespace } from "../Types/User";
import { EventsGrid } from "../Components/EventsGrid";
import { get, post, del } from "../Services/api";
import { getUser } from "../Services/getUser";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import type { Events } from "../Types/Events";

export const ShowEvents = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const {date: urlDate} = useParams();
  const [date, setDate] = useState(urlDate?.split(":")[1] ?? "");

  useEffect(() => {
    async function getEvents() {
      const response = await get<Events.EventResponse[]>(
        `event/?date=${date}`,
      );
      if (!response.ok) {
        toast.error(`Error : ${response.message}`);
        return;
      }
      const events = response.data ?? [];
      setEvents(events);
    }
    getEvents();
  }, [date]);

  async function joinEvent(eventId: number): Promise<boolean> {
    const user: UserNamespace.User = getUser();
    if (user.id == -1) {
      toast.error("You need to login first to join event !");
      return false;
    }
    const response = await post("join", eventId, user.id);
    if (!response.ok) {
      toast.error(`Error : ${response.message}`);
      return false;
    }
    setEvents((prevEvent) =>
      prevEvent.map((e) =>
        e.id == eventId ? { ...e, count: e.count + 1 } : e,
      ),
    );
    toast.success("Event joined succesfully !");
    return true;
  }
   
   async function leaveEvent(eventId: number): Promise<boolean> {
      const user: UserNamespace.User = getUser();
      if (user.id == -1) {
        toast.error("UnAuthorized user !");
        return false;
      }
      try {
        const response = await del(`join/${eventId}`, eventId, user.id);
        if (response.status != 200) {
          toast.error(`Error:  ${response.message}`);
          return false;
        }
  
        toast.success("Event leaved succesfully !");
  
        setEvents((prevEvent) =>
          prevEvent.map((e) =>
            e.id == eventId ? { ...e, count: e.count - 1 } : e,
          ),
        );
        return true;
      } catch (error) {
        toast.error(`Unable to join event ! ${error}`);
        return false;
      }
    }

  return (
        <EventsGrid events={events} onJoinEvent={joinEvent} onLeaveEvent={leaveEvent}/>
  );
};

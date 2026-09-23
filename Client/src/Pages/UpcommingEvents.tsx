import { useEffect } from "react";
import { useState } from "react";
import type { Events } from "../Types/Events";
import type { UserNamespace } from "../Types/User";
import { EventsGrid } from "../Components/EventsGrid";
import { get, post, del } from "../Services/api";
import { getUser } from "../Services/getUser";
import { toast } from "react-toastify";

export const UpcommingEvents = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const [date, setData] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function getEvents() {
      const response = await get<Events.EventResponse[]>(
        `event?category=${category}&date=${date}`,
      );
      if (!response.ok) {
        toast.error(`Error : ${response.message}`);
        return;
      }
      const events = response.data ?? [];
      setEvents(events);
    }
    getEvents();
  }, [date, category]);

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
    <div className="w-full h-140 border-2 rounded-lg p-4 flex flex-col">
      <div className="flex flex-row gap-4 mb-4 shrink-0">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Category</label>

          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 rounded-md px-3 py-2 w-50"
          >
            <option value="">All Categories</option>
            <option value="Games">Games</option>
            <option value="Concert">Concert</option>
            <option value="Dance">Dance</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Sports">Sports</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Date</label>

          <input
            name="date"
            value={date}
            onChange={(e) => setData(e.target.value)}
            type="date"
            className="border-2 rounded-md px-3 py-2 w-50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border-t-2 pt-3">
        <EventsGrid events={events} onJoinEvent={joinEvent} onLeaveEvent={leaveEvent}/>
      </div>
    </div>
  );
};

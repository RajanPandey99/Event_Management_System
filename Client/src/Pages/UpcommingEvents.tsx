import { useEffect } from "react";
import { useState } from "react";
import type { Events } from "../Types/Events";
import type { UserNamespace } from "../Types/User";
import { baseURL } from '../config';
import { EventsGrid } from "../Components/EventsGrid";



export const UpcommingEvents = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const [date, setData] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(
        `${baseURL}event?category=${category}&date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Origin: window.location.host,
          },
        },
      );
      if (response.status != 200) {
        alert("Unable to fetch events !");
        return;
      }
      const data = await response.json();
      setEvents(data);
    }
    getEvents();
  }, [date, category]);

  
    async function joinEvent(eventId: number) {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        alert("You need to login first to join event !");
        return;
      }
      const user: UserNamespace.User = JSON.parse(userData);
      const userId = String(user.id);
      try {
        const response = await fetch(`${baseURL}join`, {
          method: "POST",
          body: JSON.stringify(eventId),
          headers: {
            Id: userId,
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.status != 200) {
          alert(`Error ${data.message}`);
          return;
        }
        alert(`${data.message}`);
      } catch (error) {
        alert("Unable to join event !");
        console.log(error);
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
        <EventsGrid events={events} onJoinEvent={joinEvent}/>
      </div>
    </div>
  );
};

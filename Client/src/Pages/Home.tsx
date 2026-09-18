import { useEffect, useState } from "react";
import type { Events } from "../Types/Events";
import { useNavigate } from "react-router";
import type { UserNamespace } from "../Types/User";
import { EventsGrid } from "../Components/EventsGrid";
import { get } from "../Services/api";
import { getUser } from "../Services/getUser";
import { NavigateButton } from "../Components/NavigateButton";

export const Home = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);

  const user: UserNamespace.User = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function getEvents() {
      const todaysDate = new Date().toLocaleDateString("en-CA");
      const response = await get<Events.EventResponse[]>(
        `event?date=${todaysDate}`,
      );
      if (!response.ok) {
        alert("Unable to fetch events");
        return;
      }
      const events = response.data ?? [];
      setEvents(events);
    }
    getEvents();
  }, []);
  async function joinEvent(eventId: number) {
    const user: UserNamespace.User = getUser();
    if (user.id == -1) {
      alert("You need to login first to join event !");
      return;
    }
    const userId = String(user.id);
    try {
      const response = await fetch("https://localhost:7094/api/join", {
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
    <div>
      <div className="h-30 w-full flex items-center justify-center gap-5">
        {user.id != -1 && (
          <NavigateButton
            onClick={() => navigate("/addevent")}
            label="Add Event"
          />
        )}
        {user.id != -1 && (
          <NavigateButton
            onClick={() => navigate("/profile")}
            label="View your profile"
          />
        )}
        <NavigateButton
          onClick={() => navigate("/upcommingevents")}
          label="View upcomming Events"
        />
      </div>

      <div>
        <h3 className="text-3xl font-bold">Todays Events..</h3>
        <div className="flex flex-row">
          {events.length == 0 && (
            <div>
              <h4>No Events for today</h4>
            </div>
          )}
          <EventsGrid events={events} onJoinEvent={joinEvent} />
        </div>
      </div>
    </div>
  );
};

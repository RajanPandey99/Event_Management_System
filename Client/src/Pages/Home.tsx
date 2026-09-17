import { useEffect, useState } from "react";
import type { Events } from "../Types/Events";
import { useNavigate } from "react-router";
import type { UserNamespace } from "../Types/User";
import { baseURL } from '../config';
import { EventsGrid } from "../Components/EventsGrid";

export const Home = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const [user, setUser] = useState<UserNamespace.User>(() => {
    const userData = localStorage.getItem("userData");
    return userData
      ? JSON.parse(userData)
      : {
          id: -1,
          name: "",
          email: "",
        };
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function getEvents() {
      try {
        const todaysDate = new Date().toLocaleDateString("en-CA");
        const response = await fetch(
          `${baseURL}event?date=${todaysDate}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Origin: window.location.host,
            },
          },
        );
        if (!response) {
          alert("Unable to fetch events");
          return;
        }
        const event = await response.json();
        setEvents(event);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch events");
      }
    }
    getEvents();
  }, []);
  async function joinEvent(eventId: number) {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("You need to login first to join event !");
      return;
    }
    const user: UserNamespace.User = JSON.parse(userData);
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
          <button
            onClick={() => navigate("/addevent")}
            className="h-full w-40 rounded-3xl bg-blue-300 text-3xl font-bold"
          >
            Add Event
          </button>
        )}
        {user.id != -1 && (
          <button
            onClick={() => navigate("/profile")}
            className="h-full w-40 rounded-3xl bg-blue-300 text-3xl font-bold"
          >
            View your profile
          </button>
        )}
        <button
          onClick={() => navigate("/upcommingevents")}
          className="h-full w-40 rounded-3xl bg-blue-300 text-3xl font-bold"
        >
          View upcomming Events
        </button>
      </div>

      <div>
        <h3 className="text-3xl font-bold">Todays Events..</h3>
        <div className="flex flex-row">
          {events.length == 0 && (
            <div>
              <h4>No Events for today</h4>
            </div>
          )}
          <EventsGrid events={events} onJoinEvent={joinEvent}/>
    
        </div>
      </div>
    </div>
  );
};

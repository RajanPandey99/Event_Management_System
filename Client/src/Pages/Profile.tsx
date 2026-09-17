import { useEffect, useState } from "react";
import type { UserNamespace } from "../Types/User";
import type { Events } from "../Types/Events";
import { baseURL } from '../config';
import { EventsGrid } from "../Components/EventsGrid";

export const Profile = () => {
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
  const [postedevents, setPostedevents] = useState<Events.EventResponse[]>([]);
  const [joinedEvents, setJoinedevents] = useState<Events.EventResponse[]>(
    [],
  );

  async function getPostedEvents() {
    const userId = String(user.id);
    try {
      const response = await fetch(`${baseURL}event/posted`, {
        method: "GET",
        headers: {
          Id: userId,
          "Content-type": "application/json",
          Origin: window.location.host,
        },
      });
      if (!response) {
        alert("Unable to fetch events");
        return;
      }
      const event = await response.json();
      console.log(event);
      setPostedevents(event);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch events");
    }
  }

  async function geJoinedEvents() {
    const userId = String(user.id);
    try {
      const response = await fetch(`${baseURL}join`, {
        method: "GET",
        headers: {
          Id: userId,
          "Content-type": "application/json",
          Origin: window.location.host,
        },
      });
      if (!response) {
        alert("Unable to fetch joined event !");
        return;
      }
      const event = await response.json();
      setJoinedevents(event);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch events");
    }
  }

  useEffect(() => {
    async function loadData() {
      await getPostedEvents();
      await geJoinedEvents();
    }
    loadData();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-4xl">{user.name}</h2>
      <h2 className="text-3xl">{user.email}</h2>

      <div className="w-full h-[70%] flex gap-2">
        <div className="h-full flex-1 border-2 rounded p-4">
          <h2 className="text-lg font-semibold">Events you posted</h2>
          <EventsGrid events={postedevents}/>
        </div>

        <div className="h-full w-50 flex-1 border-2 rounded p-4">
          <h2 className="text-lg font-semibold">Events you have joined</h2>
    
           <EventsGrid events={joinedEvents}/>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import type { UserNamespace } from "../Types/User";
import type { Events } from "../Types/Events";
import { EventsGrid } from "../Components/EventsGrid";
import { get } from "../Services/api";
import { getUser } from "../Services/getUser";

export const Profile = () => {
  const user : UserNamespace.User = getUser();
  const [postedevents, setPostedevents] = useState<Events.EventResponse[]>([]);
  const [joinedEvents, setJoinedevents] = useState<Events.EventResponse[]>(
    [],
  );

  async function getPostedEvents() {
    const response = await get<Events.EventResponse[]>("event/posted", user.id);
     if (!response.ok) {
        alert(`Error ${response.message}`);
        return;
      }
      const event = response.data ?? [];
      setPostedevents(event);
  }

  async function geJoinedEvents() {
    const response = await get<Events.EventResponse[]>("join", user.id);
      if (!response.ok) {
        alert(`Error ${response.message}`);
        return;
      }
      const event = response.data ?? [];
      setJoinedevents(event);
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

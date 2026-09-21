import { useEffect, useState } from "react";
import type { Events } from "../Types/Events";
import { useNavigate } from "react-router";
import type { UserNamespace } from "../Types/User";
import { EventsGrid } from "../Components/EventsGrid";
import { get, post } from "../Services/api";
import { getUser } from "../Services/getUser";
import { NavigateButton } from "../Components/NavigateButton";
import { toast } from "react-toastify";


export const Home = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const [user, setUser] = useState<UserNamespace.User | null>(() => {
    const data = getUser();
    return data.id != -1 ? data : null;
  });
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
      toast.error("UnAuthorized user !");
      return;
    }
    try {
      const response = await post("join", eventId, user.id);
      if (response.status != 200) {
        toast.error(`Error:  ${response.message}`);
        return;
      }

      toast.success("Event joined succesfully !");

      setEvents((prevEvent) =>
        prevEvent.map((e) =>
          e.id == eventId ? { ...e, count: e.count + 1 } : e,
        ),
      );
    } catch (error) {
      alert(`Unable to join event ! ${error}`);
    }
  }
  function logOutUser() {
    localStorage.removeItem("userData");
    setUser(null);
    toast.success("User log out succesfully !");
  }
  return (
    <div>
      <div className="h-30 w-full flex items-center justify-center gap-5">
        {user && (
          <NavigateButton
            onClick={() => navigate("/addevent")}
            label="Add Event"
          />
        )}
        {user && (
          <NavigateButton
            onClick={() => navigate("/profile")}
            label="View your Profile"
          />
        )}
        <NavigateButton
          onClick={() => navigate("/upcommingevents")}
          label="View upcomming Events"
        />
        {!user && (
          <NavigateButton onClick={() => navigate("/login")} label="Login" />
        )}
        {user && <NavigateButton onClick={logOutUser} label="Logout" />}
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

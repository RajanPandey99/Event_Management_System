import { useEffect, useState } from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { formatDate } from "../Services/formatDate";
import { ShowEvents } from "../Components/ShowEvents";
import type { Events } from "../Types/Events";
import { get } from "../Services/api";
import { useNavigate } from "react-router";
import { Button } from "../Components/Button";

export const Calander = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);
  const navigate = useNavigate();
  const [currentWeek] = useState<string[]>(() =>{
    const today = new Date();
    const day = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - day);

    const dates: string[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      dates.push(formatDate(date));
    }
   return dates;
  });

  useEffect(() => {
    async function getEvents() {
      const response = await get<Events.EventResponse[]>(`event`);

      if (!response.ok) {
        setEvents([]);
        return;
      }
      setEvents(response.data ?? []);
    }
    getEvents();
  }, []);

  function handleWeek() {
    navigate(`/events/${currentWeek[0]}/${currentWeek[6]}`);
  }

  function handleMonth() {
    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const start = formatDate(startOfMonth);
    const end = formatDate(endOfMonth);
    navigate(`/events/${start}/${end}`);
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <Button onClick={handleWeek} className="w-40 text-black! bg-green-400!">
          Get This weeks Events
        </Button>
        <Button
          onClick={handleMonth}
          className="w-40 text-black! bg-green-400!"
        >
          Get This Months Events
        </Button>
      </div>
      <Calendar
        bordered
        cellClassName={(date) =>
          currentWeek.includes(formatDate(date)) ? "bg-green-400!" : undefined
        }
        onChange={(d) => {
          const date = formatDate(d);
          navigate(`/events/${date}`);
        }}
        renderCell={(date) => {
          const cellDate = formatDate(date);

          return <ShowEvents events={events} date={cellDate} />;
        }}
      />
    </div>
  );
};

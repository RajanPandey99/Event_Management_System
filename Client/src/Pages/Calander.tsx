import { useEffect, useState } from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { formatDate } from "../Services/formatDate";
import { ShowEvents } from "../Components/ShowEvents";
import type { Events } from "../Types/Events";
import { get } from "../Services/api";

export const Calander = () => {
  const [events, setEvents] = useState<Events.EventResponse[]>([]);

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

  return (
    <>
      <Calendar
        bordered
        renderCell={(date) => {
          const cellDate = formatDate(date);

          return <ShowEvents events={events} date={cellDate} />;
        }}
      />
    </>
  );
};

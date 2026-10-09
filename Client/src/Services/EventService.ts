import { toast } from "react-toastify";
import type { Events } from "../Types/Events";
import type { UserNamespace } from "../Types/User";
import { del, post } from "./api";
import { getUser } from "./getUser";
import type { QueryClient } from "@tanstack/react-query";

export async function LeaveEvent(
  eventId: number,
  queryClient: QueryClient,
): Promise<boolean> {
  const user: UserNamespace.User = getUser();

  if (user.id === -1) {
    toast.error("Unauthorized user!");
    return false;
  }

  try {
    const response = await del(`join/${eventId}`, eventId, user.id);

    if (!response.ok) {
      toast.error(`Error: ${response.message}`);
      return false;
    }

    queryClient.setQueryData<Events.EventResponse[]>(
      ["todaysEvents"],
      (oldEvents) =>
        oldEvents?.map((event) =>
          event.id === eventId
            ? { ...event, count: Math.max(0, event.count - 1) }
            : event,
        ),
    );
    toast.success("Event left successfully!");
    return true;
  } catch (error) {
    toast.error(`Unable to leave event! ${error}`);
    return false;
  }
}

export async function JoinEvent(
  eventId: number,
  queryClient: QueryClient,
): Promise<boolean> {
  const user: UserNamespace.User = getUser();

  if (user.id === -1) {
    toast.error("Unauthorized user!");
    return false;
  }

  try {
    const response = await post("join", eventId, user.id);

    if (!response.ok) {
      toast.error(`Error: ${response.message}`);
      return false;
    }

    queryClient.setQueryData<Events.EventResponse[]>(
      ["todaysEvents"],
      (oldEvents) =>
        oldEvents?.map((event) =>
          event.id === eventId ? { ...event, count: event.count + 1 } : event,
        ),
    );

    toast.success("Event joined successfully!");
    return true;
  } catch (error) {
    toast.error(`Unable to join event! ${error}`);
    return false;
  }
}

import { joiResolver } from "@hookform/resolvers/joi";
import type { Events } from "../Types/Events";
import { baseURL } from "../config";
import { useForm } from "react-hook-form";
import { eventRequestSchema } from "../Schemas/EventScheme";

export const AddEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Events.EventRequest>({
    resolver: joiResolver(eventRequestSchema),
  });

  async function onSubmit(obj: Events.EventRequest) {
    const user = localStorage.getItem("userData");
    if (!user) {
      alert("Unauthorize to add Event !");
      return;
    }
    const userData = JSON.parse(user);
    const userId = String(userData.id);
    const response = await fetch(`${baseURL}event`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Id: userId,
        "Content-type": "application/json",
        Origin: window.location.host,
      },
    });
    if (response.status != 200) {
      alert("Unable to post event !");
      return;
    }
    alert("Event posted succesfully !");
  }
  return (
    <div>
      <div className="flex justify-center items-center border-2 bg-blue-600">
        <h2>Add Events</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-65 w-60">
        <label>Title</label>
        <input
          {...register("Title", { required: true })}
          placeholder="ex: football"
          className="border-2 w-full"
        />
        {errors.Title && <p className="text-red-700">{errors.Title.message}</p>}

        <label>Date Of Event</label>
        <input
          type="date"
          {...register("DateOfEvent", { required: true })}
          placeholder="YYYY-MM-DD"
          className="border-2 w-full"
        />
        {errors.DateOfEvent && <p className="text-red-700">{errors.DateOfEvent.message}</p>}

        <label>Time Of Event</label>
        <input
          {...register("TimeOfEvent", { required: true })}
          placeholder="HH:MM:SS"
          className="border-2 w-full"
        />
        {errors.TimeOfEvent && <p className="text-red-700">{errors.TimeOfEvent.message}</p>}

        <label>Category</label>
        <select
          {...register("Category", { required: true })}
          className="border-2 w-full"
        >
          <option value="">Select a category</option>
          <option value="Games">Games</option>
          <option value="Concert">Concert</option>
          <option value="Dance">Dance</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Sports">Sports</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Other">Other</option>
        </select>
        {errors.Category && <p className="text-red-700">{errors.Category.message}</p>}

        <label>Location</label>
        <input
          {...register("Location", { required: true })}
          placeholder="ex: Bhopal"
          className="border-2 w-full"
        />
        {errors.Location && <p className="text-red-700">{errors.Location.message}</p>}

        <label>Description</label>
        <textarea {...register("Description")} className="border-2 w-full" />
        {errors.Description && <p className="text-red-700">{errors.Description.message}</p>}

        <div className="flex justify-center items-center mt-5">
          <button
            type="submit"
            className="h-10 w-35 rounded-2xl bg-blue-500 text-2xl"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

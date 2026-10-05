import { joiResolver } from "@hookform/resolvers/joi";
import type { Events } from "../Types/Events";
import { useForm } from "react-hook-form";
import { eventRequestSchema } from "../Schemas/EventScheme";
import type { ApiResponse } from "../Types/ApiResponse";
import { post } from "../Services/api";
import type { UserNamespace } from "../Types/User";
import { getUser } from "../Services/getUser";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../Components/Button";

export const AddEvent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Events.EventRequest>({
    resolver: joiResolver(eventRequestSchema),
  });
  const user: UserNamespace.User = getUser();
  async function onSubmit(obj: Events.EventRequest) {
    if (user.id == -1) {
      toast.error("Unauthorize to add Event !");
      return;
    }
    const response: ApiResponse.apiresponse<string> = await post(
      "event",
      obj,
      user.id,
    );
    if (response.status != 200) {
      toast.error(`Error ${response.message}`);
      return;
    }
    toast.success("Event posted succesfully !");
    navigate("/upcommingevents");
  }
  return (
    <div>
      <div className="flex justify-center items-center border-2 bg-blue-600">
        <h2>Add Events</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-65 w-60">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("Title", { required: true })}
          placeholder="ex: football"
          className="border-2 w-full"
        />
        {errors.Title && <p className="text-red-700">{errors.Title.message}</p>}

        <label htmlFor="doe">Date Of Event</label>
        <input
          id="doe"
          type="date"
          {...register("DateOfEvent", { required: true })}
          placeholder="YYYY-MM-DD"
          className="border-2 w-full"
        />
        {errors.DateOfEvent && (
          <p className="text-red-700">{errors.DateOfEvent.message}</p>
        )}

        <label htmlFor="toe">Time Of Event</label>
        <input
          id="toe"
          {...register("TimeOfEvent", { required: true })}
          placeholder="HH:MM:SS"
          className="border-2 w-full"
        />
        {errors.TimeOfEvent && (
          <p className="text-red-700">{errors.TimeOfEvent.message}</p>
        )}

        <label htmlFor="category">Category</label>
        <select
          id="category"
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
        {errors.Category && (
          <p className="text-red-700">{errors.Category.message}</p>
        )}

        <label htmlFor="location">Location</label>
        <input
          id="location"
          {...register("Location", { required: true })}
          placeholder="ex: Bhopal"
          className="border-2 w-full"
        />
        {errors.Location && (
          <p className="text-red-700">{errors.Location.message}</p>
        )}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("Description")}
          className="border-2 w-full"
        />
        {errors.Description && (
          <p className="text-red-700">{errors.Description.message}</p>
        )}
        <Button type="submit">Add Event</Button>
      </form>
    </div>
  );
};

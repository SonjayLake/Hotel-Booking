import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="flex gap-4 bg-gray-300 py-4 px-8">
        <label className="text-gray-700  text-sm text-bold flex-1">
          Adults
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            min={1}
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="text-gray-700  text-sm text-bold flex-1">
          Children
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            min={0}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestSection;

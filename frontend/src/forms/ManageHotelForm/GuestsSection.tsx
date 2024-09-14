import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Guests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.adultCount ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            min={0}
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.childCount ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;

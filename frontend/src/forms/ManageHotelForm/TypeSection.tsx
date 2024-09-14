import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer rounded-full px-4 py-2 font-semibold text-center transition-colors duration-300 ${
              typeWatch === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-300"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <div className="text-red-500 text-sm mt-2 text-center">
          {errors.type.message}
        </div>
      )}
    </div>
  );
};

export default TypeSection;

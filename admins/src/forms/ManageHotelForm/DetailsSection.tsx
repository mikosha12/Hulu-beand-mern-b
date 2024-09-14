import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => { 
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Hotel</h1>
      <label className="block text-gray-700 text-sm font-bold">
        Name
        <input
          type="text"
          placeholder="Enter hotel name"
          className={`border rounded w-full py-2 px-3 mt-1 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="block text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            placeholder="Enter city"
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 text-sm mt-1">{errors.city.message}</span>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            placeholder="Enter country"
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 text-sm mt-1">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="block text-gray-700 text-sm font-bold">
        Description
        <textarea
          placeholder="Enter hotel description"
          rows={5}
          className={`border rounded w-full py-2 px-3 mt-1 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="block text-gray-700 text-sm font-bold flex-1">
          Price Per Night
          <input
            type="number"
            min={1}
            placeholder="Enter price per night"
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.pricePerNight ? "border-red-500" : "border-gray-300"
            }`}
            {...register("pricePerNight", { required: "This field is required" })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-sm mt-1">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold flex-1">
          Star Rating
          <select
            className={`border rounded w-full py-2 px-3 mt-1 ${
              errors.starRating ? "border-red-500" : "border-gray-300"
            }`}
            {...register("starRating", { required: "This field is required" })}
          >
            <option value="" className="text-gray-500">Select Star Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && "s"}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-sm mt-1">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;

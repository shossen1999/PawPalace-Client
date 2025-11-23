import Select from 'react-select';
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const petCategories = [
  { value: 'Dog', label: 'Dog' },
  { value: 'Cat', label: 'Cat' },
  { value: 'Bird', label: 'Bird' },
  { value: 'Rabbit', label: 'Rabbit' },
  { value: 'Fish', label: 'Fish' }
];

const purposes = [
  { value: 'pet', label: 'Pet Only' },
  { value: 'sell', label: 'For Sale' }
];

// Vaccination options by category
const vaccinationOptions = {
  Dog: [
    { value: "Rabies", label: "Rabies" },
    { value: "Canine Distemper Virus", label: "Canine Distemper Virus" },
    { value: "Canine Adenovirus (Hepatitis)", label: "Canine Adenovirus (Hepatitis)" },
    { value: "Canine Parvovirus", label: "Canine Parvovirus" },
    { value: "Canine Parainfluenza Virus", label: "Canine Parainfluenza Virus" },
    { value: "Bordetella (Kennel Cough)", label: "Bordetella (Kennel Cough)" },
    { value: "Leptospirosis", label: "Leptospirosis" },
    { value: "Canine Influenza", label: "Canine Influenza" },
    { value: "Lyme Disease", label: "Lyme Disease" }
  ],
  Cat: [
    { value: "Rabies", label: "Rabies" },
    { value: "Feline Viral Rhinotracheitis (FHV-1)", label: "Feline Viral Rhinotracheitis (FHV-1)" },
    { value: "Feline Calicivirus (FCV)", label: "Feline Calicivirus (FCV)" },
    { value: "Feline Panleukopenia (FPV)", label: "Feline Panleukopenia (FPV)" },
    { value: "Feline Leukemia Virus (FeLV)", label: "Feline Leukemia Virus (FeLV)" },
    { value: "Feline Immunodeficiency Virus (FIV)", label: "Feline Immunodeficiency Virus (FIV)" },
    { value: "Chlamydophila felis", label: "Chlamydophila felis" }
  ],
  Rabbit: [
    { value: "Myxomatosis", label: "Myxomatosis" },
    { value: "Rabbit Haemorrhagic Disease (RHDV1 & RHDV2)", label: "Rabbit Haemorrhagic Disease (RHDV1 & RHDV2)" }
  ],
  Bird: [
    { value: "Avian Polyomavirus (rare cases)", label: "Avian Polyomavirus (rare cases)" },
    { value: "Pigeon Pox (specific species)", label: "Pigeon Pox (specific species)" }
  ],
  Fish: [] // no vaccinations
};

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      vaccinations: [{ vaccineType: null, date: "" }]
    }
  });

  const selectedCategory = watch("category");
  const selectedPurpose = watch("purpose");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "vaccinations"
  });

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  // --- NEW: filter out already selected vaccines so duplicates cannot be chosen ---
  const getFilteredVaccines = (index) => {
    // Get current selected vaccine values (strings) for all rows
    const allVaccinations = watch("vaccinations") || [];
    const selectedVaccines = allVaccinations
      .map(v => v?.vaccineType?.value)
      .filter(Boolean);

    const optionsForCategory = vaccinationOptions[selectedCategory] || [];

    // Allow the currently selected value in this row (so it doesn't disappear while editing)
    const currentValue = watch(`vaccinations.${index}.vaccineType`)?.value;

    return optionsForCategory.filter(vaccine =>
      // keep vaccine if it's not selected elsewhere OR it's the current value for this row
      !selectedVaccines.includes(vaccine.value) || vaccine.value === currentValue
    );
  };
  // -------------------------------------------------------------------------------

  const onSubmit = async (data) => {
    if (!user) return Swal.fire("Error", "You must be logged in to add a pet.", "error");
    if (!data.category) return Swal.fire("Error", "Please select a category.", "error");
    if (!data.purpose) return Swal.fire("Error", "Please select a purpose.", "error");

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const uploadRes = await axiosPublic.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = uploadRes.data.data.display_url;

      // Filter out empty vaccinations
      const vaccinationsArray = (data.vaccinations || [])
        .filter(v => v.vaccineType && v.date)
        .map(v => ({ vaccineType: v.vaccineType.value, date: v.date }));

      // Prepare pet data
      const petData = {
        email: user.email,
        pet_image: imageUrl,
        pet_name: data.name,
        pet_age: parseInt(data.age),
        pet_category: data.category,
        pet_location: data.location,
        short_description: data.shortDescription,
        long_description: data.longDescription,
        vaccinations: vaccinationsArray,
        purpose: data.purpose,
        adopted: false,
        dateAdded: new Date().toLocaleDateString('en-US'),
        ...(data.purpose === 'sell' && { price: parseFloat(data.price) })
      };

      const petRes = await axiosPublic.post('/pet', petData);

      if (petRes.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Pet has been added successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        // optionally reset form or replace vaccinations with a fresh one
        replace([{ vaccineType: null, date: "" }]);
      } else {
        throw new Error("Pet submission failed.");
      }
    } catch (error) {
      console.error("Error submitting pet data:", error);
      Swal.fire("Error", "Failed to add pet. Try again later.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-semibold mb-4 text-center">Add A Pet</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 bg-white shadow-lg rounded-lg">
          <div className="grid grid-cols-2 gap-4">

            {/* Pet Image */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Pet Image</label>
              <input type="file" accept="image/*" {...register('image', { required: 'Pet image is required' })} className="w-full px-3 py-1.5 border rounded" />
              {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
            </div>

            {/* Pet Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Pet Name</label>
              <input {...register('name', { required: 'Pet name is required' })} className="w-full px-3 py-1.5 border rounded" />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>

            {/* Pet Age */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Pet Age</label>
              <input type="number" {...register('age', { required: 'Pet age is required' })} className="w-full px-3 py-1.5 border rounded" />
              {errors.age && <p className="text-red-500 text-xs italic">{errors.age.message}</p>}
            </div>

            {/* Pet Category */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Pet Category</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Pet category is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={petCategories}
                    className="w-full"
                    onChange={(option) => field.onChange(option.value)}
                    value={petCategories.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
            </div>

            {/* Pet Purpose */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Pet Purpose</label>
              <Controller
                name="purpose"
                control={control}
                rules={{ required: 'Pet purpose is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={purposes}
                    className="w-full"
                    onChange={(option) => field.onChange(option.value)}
                    value={purposes.find(option => option.value === field.value)}
                  />
                )}
              />
              {errors.purpose && <p className="text-red-500 text-xs italic">{errors.purpose.message}</p>}
            </div>

            {/* Price (only for sale) */}
            {selectedPurpose === 'sell' && (
              <div className="col-span-2">
                <label className="block text-gray-700 font-bold mb-1">Price (USD)</label>
                <input type="number" {...register('price', { required: 'Price is required when selling' })} className="w-full px-3 py-1.5 border rounded" placeholder="Enter price in USD" />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price.message}</p>}
              </div>
            )}

            {/* Vaccinations */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Vaccinations</label>
              {fields.map((fieldItem, index) => {
                const isFirstRow = index === 0;
                return (
                  <div key={fieldItem.id} className="flex items-center gap-2 mb-2">
                    {/* Vaccine Type */}
                    <Controller
                      name={`vaccinations.${index}.vaccineType`}
                      control={control}
                      rules={{ required: 'Vaccine type is required' }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={getFilteredVaccines(index)}
                          placeholder="Select Vaccine"
                          onChange={(selected) => field.onChange(selected)}
                          value={field.value}
                          className="w-1/2"
                        />
                      )}
                    />

                    {/* Date */}
                    <input
                      type="date"
                      {...register(`vaccinations.${index}.date`, { required: 'Date is required' })}
                      className="w-1/4 px-3 py-1.5 border rounded"
                    />

                    {/* Buttons */}
                    {isFirstRow ? (
                      <>
                        <button
                          type="button"
                          onClick={() => append({ vaccineType: null, date: "" })}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => replace([{ vaccineType: null, date: "" }])}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded"
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        -
                      </button>
                    )
                    }
                  </div>
                );
              })}
            </div>

            {/* Pet Location */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Pet Location</label>
              <input {...register('location', { required: 'Pet location is required' })} className="w-full px-3 py-1.5 border rounded" />
              {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Short Description</label>
              <input {...register('shortDescription', { required: 'Short description is required' })} className="w-full px-3 py-1.5 border rounded" />
              {errors.shortDescription && <p className="text-red-500 text-xs italic">{errors.shortDescription.message}</p>}
            </div>

            {/* Long Description */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Long Description</label>
              <textarea {...register('longDescription', { required: 'Long description is required' })} className="w-full px-3 py-1.5 border rounded h-24 resize-none" />
              {errors.longDescription && <p className="text-red-500 text-xs italic">{errors.longDescription.message}</p>}
            </div>

          </div>

          <button type="submit" className="w-full mt-4 bg-[#F07C3D] text-white font-bold py-2 px-4 rounded hover:bg-[#f3732e]">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;

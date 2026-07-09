import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function CreateProperty() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [descriptionList, setDescriptionList] = useState([]);
  const [currentDescription, setCurrentDescription] = useState("");

  const AddDescription = (e) => {
    e.preventDefault();

    if (currentDescription.trim() === "") return;

    if (!descriptionList.includes(currentDescription.trim())) {
      setDescriptionList([...descriptionList, currentDescription.trim()]);
    }
    setCurrentDescription("");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("price", data.price);
      formData.append("description", JSON.stringify(descriptionList));

      if (data.propertyImages && data.propertyImages.length > 0) {
        const maxImages = data.propertyImages.slice(0, 5);

        maxImages.forEach((image) => {
          formData.append("propertyImages[]", image);
        });
      }

      const response = await fetch(
        "http://localhost:8000/property/create-post",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/user/login");
        setDescriptionList([]);
        reset();
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Frontend API Call Error to Server, see console");
      console.log("Error", error);
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl mb-4">
        Advertise Your Property
      </h1>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md lg:gap-2 gap-1 p-6 rounded-md bg-blue-300 flex flex-col"
      >
        <label className="font-bold">Title</label>
        <input
          className="border border-gray-300 bg-amber-50 px-3"
          type="text"
          {...register("title")}
          placeholder="e.g: BUNGALOW ON SELL | RENT NEAR XYZ PLACE"
        />
        <label className="font-bold mt-3">Description</label>
        <input
          className="border border-gray-300 bg-amber-50 px-3"
          type="text"
          value={currentDescription}
          onChange={(e) => setCurrentDescription(e.target.value)}
          placeholder="6 rooms, 1000 YARDS, IDEAL FOR OFFICES"
        />
        <button
          type="button"
          onClick={AddDescription}
          className="bg-blue-500 text-white font-bold mt-3 mx-auto w-1/2 px-auto rounded-md hover:bg-gray-600"
        >
          Add
        </button>

        <ol>
          {descriptionList.map((des, index) => (
            <li
              key={index}
              className="border rounded-4xl border-blue-600 bg-blue-800 px-3 mt-1 font-bold text-white"
            >
              {des}
            </li>
          ))}
        </ol>

        <label className="font-bold mt-3">Location</label>
        <input
          className="border border-gray-300 bg-amber-50 px-3"
          type="text"
          {...register("location")}
          placeholder="Clifton - Block 5, Karachi"
        />
        <label className="font-bold mt-3">Price</label>
        <input
          className="border border-gray-300 bg-amber-50 px-3"
          type="text"
          {...register("price")}
          placeholder="RS 20 Lacs"
        />
        <label className="font-bold mt-3">Property Images</label>
        <input
          className="border border-gray-300 bg-amber-50 px-3"
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp"
          {...register("propertyImages")}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold mt-3 mx-auto w-1/2 px-auto rounded-md hover:bg-gray-600"
        >
          Post Ad
        </button>
      </form>
    </>
  );
}

export default CreateProperty;

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../Components/ImageUpload"; 
import { LoadingContext, useLoading } from "../store/LoadingContext";

const AddServices = () => {
  //const [isLoading, setIsLoading] = useContext(LoadingContext)
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [food, setFood] = useState()
  const [showAddOns,setShowAddOns] = useState(false)

  const [data, setData] = useState({
    name: '',
    price: '',
    category: '',
    subCategoryId: '',
    description: '',
    cookingTime: '',
    litre : '',
    addOns : [],
    quantity : '',
    image: null
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setData({
        ...data,
        image: file
      });
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity' && value < 0) {
      toast('Quantity cannot be less tha 0');
      return; 
    }if (name === 'cookingTime' && value < 0) {
      toast('Cooking time cannot be less than 0');
      return; 
    }
  
    setData({
      ...data,
      [name]: value
    });
  };

 

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         dispatch(loader());
//         const res = await getSubcategory();
//         setFood(res.data.response.addOns)
//         setAllSubcategory(res.data.response.response);
//         dispatch(loader());
//       } catch (error) {
//         dispatch(loader());
//         toast('Error while fetching Subcategory');
//       }
//     };
//     getData();
//   }, [dispatch]);

 
  

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(loader());
//     if (!data.name) {
//       dispatch(loader());
//       return toast('Food name is required');
//     } else if (!data.price) {
//       dispatch(loader());
//       return toast('Price is required');
//     } else if (!data.category) {
//       dispatch(loader());
//       return toast('Category is required');
//     } else if (!data.subCategoryId) {
//       dispatch(loader());
//       return toast('Subcategory is required');
//     } else if (!data.description) {
//       dispatch(loader());
//       return toast('Description is required');
//     } else if (!data.cookingTime) {
//       dispatch(loader());
//       return toast('Cooking time is required');
//     } else if (!data.image) {
//       dispatch(loader());
//       return toast('Image is required');
//     }
//     let img;
//     try {
//       img = await uploadImageV2(data.image);
//     } catch (error) {
//       setImagePreview(null)
//       setData({
//         ...data,
//         image: null
//       });
//       dispatch(loader());
      
//       return toast('Error while upload image.')
//     }
    
//     if(typeof img.images[0].imageUrl != 'string'){
//       setImagePreview(null)
//       dispatch(loader());
//       setData({
//         ...data,
//         image: null
//       });
//       return toast('Error while upload image.')
//     }
    
//     data.image = img.images[0].imageUrl
//     try {
      
//       const res = await AddFood(data);
//       setData({
//         name: '',
//         price: '',
//         category: '',
//         subCategoryId: '',
//         description: '',
//         cookingTime: '',
//         litre : '',
//         addOns : [],
//         quantity : '',
//         image: null
//       })
//       setImagePreview(null)
//       setSubCategories([])
//       dispatch(loader());
//       toast('Food item added successfully');
      
//     } catch (error) {
//       setData({
//         name: '',
//         price: '',
//         category: '',
//         subCategoryId: '',
//         description: '',
//         cookingTime: '',
//         litre : '',
//         addOns : [],
//         quantity : '',
//         image: null
//       })
//       setImagePreview(null)
//       setSubCategories([])
//       dispatch(loader());
//       console.error('Error adding food item', error.response.data);
//       toast(error.response.data.message);
     
//     }
//   };

  const handleInputClick = () => {
    setShowAddOns(true);
  };

  return (
    <div>
      <div className="w-full bg-[#0A0A0B] flex justify-center h-full rounded-xl min-h-[600px] shadow-sm p-4">
        <div className="lg:max-w-[80%] items-center justify-center w-full">
          <div className="w-full flex justify-center">
            <p className="text-white text-2xl font-semibold">Add Food Item</p>
          </div>
          <form>
            <div className="flex justify-center items-center rounded-lg mb-5">
              <div className="w-full p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                  <div className="flex flex-col mt-4">
                    <input
                      className="bg-[#151515] p-2 rounded-lg"
                      type="text"
                      placeholder="Food name"
                      name="name"
                      value={data.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <select
                      className="bg-[#151515] p-2 rounded-lg text-slate-400"
                      name="category"
                    //   onChange={handleCategoryChange}
                      id="category-select"
                      value={data.category}
                      
                    >
                     {data.category === '' && <option value="" hidden>Category</option>}
                      <option value="Veg">Veg</option>
                      <option value="Non Veg">Non Veg</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div className="flex flex-col mt-4">
                    <select
                      className="bg-[#151515] p-2 rounded-lg text-slate-400"
                      name="subCategoryId"
                      onChange={handleInputChange}
                      
                    >
                      {!data.category.length && <option value="">Please Select Category first</option>}
                      {data.subCategoryId == '' && <option value="" hidden>Subcategory</option>}
                      {subCategories.length ? subCategories.map((subCategory, i) => (
                        <option key={i} value={subCategory._id}>{subCategory.name}</option>
                      )) : (
                        <option disabled>No Subcategories found under this category</option>
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      className="bg-[#151515] p-2 rounded-lg"
                      type="text"
                      value={data.price}
                      placeholder="Price"
                      name="price"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      className="bg-[#151515] p-2 rounded-lg  "
                      type="text"
                      value={data.cookingTime}
                      placeholder="Cooking Time"
                      name="cookingTime"
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="flex flex-col mt-4">
                    <input
                      className="bg-[#151515] p-2 rounded-lg no-spinner"
                      type="number"
                      value={data.quantity}
                      placeholder="Quantity"
                      name="quantity"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      className="bg-[#151515] p-2 rounded-lg"
                      type="number"
                      placeholder="Litre"
                      name="litre"
                      value={data.litre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col mt-4 col-span-2 relative">
      {/* <label className="text-white mb-2">AddOns</label> */}
      <input
        className="bg-[#151515] p-2 rounded-lg mb-2"
        type="text"
        value={data.addOns.map((addOn) => addOn.productName).join(", ")}
        placeholder="Select AddOns"
        readOnly
        onClick={handleInputClick}
      />
      {showAddOns && (
        <div className="absolute top-full mt-2 bg-[#151515] p-4 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10 w-full">
          {food.map((addOn) => (
            <label
              key={addOn._id}
              className="text-slate-400 flex items-center my-3"
            >
              <img src={addOn.image} className="w-7 h-7 mr-3 rounded-full" alt="" />
               {addOn.productName}
              <input
                type="checkbox"
                value={addOn._id}
                checked={data.addOns.some(
                  (selected) => selected._id === addOn._id
                )}
                onChange={(e) => handleAddOnChange(e, addOn)}
                className="mr-2 ml-auto"
              />
             
            </label>
          ))}
          <button
            className="bg-gray-500/5 text-yellow-300 p-2 rounded-lg ml-28 mt-2 w-2/5"
            onClick={()=>{setShowAddOns(false)}}
          >
            Add Item
          </button>
        </div>
      )}
    </div>
  
                </div>
                <div className="w-full mt-4">
                  <textarea
                    className="bg-[#151515] p-2 rounded-lg w-full text-gray-300"
                    placeholder="Type Description Here"
                    name="description"
                    value={data.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mt-4 md:px-20">
                  <div className="flex flex-col items-center p-2 md:p-10 border-dashed border border-yellow-300 bg-[#151515] rounded-lg shadow-md">
                    <label
                      htmlFor="fileInput"
                      className="text-pink-600 p-2 rounded-full mb-2 cursor-pointer"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Selected" className="max-w-full h-auto" />
                      ) : (
                        <svg
                          width="64"
                          height="48"
                          viewBox="0 0 64 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M51.944 18.912C51.3787 8.376 42.6827 0 32 0C21.32 0 12.6213 8.376 12.056 18.912C5.20267 20.1467 0 26.128 0 33.3333C0 41.432 6.568 48 14.6667 48H49.3333C57.432 48 64 41.432 64 33.3333C64 26.128 58.7973 20.1467 51.944 18.912ZM32 16L42.6667 26.6667H34.6667V37.3333H29.3333V26.6667H21.3333L32 16Z"
                            fill="#FFDD11"
                          />
                        </svg>
                      )}
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      name="image"
                      onChange={handleFileChange}
                    />
                    <p className="text-white font-semibold">
                      {data.image ? 'Edit Your Dropped ' : ' Drop your'} image here{" "}
                      <span
                        id="browseLink"
                        className="text-yellow-500 cursor-pointer"
                        onClick={handleBrowseClick}
                      >
                        Browse
                      </span>
                    </p>
                    <p className="text-sm text-zinc-500">
                      Support: JPG, JPEG, PNG
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-black p-2 px-6 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddServices;

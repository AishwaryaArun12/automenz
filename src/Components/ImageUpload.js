import { getStorage, ref, uploadBytes } from "firebase/storage";


export const uploadImage = async (imageFile) => {
    const storage = getStorage();
const storageRef = ref(storage, 'some-child');  
    try {
      console.log("imageFile in upload image:", imageFile);
      const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 

uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
      return response.data;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
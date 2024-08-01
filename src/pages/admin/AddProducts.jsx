//   import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { db, storage } from '../../firebase/config';
// import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const AddProducts = () => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     price: '',
//     category: '',
//     image: null,
//     date: '',
//     color: '',
//     os: '',
//     cpu: '',
//     gpu: '',
//     storageCapacity: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? files[0] : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { productName,  price, category, image, date , color , os , cpu , gpu , storageCapacity} = formData;
//       if (!image) {
//         toast.error('Please upload an image.');
//         setLoading(false);
//         return;
//       }

//       // Create a reference to the file in Firebase Storage
//       const storageRef = ref(storage, `productImages/${Date.now()}_${image.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, image);

//       uploadTask.on(
//         'state_changed',
//         null,
//         (error) => {
//           toast.error('Image upload failed');
//           setLoading(false);
//           console.error('Image upload error:', error);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             console.log('Image uploaded, download URL:', downloadURL); // Log the download URL

//             // Check the formData before sending to Firestore
//             console.log('Form Data:', {
//               title: productName,
//               price: price,
//               category: category,
//               imgUrl: downloadURL,
//               date: date,
//               color: color,
//               os: os,
//               cpu: cpu,
//               gpu: gpu,
//               storageCapacity: storageCapacity
//             });

//             const docRef = collection(db, 'products');
//             await addDoc(docRef, {
//               title: productName,
//               price: price,
//               category: category,
//               imgUrl: downloadURL,
//               date: date,
//               color: color,
//               os: os,
//               cpu: cpu,
//               gpu: gpu,
//               storageCapacity: storageCapacity
//             });

//             toast.success('Product added successfully!');
//             navigate("/dashboard/all-products")
//           } catch (error) {
//             toast.error('Failed to add product.');
//             console.error('Firestore error:', error); 
//           } finally {
//             setLoading(false);
//           }
//         }
//       );
//     } catch (error) {
//       toast.error('An error occurred.');
//       console.error('Form submission error:', error); 
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="productName">Product Name</label>
//           <input
//             type="text"
//             id="productName"
//             name="productName"
//             value={formData.productName}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="Laptop">Laptop</option>
//             <option value="Phone">Phone</option>
//             <option value="Desktop">Desktop</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="image">Product Image</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="color">Color</label>
//           <input
//             type="text"
//             id="color"
//             name="color"
//             value={formData.color}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="os">Operating System</label>
//           <input
//             type="text"
//             id="os"
//             name="os"
//             value={formData.os}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="cpu">CPU</label>
//           <input
//             type="text"
//             id="cpu"
//             name="cpu"
//             value={formData.cpu}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="gpu">GPU</label>
//           <input
//             type="text"
//             id="gpu"
//             name="gpu"
//             value={formData.gpu}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2" htmlFor="storageCapacity">Storage</label>
//           <input
//             type="text"
//             id="storageCapacity"
//             name="storageCapacity"
//             value={formData.storageCapacity}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={loading}
//           >
//             {loading ? 'Adding Product...' : 'Add Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//     );
// }

// export default AddProducts;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/config';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    image: null,
    date: '',
    color: '',
    os: '',
    cpu: '',
    gpu: '',
    storageCapacity: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { productName, price, category, image, date, color, os, cpu, gpu, storageCapacity } = formData;
      if (!image) {
        toast.error('Please upload an image.');
        setLoading(false);
        return;
      }

      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `productImages/${Date.now()}_${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          toast.error('Image upload failed');
          setLoading(false);
          console.error('Image upload error:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const docRef = collection(db, 'products');
            await addDoc(docRef, {
              title: productName,
              price: price,
              category: category,
              imgUrl: downloadURL,
              date: date,
              color: color,
              os: os,
              cpu: cpu,
              gpu: gpu,
              storageCapacity: storageCapacity
            });

            toast.success('Product added successfully!');
            navigate("/dashboard/all-products")
          } catch (error) {
            toast.error('Failed to add product.');
            console.error('Firestore error:', error);
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      toast.error('An error occurred.');
      console.error('Form submission error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Görüntü önizlemesi"
                className="w-full max-w-xs h-auto object-cover border border-gray-300 rounded-md"
              />
            </div>
          )}
          <label className="block text-gray-700 mb-2" htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Desktop">Desktop</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="os">Operating System</label>
          <input
            type="text"
            id="os"
            name="os"
            value={formData.os}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cpu">CPU</label>
          <input
            type="text"
            id="cpu"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="gpu">GPU</label>
          <input
            type="text"
            id="gpu"
            name="gpu"
            value={formData.gpu}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="storageCapacity">Storage</label>
          <input
            type="text"
            id="storageCapacity"
            name="storageCapacity"
            value={formData.storageCapacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;

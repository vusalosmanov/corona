import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/config';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { productName, description, price, category, image } = formData;
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
              desc: description,
              price: price,
              category: category,
              imgUrl: downloadURL
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
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

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div>
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

        <div>
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
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div>
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

        <button
          type="submit"
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 px-4 rounded-md hover:bg-blue-600 transition ease-in-out duration-150`}
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;

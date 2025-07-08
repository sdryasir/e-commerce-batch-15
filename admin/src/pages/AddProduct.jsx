import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    brand: '',
    price: '',
    discountPrice: '',
    stock: '',
    sku: '',
    tags: '',
    colors: '',
    sizes: [],
    rating: '',
    reviewsCount: '',
    isFeatured: false,
    isActive: true,
    category: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'sizes') {
      const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
      setFormData({ ...formData, sizes: options });
    } else if (name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/categories');
      const result = await res.json();
      setCategories(result);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('slug', formData.slug);
    form.append('description', formData.description);
    form.append('brand', formData.brand);
    form.append('price', parseFloat(formData.price));
    form.append('discountPrice', parseFloat(formData.discountPrice));
    form.append('stock', parseInt(formData.stock));
    form.append('sku', formData.sku);
    form.append('rating', parseFloat(formData.rating));
    form.append('reviewsCount', parseInt(formData.reviewsCount));
    form.append('isFeatured', formData.isFeatured);
    form.append('isActive', formData.isActive);
    form.append('category', formData.category);
    form.append('image', formData.image);

    // Append tags and colors as comma-separated string or individual items
    formData.tags.split(',').map(tag => form.append('tags[]', tag.trim()));
    formData.colors.split(',').map(color => form.append('colors[]', color.trim()));
    formData.sizes.forEach(size => form.append('sizes[]', size));

    try {
      const res = await fetch('http://localhost:3000/products/new', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      console.log('Success:', result);
      alert('Product successfully added!');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting form');
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-5" encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Slug</label>
            <input type="text" name="slug" className="form-control" value={formData.slug} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} rows={3}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Category</label>
          <select className='form-select' name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select</option>
            {
              categories && categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input type="text" name="brand" className="form-control" value={formData.brand} onChange={handleChange} />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Price</label>
            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Discount Price</label>
            <input type="number" name="discountPrice" className="form-control" value={formData.discountPrice} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Stock</label>
            <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">SKU</label>
            <input type="text" name="sku" className="form-control" value={formData.sku} onChange={handleChange} />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Rating</label>
            <input type="number" step="0.1" max="5" name="rating" className="form-control" value={formData.rating} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Reviews Count</label>
            <input type="number" name="reviewsCount" className="form-control" value={formData.reviewsCount} onChange={handleChange} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Sizes (Ctrl+Click to select multiple)</label>
            <select name="sizes" className="form-control" multiple value={formData.sizes} onChange={handleChange}>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input type="text" name="tags" className="form-control" value={formData.tags} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Colors (comma separated)</label>
          <input type="text" name="colors" className="form-control" value={formData.colors} onChange={handleChange} />
        </div>

        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
          <label className="form-check-label">Featured Product</label>
        </div>

        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
          <label className="form-check-label">Active</label>
        </div>

        <button type="submit" className="btn btn-primary">Submit Product</button>
      </form>
    </main>
  );
}

export default AddProduct;

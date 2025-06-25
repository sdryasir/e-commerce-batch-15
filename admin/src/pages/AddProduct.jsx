import React, { useState } from 'react';

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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'sizes') {
      const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
      setFormData({ ...formData, sizes: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      colors: formData.colors.split(',').map(color => color.trim()),
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating),
      reviewsCount: parseInt(formData.reviewsCount),
    };


    try {
      const res = await fetch('http://localhost:3000/products/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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

      <form onSubmit={handleSubmit} className="mb-5">
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

import React, { useState } from 'react';

function AddCategory() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: null
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;


    if(name == 'name'){
      setForm({ ...form, slug: titleToSlug(value) });
    }

    
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('slug', form.slug);
    formData.append('description', form.description);
    formData.append('image', form.image);

    

    try {
      const res = await fetch('http://localhost:3000/categories/new', {
        method: 'POST',
        body: formData,
      });

      setMessage('✅ Category created successfully!');
      setForm({ name: '', slug: '', description: '', image: null });
      e.target.reset(); 
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || error.message));
    }
  };


  function titleToSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')       // Remove non-word characters
      .replace(/[\s_-]+/g, '-')       // Replace spaces/underscores with dash
      .replace(/^-+|-+$/g, '');       // Remove leading/trailing dashes
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Add New Category</h1>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <form className='w-50' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Slug (Unique)</label>
          <input
            type="text"
            name="slug"
            className="form-control"
            value={form.slug}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
          ></textarea>
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

        <button type="submit" className="btn btn-primary">
          Create Category
        </button>
      </form>
    </main>
  );
}

export default AddCategory;

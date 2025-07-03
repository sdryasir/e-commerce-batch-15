import React, {useState, useEffect} from 'react'
import { Link } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
function Categories() {


  const [categories, setCategories] = useState([])
  
      const getAllCategories = async ()=>{
          const categories = await fetch('http://localhost:3000/categories');
          const data = await categories.json();        
          setCategories(data);
      }
  
      useEffect(()=>{
          getAllCategories();
      }, [])

       const notify = (msg) => toast(msg);

      const handleDelete = async (id, publicId)=>{



      const response = await fetch(`http://localhost:3000/delete/categories/${id}?publicId=${publicId}`,{
        method: 'DELETE',
      });


      console.log("response", response);
      

      if(response.ok){
        notify("Record has been deleted");
        setTimeout(()=>{
          window.location.reload();
        }, 3000)
      }else{
        notify("Error in deleting Product");
      }
      
    }



  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Categories</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={'/admin/categories/add'} type="button" className="btn btn-sm btn-outline-secondary">
            Add Category
          </Link>
        </div>
      </div>
      <ToastContainer />
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Desc</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) =>(
                <tr>
                  <td>{index+1}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td>
                    <img style={{width:'100px'}} src={category.image.secure_url} alt="" />
                  </td>
                  <td>
                          <div className="d-flex justify-content-end">
                            <a className="btn btn-sm btn-info me-1" href="#" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><i className="bi bi-box-arrow-up-right"></i></a>
                            <a className="btn btn-sm btn-warning me-1" href="#"><i className="bi bi-pencil-square"></i></a>
                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(category._id, category.image.public_id)}><i className="bi bi-trash3"></i></button>
                          </div>
                        </td>
                </tr>
              ))
            }
            
           
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
      </div>
    </main>
  )
}

export default Categories
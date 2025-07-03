import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router';

function Products() {
    const [products, setProducts] = useState([])

    const getAllProducts = async ()=>{
        const products = await fetch('http://localhost:3000/products');
        const data = await products.json();        
        setProducts(data);
    }

    useEffect(()=>{
        getAllProducts();
    }, [])


    const notify = (msg) => toast(msg);


    const handleDelete = async (id)=>{

      const response = await fetch(`http://localhost:3000/products/${id}`,{
        method: 'DELETE',
      });

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
        <h1 className="h2">Products</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={'/admin/products/add'} type="button" className="btn btn-sm btn-outline-secondary">
            Add Product
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
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {
                products.map((product, index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <a className="btn btn-sm btn-info me-1" href="#" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><i className="bi bi-box-arrow-up-right"></i></a>
                            <a className="btn btn-sm btn-warning me-1" href="#"><i className="bi bi-pencil-square"></i></a>
                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(product._id)}><i className="bi bi-trash3"></i></button>
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


   
<div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="staticBackdropLabel">Manage User Details</h5>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
      <div>
        <div className="card mb-3 border-0">
          <div className="row g-0">
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{width: '120px'}}  alt="Avatar" />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h5 className="card-title">Yasir Ali</h5>
                <p className="card-text">Student | Active</p>
                <p className="card-text"><small className="text-body-secondary">Registered 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="tabs-wrapper px-4">
                <ul className="nav nav-underline mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, sed repudiandae? Architecto.
                  </div>
                  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta perferendis, reprehenderit maxime non illo nostrum ullam placeat a pariatur facere, porro harum assumenda voluptate dolore natus enim veniam rerum sunt!
                  </div>
                  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </main>
  )
}

export default Products
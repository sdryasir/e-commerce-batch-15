import React from 'react'
import { Link } from 'react-router'
function Categories() {
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

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Desc</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Slug</td>
              <td>Desc</td>
              <td>Image</td>
            </tr>
           
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
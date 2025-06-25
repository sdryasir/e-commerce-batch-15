import React from 'react'
import { Link } from 'react-router'

function Sidebar() {
  return (
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/">
              <span data-feather="home" class="align-text-bottom"></span>
              Dashboard 
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/admin/categories">
              <span data-feather="users" class="align-text-bottom"></span>
              Categories
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/admin/products">
              <span data-feather="users" class="align-text-bottom"></span>
              Products
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./users.html">
              <span data-feather="users" class="align-text-bottom"></span>
              Users
            </a>
          </li>
        </ul>

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
          <span>Reports</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" class="align-text-bottom"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="file-text" class="align-text-bottom"></span>
              Current month
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
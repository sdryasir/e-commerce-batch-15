import React, { useEffect } from 'react'


function FeaturedProduct() {

    const [products, setProducts] = React.useState([])

    useEffect(()=>{
        const getAllProducts = async ()=>{
            const res = await fetch('http://localhost:3000/products');
            const data = await res.json();
            setProducts(data); 
        }
        getAllProducts();
    },[])

  return (
    <div class="container-fluid pt-5 pb-3">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Featured Products</span></h2>
        <div class="row px-xl-5">

            {
            products.length ===0? <p>No Products Found</p>:
            products.map((product, index) =>(
                <div key={index} class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src={product.image.secure_url} alt=""/>
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none" href="">{product.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>PKR. {product.discountPrice}</h5><h6 class="text-muted ml-2"><del>PKR. {product.price}</del></h6>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default FeaturedProduct
import React, {useState, useEffect} from 'react'

function Categories() {


    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
        const getAllCategories = async ()=>{
            const res = await fetch('http://localhost:3000/categories');
            const data = await res.json();
            setCategories(data); 
        }
        getAllCategories();
    },[])

  return (
    <div class="container-fluid pt-5">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Categories</span></h2>
        <div class="row px-xl-5 pb-3">

            {
                categories?.map((category, index) => (
                    <div key={index} class="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a class="text-decoration-none" href="">
                            <div class="cat-item d-flex align-items-center mb-4">
                                <div class="overflow-hidden" style={{width: '100px', height: '100px'}}>
                                    <img class="img-fluid" src={category.image.secure_url} alt=""/>
                                </div>
                                <div class="flex-fill pl-3">
                                    <h6>{category.name}</h6>
                                    <small class="text-body">{category.productCount} Products</small>
                                </div>
                            </div>
                        </a>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default Categories
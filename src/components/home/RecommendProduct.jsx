import React, { useState, useEffect } from 'react'
import './RecommendProduct.module.css'
import { Link, useLocation } from "react-router-dom"
import { useRef, useReducer } from 'react'
import { variables } from '../../Variables.js'
import axious from "axios"
import { ColorRing } from 'react-loader-spinner'

const RecommendProduct = () => {

    const [products, setProducts] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const isLoading = useRef(false)
    const FetchRecommendation = async () => {
        isLoading.current = true
        forceUpdate()

        let productsArray = {};
        const url = variables.API_URL + `Product/recommend`
        axious.get(url).then((result) => {
            productsArray = result.data['data'].filter(d => d.images.length > 0 && d.variants.length > 0)
            // var parsedData = productsArray.map(el => 
            //     el.images = el.images.filter(x => x.colorId != null))
            // parsedData = parsedData.filter(d => d.images.length > 0 )
            setProducts(productsArray)

        }).catch((error) => {
            isLoading.current = false
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (localStorage.getItem("JWT") != null) {
            FetchRecommendation()
        }
    }, [])
    useEffect(() => {
        isLoading.current = false
        console.log("Recommended", products)
        forceUpdate()
    }, [products])
    const getImgURL = (images) => {
        var newList = images.filter(d => d.colorId !== null)
        return newList[0].url
    }
    return (
        <>

            {isLoading.current ?
                <div style={{ width: "100%", display: "flex", marginTop: 240, marginBottom: 240, justifyContent: 'center', alignItems: 'center' }}>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"

                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>

                :
                <div className="small-container">
                    {
                        localStorage.getItem("JWT") != null ?
                            <h2 className='pt-5'>Recommendation</h2>
                            : <div></div>
                    }
                    <div className="row">
                        {
                            products.map((product) =>
                                <div class="col-lg-4 col-md-12 mb-4">
                                    <div class="card">
                                        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                            data-mdb-ripple-color="light">
                                            <img src={getImgURL(product.images)} alt=""
                                                class="w-100" />
                                            <a href="#!">
                                                <div class="mask">
                                                    <div class="d-flex justify-content-start align-items-end h-100">
                                                        <h5><span class="badge bg-primary ms-2">New</span></h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="card-body">
                                            <Link to='/Detail' state={product}>
                                                <a href="" class="text-reset">
                                                    <h5 class="card-title mb-3">{product.title}</h5>
                                                </a>
                                            </Link>

                                            <a href="" class="text-reset">
                                                <p>Áo thun</p>
                                            </a>
                                            <h6 class="mb-3">{product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h6>
                                        </div>
                                    </div>
                                </div>
                                // <div className="col-4">
                                //     <Link to='/Detail' state={product}>
                                //         <img src={product.images[0].url} alt="" />
                                //         <h4 >{product.title}</h4>
                                //     </Link>
                                //     <div className="rating">
                                //         <i className="fa fa-star"></i>
                                //         <i className="fa fa-star"></i>
                                //         <i className="fa fa-star"></i>
                                //         <i className="fa fa-star"></i>
                                //         <i className="fa fa-star-o"></i>
                                //     </div>
                                //     <p>{product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                // </div>
                            )
                        }
                    </div>
                </div>

            }

        </>
    )
}

export default RecommendProduct
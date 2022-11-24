import React from 'react'
import { useEffect, useState } from 'react';

const Detail = () => {

    const [imgSrc, setImgSrc] = useState("images/gallery-1.jpg")
    function changeSrc(src) {
        setImgSrc(src);
    }
    return (
        <>
            <div className="small-container single-product">
                <div className="row">
                    <div className="col-2">
                        <img src={imgSrc} width="100%" alt="" id='product-img' />
                        <div className="small-img-row">
                            <div className="small-img-col">
                                <img src="images/gallery-1.jpg" width="100%" alt="" id='1' className='small-img' onClick={() => changeSrc("images/gallery-1.jpg")} />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-2.jpg" width="100%" alt="" id='2' className='small-img' onClick={() => changeSrc("images/gallery-2.jpg")} />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-3.jpg" width="100%" alt="" id='3' className='small-img' onClick={() => changeSrc("images/gallery-3.jpg")} />
                            </div>
                            <div className="small-img-col">
                                <img src="images/gallery-4.jpg" width="100%" alt="" id='4' className='small-img' onClick={() => changeSrc("images/gallery-4.jpg")} />
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <p>Home / T-Shirt</p>
                        <h1>Red Printed T-Shirt</h1>
                        <h4>$50.00</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <select >
                            <option>Select Size</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>Large</option>
                            <option>Medium</option>
                            <option>Small</option>
                        </select>
                        <input type="number" value="1" />
                        <button className='btn'> Add to Cart</button>
                        <h3>Product Details <i className="fa fa-indent"></i></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias expedita odit at sit aut blanditiis recusandae molestias, rem tempore earum facilis iste beatae molestiae inventore, fugiat eligendi animi quasi commodi.</p>

                    </div>
                </div>
            </div>
            <div className="small-container">
                <div className="row row-2">
                    <h2>Rating</h2>
                </div>
            </div>
            <div className="small-container">
                <h3>Trọng</h3>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <h4>2021-11-12</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex provident quibusdam neque modi molestias rerum ipsum vitae dolorum aperiam est minima officia, dicta quae nisi exercitationem voluptates. Voluptas, porro nostrum!</p>
            </div>
            <br />
            <div className="small-container">
                <h3>Phúc</h3>
                <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                </div>
                <h4>2021-11-12</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex provident quibusdam neque modi molestias rerum ipsum vitae dolorum aperiam est minima officia, dicta quae nisi exercitationem voluptates. Voluptas, porro nostrum!</p>
            </div>
            <div className="small-container">
                <div className="row row-2">
                    <h2>Related Products</h2>
                    <p>View More</p>
                </div>
            </div>
            <div className="small-container">
                <div className="row">
                    <div className="col-4">
                        <img src="images/product-1.jpg" alt="" />
                        <h4>Red printed T-shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src="images/product-1.jpg" alt="" />
                        <h4>Red printed T-shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src="images/product-3.jpg" alt="" />
                        <h4>Red printed T-shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                        </div>
                        <p>$50.00</p>
                    </div>
                    <div className="col-4">
                        <img src="images/product-4.jpg" alt="" />
                        <h4>Red printed T-shirt</h4>
                        <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                        </div>
                        <p>$50.00</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Detail
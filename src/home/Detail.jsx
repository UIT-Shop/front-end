import React from 'react'
import Navbar from '../common/header/NavBar'
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useRef, useReducer } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'react-slideshow-image/dist/styles.css'
import { variables } from '../Variables'
import axious from "axios"
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';


const Detail = () => {

    const [imgSrc, setImgSrc] = useState("images/gallery-1.jpg")
    const [quantity, setQuantity] = useState(1)
    const availableQuantity = useRef(0)
    const data = useRef([])
    const listRating = useRef([])
    const colorData = useRef([])
    const currentColor = useRef()
    const currentColorIndex = useRef(0)
    const optionSize = useRef("M")
    const sizeData = useRef(["M", "S", "XL", "XXL"])
    const isLoading = useRef(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const location = useLocation()
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const getQuantity = (colorID, size) => {
        optionSize.current = size
        console.log(colorID + "size" + size)
        var variant = data.current.variants.find(({ colorId, productSize }) => colorId === colorID && productSize === size)
        console.log(variant)
        availableQuantity.current = variant.quantity
        forceUpdate()
    }

    useEffect(() => {
        if (location.state != null) {
            console.log(location.state)
            FetchProduct(location.state.id)
            window.scrollTo(0, 0)
            // console.log(data)
        }
    }, [])

    useEffect(() => {
        if (location.state != null) {
            //do sth
        }
    }, [data])
    const FetchProduct = async (productID) => {
        isLoading.current = true
        forceUpdate()
        const url = variables.API_URL + `Product/${productID}`
        axious.get(url).then((result) => {
            data.current = result.data.data
            FetchRating(productID)
            getColors()

        }).catch((error) => {
            alert(error)
            console.log(error);
            isLoading.current = true
            forceUpdate()
        })
    }
    const FetchRating = async (productID) => {
        isLoading.current = true
        forceUpdate()
        const url = variables.API_URL + `Comment/${productID}?page=1`
        axious.get(url).then((result) => {
            console.log(result.data)
            listRating.current = result.data.data.comments
            isLoading.current = false
            forceUpdate()
        }).catch((error) => {
            alert(error)
            isLoading.current = false
        })
    }
    const addCart = async () => {

        var variant = data.current.variants.find(({ colorId, productSize }) => colorId === currentColor.current && productSize === optionSize.current)
        console.log(variant)
        const url = variables.API_URL + `Cart/add`
        axious.post(url, { productVariantId: variant.id, quantity: quantity }).then((result) => {
            toast.success('Add to cart successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });

        }).catch((error) => {
            alert(error)
            console.log(error);
        })
    }
    const getColors = () => {
        var Images = data.current.images
        colorData.current = Images.filter(d => d.color !== null)
        currentColor.current = colorData.current[0].colorId
        getQuantity(currentColor.current, optionSize.current)
        forceUpdate()
    }
    const changeColor = (index, ID) => {
        currentColor.current = ID
        currentColorIndex.current = index
        getQuantity(currentColor.current, optionSize.current)
        setIndex(index)
    }
    return (
        <>
            <Navbar />
            {isLoading.current ? <div style={{ width: "100%", display: "flex", marginTop: 240, marginBottom: 240, justifyContent: 'center', alignItems: 'center' }}>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"

                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div> :
                <div>
                    <ToastContainer />
                    <div className="small-container single-product">
                        <div className="row">
                            <div className="col-2">
                                <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
                                    {
                                        colorData.current.map((image) =>
                                            <Carousel.Item interval={100000000}>
                                                <img
                                                    className="d-block w-100"
                                                    src={image.url}
                                                    alt={image.id}
                                                />
                                            </Carousel.Item>)
                                    }
                                </Carousel>
                            </div>
                            {/* <div className="col-2">
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
                    </div> */}
                            <div className="col-2">
                                {/* <p>Home / T-Shirt</p> */}
                                <h1>{data.current.title}</h1>
                                <h4>{data.current.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h4>
                                <h5>Select Color</h5>
                                {
                                    colorData.current.map((color, i) =>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio{index}" value="option1" onClick={() => changeColor(i, color.colorId)} defaultChecked={i === 0 ? true : false} />
                                            <label className="form-check-label" for="inlineRadio1">{color.color.name}</label>
                                        </div>

                                    )
                                }
                                <h5>Select Size</h5>
                                <select className="form-select w-25 p-3" onChange={(e) => getQuantity(currentColor.current, e.target.value)}>
                                    {
                                        sizeData.current.map((size, i) => <option>{size}</option>)
                                    }
                                </select>


                                <input className='w-25 mt-2 form-control' min={1} max={availableQuantity.current} type="number" value={quantity} onChange={(num) => setQuantity(num.target.value)} />
                                <h5>{availableQuantity.current} available</h5>
                                <div>
                                    <button className='btn btn-primary mt-2' onClick={() => addCart()}> Add to Cart</button>
                                </div>
                                <h3>Product Details<i className="fa fa-indent"></i></h3>
                                <p>{data.current.description}</p>

                            </div>
                        </div>
                    </div>
                    <div className="small-container">
                        <div className="row row-2">
                            <h2>Rating</h2>
                        </div>
                    </div>
                    {
                        listRating.current.map((rating) =>
                            <div>
                                <div className="small-container">
                                    <h3>user{rating.userId}</h3>
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </div>
                                    <h4>{new Date(rating.commentDate).toLocaleString()}</h4>
                                    <p>{rating.content === "" ? "No comment" : rating.content}</p>
                                </div>
                                <br />
                            </div>
                        )
                    }
                </div>
            }




        </>
    )
}

export default Detail
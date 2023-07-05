import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useRef, useReducer } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import 'react-slideshow-image/dist/styles.css'
import { variables } from '../Variables'
import axious from "axios"
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';
import ImageGallery from 'react-image-gallery';
import Moment from 'moment';
import { Card } from 'react-bootstrap';

const Detail = () => {
    Moment.locale('vi');
    const [imgSrc, setImgSrc] = useState("images/gallery-1.jpg")
    const [quantity, setQuantity] = useState(1)
    const availableQuantity = useRef(0)
    const data = useRef([])
    const listRating = useRef([])
    const colorData = useRef([])
    const uncolorData = useRef([])
    const currentColor = useRef()
    const currentImage = useRef({})
    const currentColorIndex = useRef(0)
    const optionSize = useRef("M")
    const sizeData = useRef(["M", "S", "XL", "XXL"])
    const isLoading = useRef(true)
    const isLoadingRating = useRef(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const location = useLocation()
    const [index, setIndex] = useState(0);
    const startImg = useRef(0)
    const endImg = useRef(4)
    const pageNumber = useRef(3)
    const [currentPage, setPage] = useState(1)
    const avgRating = useRef(0)
    const [isSaling, setIsSaling] = useState(false)
    const [salingVariant, setSalingVariant] = useState({})


    const pageComponent = () => {
        if (pageNumber.current < 5) {
            return <Pagination className="small-container">
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First />
                }
                {[...Array(pageNumber.current)].map((elementInArray, index) => (
                    currentPage == index + 1 ?
                        <Pagination.Item active onClick={e => FetchRating(location.state.id, index + 1)}>{index + 1}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchRating(location.state.id, index + 1)}>{index + 1}</Pagination.Item>
                )
                )}
                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last />
                }
            </Pagination>
        }
        else if (currentPage < 4) {

            return <Pagination className="small-container">
                {
                    currentPage == 1 ? <Pagination.First disabled onClick={e => FetchRating(location.state.id, 1)} /> : <Pagination.First onClick={e => FetchRating(location.state.id, 1)} />
                }
                {[...Array(currentPage + 2)].map((elementInArray, index) => (
                    currentPage == index + 1 ?
                        <Pagination.Item active onClick={e => FetchRating(location.state.id, index + 1)}>{index + 1}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchRating(location.state.id, index + 1)}>{index + 1}</Pagination.Item>
                )
                )}
                <Pagination.Ellipsis />
                <Pagination.Item onClick={e => FetchRating(location.state.id, pageNumber.current)}>{pageNumber.current}</Pagination.Item>
                <Pagination.Last />
            </Pagination>
        }
        else if (currentPage > pageNumber.current - 3) {
            return <Pagination className="small-container">
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First onClick={e => FetchRating(location.state.id, 1)} />
                }
                <Pagination.Item onClick={e => FetchRating(location.state.id, 1)}>1</Pagination.Item >

                <Pagination.Ellipsis />

                {[...Array(3)].map((elementInArray, index) => (
                    currentPage == pageNumber.current - 2 + index ?
                        <Pagination.Item active>{pageNumber.current - 2 + index}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchRating(location.state.id, pageNumber.current - 2 + index)}>{pageNumber.current - 2 + index}</Pagination.Item>
                )
                )}
                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last onClick={e => FetchRating(location.state.id, pageNumber.current)} />
                }
            </Pagination>
        }
        else {
            return <Pagination className="small-container">
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First onClick={e => FetchRating(location.state.id, 1)} />
                }
                <Pagination.Item>1</Pagination.Item>

                <Pagination.Ellipsis />

                {[...Array(3)].map((elementInArray, index) => (
                    currentPage == currentPage - 1 + index ?
                        <Pagination.Item active>{currentPage - 1 + index}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchRating(location.state.id, currentPage - 1 + index)}>{currentPage - 1 + index}</Pagination.Item>
                )
                )}
                <Pagination.Ellipsis />
                <Pagination.Item onClick={e => FetchRating(location.state.id, pageNumber.current)}>{pageNumber.current}</Pagination.Item>

                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last onClick={e => FetchRating(location.state.id, pageNumber.current)} />
                }

            </Pagination>
        }
    }
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const getQuantity = (colorID, size) => {
        optionSize.current = size
        console.log(colorID + "size" + size)
        var variant = data.current.variants.find(({ colorId, productSize }) => colorId === colorID && productSize === size)
        if (variant.price < variant.originalPrice) {
            console.log(variant)
            setIsSaling(true)
        }
        else {
            setIsSaling(false)
        }
        setSalingVariant(variant)
        console.log(variant)
        currentImage.current = variant.color.images[0]
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
            FetchRating(productID, 1)
            getColors()
            avgRating.current = parseInt(Number((data.current.rating)).toFixed(0))
            console.log("Rating", avgRating.current)
        }).catch((error) => {
            alert(error)
            console.log(error);
            isLoading.current = true
            forceUpdate()
        })
    }
    const FetchRating = async (productID, page) => {
        isLoadingRating.current = true
        forceUpdate()
        const url = variables.API_URL + `Comment/${productID}?page=${page}`
        axious.get(url).then((result) => {
            console.log("rating", result.data)
            listRating.current = result.data.data.comments
            isLoading.current = false
            isLoadingRating.current = false
            pageNumber.current = result.data.data.pages
            setPage(page)
            forceUpdate()
        }).catch((error) => {
            alert(error)
            isLoading.current = false
            isLoadingRating.current = true
        })
    }
    const addCart = async () => {

        var variant = data.current.variants.find(({ colorId, productSize }) => colorId === currentColor.current && productSize === optionSize.current)
        console.log(variant)
        const url = variables.API_URL + `Cart/add`
        axious.post(url, { productVariantId: variant.id, quantity: quantity }).then((result) => {
            toast.success('Đã thêm thành công vào giỏ hàng', {
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
            toast.error('Bạn cần phải đăng nhập để có thể sử dụng tính năng n', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        })
    }
    const getColors = () => {
        var Images = data.current.images
        colorData.current = Images.filter(d => d.color !== null)
        uncolorData.current = Images.filter(d => d.color === null)
        if (uncolorData.current.length < 4)
            endImg.current = uncolorData.current.length


        currentColor.current = colorData.current[0].colorId
        currentImage.current = colorData.current[0]
        console.log("color", currentColor.current)
        getQuantity(currentColor.current, optionSize.current)
        console.log(data.current.variants)
        for (let i = 0; i < Object.keys(data.current.variants).length; i++) {
            console.log(Object.keys(data.current.variants).length)
            if (data.current.variants[i].price < data.current.variants[i].originalPrice) {

                setSalingVariant(data.current.variants[i])
                setIsSaling(true)
                let firstColor = colorData.current.find((color) => color.colorId === data.current.variants[i].colorId)
                let firstColorIndex = colorData.current.findIndex((color) => color.colorId === data.current.variants[i].colorId)



                currentColorIndex.current = firstColorIndex
                currentColor.current = colorData.current[firstColorIndex].colorId
                currentImage.current = colorData.current[firstColorIndex]
                console.log(firstColor)
                console.log(firstColorIndex)
                break;
            }
        }
        forceUpdate()
    }
    const changeColor = (index, ID) => {
        currentColor.current = ID
        currentColorIndex.current = index
        getQuantity(currentColor.current, optionSize.current)
        setIndex(index)
    }

    const previousImg = () => {
        startImg.current = startImg.current - 1;
        endImg.current = endImg.current - 1;
        forceUpdate()
    }
    const nextImg = () => {
        startImg.current = startImg.current + 1;
        endImg.current = endImg.current + 1;
        forceUpdate()
    }
    const unColorClicked = (image) => {
        currentImage.current = image
        forceUpdate()
    }


    return (
        <>
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
                            {/* <div className="col-2">
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
                            </div> */}
                            <div className="col-2">

                                <img src={currentImage.current.url} width="100%" alt="" id='product-img' />
                                <div className="small-img-row mt-2 d-flex justify-content-center">
                                    <button className='btn' onClick={() => previousImg()} disabled={startImg.current === 0}><i class="fa fa-chevron-left" aria-hidden="true" ></i></button>
                                    {
                                        uncolorData.current.slice(startImg.current, endImg.current).map((image) =>
                                            <div className="small-img-col p-1">
                                                <img src={image.url} width="100%" alt="" id='1' className='small-img' onClick={() => unColorClicked(image)} />
                                            </div>
                                        )
                                    }
                                    <button className='btn' onClick={() => nextImg()} disabled={endImg.current === uncolorData.current.length}><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <div className="col-2">
                                {/* <p>Home / T-Shirt</p> */}
                                <h1>{data.current.title}</h1>
                                {
                                    isSaling ?
                                        <div>
                                            <h2 style={{ color: "red" }}>{salingVariant.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h2>
                                            <del >{salingVariant.originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</del>
                                        </div>
                                        :
                                        <div>
                                            <h2 class="mb-3"  >{salingVariant.originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h2>
                                        </div>
                                }
                                <div>
                                    {
                                        [...Array(avgRating.current)].map(() => (
                                            <i className="fa fa-star"></i>
                                        ))
                                    }
                                    {
                                        [...Array(5 - avgRating.current)].map(() => (
                                            <i className="fa fa-star-o"></i>
                                        )
                                        )

                                    }
                                    {"\t" + Number((data.current.rating)).toFixed(1) + "/5"}
                                </div>

                                <h5>Chọn màu</h5>
                                {
                                    colorData.current.map((color, i) =>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio{index}" value="option1" onClick={() => changeColor(i, color.colorId)} defaultChecked={i === currentColorIndex.current ? true : false} />
                                            <label className="form-check-label" for="inlineRadio1">{color.color.name}</label>
                                        </div>

                                    )
                                }
                                <h5>Chọn Size</h5>
                                <select className="form-select w-25 p-3" onChange={(e) => getQuantity(currentColor.current, e.target.value)}>
                                    {
                                        sizeData.current.map((size, i) => <option>{size}</option>)
                                    }
                                </select>

                                <h5>Số lượng</h5>
                                <input className='w-25 mt-2 form-control' min={1} max={availableQuantity.current} type="number" value={quantity} onChange={(num) => setQuantity(num.target.value)} />
                                <h5>{availableQuantity.current} sản phẩm hiện có</h5>
                                <div>
                                    <button className='btn btn-primary mt-2' onClick={() => addCart()}> Thêm vào giỏ hàng</button>
                                </div>
                                <h3>Chi tiết sản phẩm<i className="fa fa-indent"></i></h3>
                                <p>{data.current.description}</p>

                            </div>
                        </div>
                    </div>
                    <div className="small-container mt-5 pl-2">
                        <div className="row pl-5">
                            <h2>Đánh giá</h2>
                        </div>
                    </div>

                    {
                        isLoadingRating.current ? <div style={{ width: "100%", display: "flex", marginTop: 240, marginBottom: 240, justifyContent: 'center', alignItems: 'center' }}>
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
                            <div className='p-4'>

                                {listRating.current.map((rating) =>
                                    <Card className='m-4'>
                                        <Card.Body>
                                            <div className="small-container">
                                                <h3>{rating.userName}</h3>
                                                <div className="rating">
                                                    {
                                                        [...Array(rating.rating)].map((elementInArray, index) => (
                                                            <i className="fa fa-star"></i>
                                                        )
                                                        )
                                                    }
                                                    {

                                                        [...Array(5 - rating.rating)].map((elementInArray, index) => (
                                                            <i className="fa fa-star-o"></i>
                                                        )
                                                        )
                                                    }

                                                </div>
                                                <p>{Moment(rating.commentDate).format('HH:mm:ss - DD/MM/yyyy')}</p>
                                                <h5>{rating.content === "" ? "Không có nội dung" : rating.content}</h5>
                                            </div>
                                            <br />
                                        </Card.Body>
                                    </Card>
                                )}
                                <div className='my-5'>
                                    {pageComponent()}

                                </div>

                            </div>

                    }
                </div>
            }




        </>
    )
}

export default Detail
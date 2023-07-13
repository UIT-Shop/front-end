import React from 'react'
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useReducer } from 'react'
import { variables } from '../../Variables'
import { Modal, Button } from 'react-bootstrap'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import axious from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetail = () => {

    const location = useLocation()
    const [isShow, invokeModal] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState()
    const [products, setProducts] = useState({ "initialized": false })
    const totalPrice = useRef(0)
    const isLoading = useRef(true)
    const variantId = useRef(0)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    let navigate = useNavigate();
    const [pictures, setPictures] = useState([])
    const apiImage = 'https://api.cloudinary.com/v1_1/nam-duong/upload'

    const removeSelectedImage = (index) => {
        const list = [...pictures]
        list.splice(index, 1)
        setPictures(list)
    }


    const initModal = () => {
        // alert(variantId)
        // variantId.current = variantId
        return invokeModal(!isShow)
    }
    const changeRating = (newRating) => {
        setRating(newRating)
    }
    useEffect(() => {
        if (location.state != null) {
            FetchOrder(location.state.id)
            window.scrollTo(0, 0)
        }
    }, [])
    useEffect(() => {
        if (products.initialized != false) {
            isLoading.current = false
            forceUpdate()
        }

    }, [products])

    const handleImage = (e) => {
        e.preventDefault()
        const arrayFile = [...e.target.files].map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        )
        setPictures((prevFiles) => prevFiles.concat(arrayFile))
    }

    const RateProduct = async (variantID) => {
        let imageUrls = []
        for (let file of pictures) {
            if (!file.preview) continue
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'uploadPimage')
            const res = await fetch(apiImage, {
                method: 'post',
                body: formData
            })
                .then((response) => response.json())
                .then((data) => data)
            if (res != null) {
                const url = { url: res.secure_url }
                console.log(url)
                imageUrls = imageUrls.concat(url)
            }
            URL.revokeObjectURL(file)
            console.log(imageUrls)
        }
        const apiUrl = variables.API_URL + `Comment`
        axious.post(apiUrl, { productVariantId: variantID, content: comment, rating: rating, orderId: location.state.id, imageComments: imageUrls }).then((result) => {

            toast.success('Cảm ơn bạn đã đánh giá cho sản phẩm của chúng tôi! ❤️', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            initModal()
            alert('Cảm ơn bạn đã đánh giá cho sản phẩm của chúng tôi! ❤️')
            FetchOrder(location.state.id)


        }).catch((error) => {
            alert(error)
        })
    }


    const FetchOrder = async (orderID) => {
        isLoading.current = true
        forceUpdate()
        const url = variables.API_URL + `Order/${orderID}`
        axious.get(url).then((result) => {
            setProducts(result.data.data)
            console.log(result.data.data)
        }).catch((error) => {
            alert(error)
            isLoading.current = true
            forceUpdate()
        })
    }

    const styles = {
        image: { maxWidth: '100%', maxHeight: 320 },
        delete: {
            cursor: 'pointer',
            background: 'red',
            color: 'white',
            border: 'none'
        }
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
                <table class="table table-hover mt-5 mb-5">
                    <ToastContainer />
                    <thead>
                        <tr className='table-dark mt-5'>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Màu</th>
                            <th scope="col">Kích thước</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá thành</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.products.map((product, i) =>
                                <tr>
                                    <td><div>
                                        <div class="col align-middle">
                                            <img src={product.imageUrl} alt="" />
                                        </div>

                                        <div class="col mw-25">
                                            {product.title}
                                        </div>
                                    </div>
                                    </td>
                                    <td className='align-middle'>{product.productColor}</td>
                                    <td className='align-middle'>{product.productSize}</td>
                                    <td className='align-middle'>{product.quantity}</td>
                                    <td className='align-middle'>{(product.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='align-middle'>
                                        <Button variant="primary" onClick={() => {
                                            initModal()
                                            variantId.current = product.productVariantID
                                        }} disabled={products.status !== 3 || product.isCommented === true}>
                                            Đánh giá
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }

                        <tr>
                            <td colSpan={4}>{"Address: " + products.address.fullAddress}<br />Phone number : {products.phone}<br />Receiver : {products.name}</td>
                            <td className='align-middle'>Total: {products.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table >

            }
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Rating style={{ maxWidth: 250 }} value={rating} onChange={(value) => changeRating(value)} />
                    <div className='pt-2'>Nhận xét của bạn</div>
                    <textarea class="form-control border-1" value={comment} onChange={(e) => setComment(e.target.value)} spellcheck="false"></textarea>
                    <div className="col-md-4 form-group mb-4">
                        <label>Ảnh</label>
                        <input
                            type="file"
                            name="image"
                            multiple
                            accept="image/*"
                            onChange={handleImage}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-4 row justify-content-start">
                        {pictures.map((photo, index) => {
                            if (!photo.color || photo.preview)
                                return (
                                    <div className="d-flex flex-column mb-2 w-25 h-25">
                                        <img
                                            src={photo.preview ?? photo.url}
                                            style={styles.image}
                                            alt="Thumb"
                                            key={index}
                                        />
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => removeSelectedImage(index)}
                                            style={styles.delete}>
                                            Xóa ảnh
                                        </button>
                                    </div>
                                )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={initModal}>
                        Đóng cửa sổ
                    </Button>
                    <Button variant="primary" onClick={() => RateProduct(variantId.current)}>
                        Đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <Button className='mt-5' variant="success" onClick={initModal}>
                Open Modal
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>React Modal Popover Example</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={initModal}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={initModal}>
                        Store
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}

export default OrderDetail
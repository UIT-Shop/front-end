import React from 'react'
import { useEffect, useState } from 'react';
import NavBar from '../common/header/NavBar'
import { ColorRing } from 'react-loader-spinner'
import { Link, useLocation } from "react-router-dom";
import { useRef, useReducer } from 'react'
import { variables } from '../Variables'
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
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    const initModal = () => {
        setComment("")
        setRating(0)
        return invokeModal(!isShow)
    }
    const changeRating = (newRating) => {
        setRating(newRating)
    }
    useEffect(() => {
        if (location.state != null) {
            console.log(location.state)
            FetchOrder(location.state.id)
            window.scrollTo(0, 0)
            // console.log(data)
        }
    }, [])
    useEffect(() => {
        if (products.initialized != false) {
            console.log(products)
            isLoading.current = false
            forceUpdate()
        }

    }, [products])

    const RateProduct = async (variantID) => {
        const url = variables.API_URL + `Comment`
        axious.post(url, { productVariantId: variantID, content: comment, rating: rating }).then((result) => {
            toast.success('Comment sucessfully', {
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
            console.log("success")
        }).catch((error) => {
            alert(error)
            console.log(error);
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
            console.log(error);
            isLoading.current = true
            forceUpdate()
        })
    }
    return (
        <>
            <NavBar />
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
                            <th scope="col">Products</th>
                            <th scope="col">Color</th>
                            <th scope="col">Size</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
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
                                    <td className='align-middle'> <Button variant="primary" onClick={initModal} disabled={products.status !== 3}>
                                        Comment
                                    </Button>
                                        <Modal show={isShow}>
                                            <Modal.Header closeButton onClick={initModal}>
                                                <Modal.Title>Rating</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Rating style={{ maxWidth: 250 }} value={rating} onChange={(value) => changeRating(value)} />
                                                <div>Comment</div>
                                                <textarea class="form-control border-1" value={comment} onChange={(e) => setComment(e.target.value)} spellcheck="false"></textarea>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={initModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={() => RateProduct(product.productId)}>
                                                    Rate this product
                                                </Button>
                                            </Modal.Footer>
                                        </Modal></td>


                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan={4}>{"Address: " + products.address.fullAddress}<br />Phone number : {products.phone}<br />Receiver : {products.name}</td>
                            <td className='align-middle'>Total: {products.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            }
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
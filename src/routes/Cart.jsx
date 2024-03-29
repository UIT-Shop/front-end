import React from 'react'
import { useEffect, useState } from 'react'
import axious from "axios"
import { variables } from '../Variables'
import { useRef, useReducer } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';





const Cart = () => {
    const [products, setProducts] = useState([])
    const totalPrice = useRef(0)
    const isLoading = useRef(true)
    const productLoaded = useRef(false)
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const hasChangedQuantity = useRef(false)
    useEffect(() => {
        window.scrollTo(0, 0)
        getVariants()

        // data = categories['data']


    }, [])

    const getVariants = async () => {
        isLoading.current = true
        forceUpdate()
        const url = variables.API_URL + `Cart`
        axious.get(url).then((result) => {
            productLoaded.current = true
            setProducts(result.data.data)
        }).catch((error) => {

        })
    }
    useEffect(() => {
        if (productLoaded.current) {

            totalPrice.current = 0
            products.forEach((product, i) => {
                totalPrice.current = totalPrice.current + (product.price * product.quantity)
            })
            isLoading.current = false
            forceUpdate()
        }
        // data = categories['data']
    }, [products])

    const changeQuantity = async (variantID, quantity) => {
        isLoading.current = true
        hasChangedQuantity.current = true
        forceUpdate()
        const url = variables.API_URL + `Cart/update-quantity`
        axious.put(url, { productVariantId: variantID, quantity: quantity }).then((result) => {
            getVariants()
        }).catch((error) => {
        })
    }

    const removeProduct = (variantID) => {
        const url = variables.API_URL + `Cart/remove/${variantID}`
        axious.delete(url).then((result) => {
            getVariants()
        }).catch((error) => {
        })
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
                <table class="table table-hover mt-5">
                    <ToastContainer />
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Màu sắc</th>
                            <th scope="col">Kích thước</th>
                            <th scope="col">Giá thành</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Tổng cộng</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
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
                                    <td className='align-middle'>{product.color}</td>
                                    <td className='align-middle'>{product.productSize}</td>
                                    <td className='align-middle'>{(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='align-middle'><input className='w-50 form-control' min={1} type="number" value={product.quantity} onChange={(num) => changeQuantity(product.productVariantId, num.target.value)} /></td>
                                    <td className='align-middle'>{(product.price * product.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='align-middle'><button type="button" class="btn btn-primary" onClick={(e) => { removeProduct(product.productVariantId) }}><i class="fa fa-times fa-lg" aria-hidden="true"></i></button></td>
                                </tr>
                            )
                        }
                        {
                            products.length == 0 ?
                                <tr>
                                    <td>Hiện tại không có sản phẩm trong giỏ hàng</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                :
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td className='align-middle'> <h5 className='mt-5'>Phí ship: Miễn phí</h5>Total: {totalPrice.current.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='align-middle'><Link to="/Information" state={products}><button type="button" class="btn btn-primary">Next</button> </Link></td>
                                </tr>
                        }

                    </tbody>
                </table>

            }

            {/* // <div className="small-container">

                //     <table>
                //         <tr className=''>
                //             <th>Product</th>
                //             <th>Quantity</th>
                //             <th>Subtotal</th>
                //         </tr> */}
            {/* //         { */}
            {/* //             products.map((product, i) =>

                //                 <tr>
                //                     <td><div className="cart-info">
                //                         <img src={product.imageUrl} alt="" />
                //                         <div>
                //                             <p>{product.title}</p>
                //                             <small>Price: {product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</small>
                //                             <br />
                //                             <button >Remove</button>
                //                         </div>
                //                     </div>
                //                     </td>
                //                     <td><input className='w-25 mt-2 form-control' min={1} type="number" value={product.quantity} onChange={(num) => changeQuantity(product.productVariantId, num.target.value)} /> </td>
                //                     <td>{(product.price * product.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                //                 </tr>

                //             )
                //         }
                //     </table> */}

            {/* //     <div className="total-price">
                //         <table>
                //             <tr>
                //                 <td>Subtotal</td>
                //                 <td>$200.00</td>
                //             </tr>
                //             <tr>
                //                 <td>Tax</td>
                //                 <td>$35.00</td>
                //             </tr>
                //             <tr>
                //                 <td>Subtotal</td>
                //                 <td>$230.00</td>
                //             </tr>
                //         </table>
                //     </div>
                // </div>} */}

        </>

    )
}

export default Cart
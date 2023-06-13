import React from 'react'
import { variables } from '../Variables'
import { useRef, useReducer, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from "react-router-dom"
import axious from "axios"
import { useEffect } from 'react'
import Moment from 'moment';

const Order = () => {
    const [isShow, invokeModal] = React.useState(false)
    const [products, setProducts] = useState([])
    const totalPrice = useRef(0)
    const isLoading = useRef(true)
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {
        fetchOrder()
    }, [])
    useEffect(() => {
        isLoading.current = false
        forceUpdate()
    }, [products])


    const fetchOrder = async () => {
        isLoading.current = true
        forceUpdate()
        const url = variables.API_URL + `Order`
        axious.get(url).then((result) => {
            setProducts(result.data.data)
        }).catch((error) => {
            // alert(error)
        })
    }

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return "Đang chờ"
            case 1:
                return "Đã nhận đơn"
            case 2:
                return "Đang vận chuyển"
            case 3:
                return "Đã giao"
            default:
                return "Đơn bị hủy"
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
                    <thead>
                        <tr className='table-dark mt-5'>
                            <th scope="col">Mã Đơn hàng</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Tổng số tiền</th>
                            <th scope="col">Tình trạng</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr>
                                    <td className='align-middle'>{product.id}</td>
                                    <td className='align-middle'>{Moment(product.orderDate).format('HH:mm:ss - DD/MM/yyyy')}</td>
                                    <td className='align-middle'>{(product.totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    <td className='align-middle'>{getStatus(product.status)}</td>
                                    <td className='align-middle'><Link to={"/Order/" + product.id} state={product} ><button type="button" class="btn btn-primary" onClick={(e) => { }}>Detail</button></Link></td>
                                </tr>
                            )
                        }

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

export default Order
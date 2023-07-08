import React from 'react'
import Navbar from '../../common/header/NavBar'
import { useRef, useReducer } from 'react'
import { useEffect, useState } from 'react';
import { variables } from '../../Variables'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axious from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import { Modal, Button } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
function Information() {
    let navigate = useNavigate();

    const [isShow, invokeModal] = useState(false)
    const [isShowPayment, invokeModalPayment] = useState(false)

    const [province, setProvince] = useState({})
    const [district, setDistrict] = useState({})
    const [ward, setWard] = useState({})
    const [street, setStreet] = useState()
    const [name, setName] = useState()
    const [phoneNumber, setPhonenumber] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const districts = useRef([])
    const provinces = useRef([])
    const wards = useRef([])
    const id = useRef([])

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const totalPrice = useRef(0)
    const paymentIndex = useRef(1)
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [convertedPrice, setConvertedPrice] = useState(0);



    const VND_TO_USD_RATE = 0.000043;

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        if (location.state != null) {
            console.log(location.state[0])
            setProducts(location.state)
            totalPrice.current = 0
            location.state.forEach((product, i) => {
                totalPrice.current = totalPrice.current + (product.price * product.quantity)
            })
            setConvertedPrice(totalPrice.current * VND_TO_USD_RATE)
        }
        else {

        }
        fetchProvince()
        fetchUser()
    }, [])
    useEffect(() => {

        if (!(Object.keys(province).length === 0)) {

            fetchDistricts()
        }

    }, [province])
    useEffect(() => {
        if (!(Object.keys(district).length === 0)) {
            fetchWards()
        }
    }, [district])
    useEffect(() => {

    }, [ward])

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const fetchUser = async () => {
        var userData = parseJwt(localStorage.getItem("JWT"))
        id.current = userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        const url = variables.API_URL + "User/info/" + id.current

        axious.get(url).then((result) => {
            setName(result.data.data.name)
            setPhonenumber(result.data.data.phone)
            console.log(totalPrice.current)
            setIsLoading(false)
            forceUpdate()
        }).catch((error) => {
            alert(error)

            setIsLoading(false)
        })
    }

    const fetchProvince = async () => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces`

        axious.get(url).then((result) => {

            const firstElement = { "name": "Nhập tỉnh" }
            const newData = [firstElement].concat(result.data.data)
            provinces.current = newData

            forceUpdate()
        }).catch((error) => {
            alert(error)

            forceUpdate()
        })
    }
    const fetchDistricts = async (index) => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces/${province.id}/districts`

        axious.get(url).then((result) => {
            const firstElement = { "name": "Nhập huyện" }
            const newData = [firstElement].concat(result.data.data)
            districts.current = newData
            forceUpdate()
        }).catch((error) => {
            alert(error)
            forceUpdate()
        })
    }
    const fetchWards = async (index) => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces/${province.id}/districts/${district.id}/wards`
        axious.get(url).then((result) => {
            const firstElement = { "name": "Nhập xã" }
            const newData = [firstElement].concat(result.data.data)
            wards.current = newData
            forceUpdate()
        }).catch((error) => {
            alert(error)
            forceUpdate()
        })
    }

    const saveData = async (e) => {
        e.preventDefault();
        if (selectedOption === 'online') {
            initModalPayment();
        }
        if (selectedOption === 'cash') {
            const url = variables.API_URL + `Order`
            axious.post(url, { wardId: ward.id, street: street, name: name, phone: phoneNumber }).then((result) => {
                toast.success('Cảm ơn bạn đã đặt hàng!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                window.scrollTo(0, 0)
                initModal()

            }).catch((error) => {
                alert(error)
            })
        }

    }

    const initModal = () => {
        return invokeModal(!isShow)
    }
    const initModalPayment = () => {
        return invokeModalPayment(!isShowPayment)
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            {isLoading ? <div style={{ width: "100%", display: "flex", marginTop: 240, marginBottom: 240, justifyContent: 'center', alignItems: 'center' }}>
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

                <form onSubmit={(e) => saveData(e)} action className='d-flex align-items-center justify-content-center'>
                    <div className='container pt-5 pb-5'>
                        <legend className='align-items-center justify-content-center' style={{ textAlign: 'center' }} cl>Thanh toán giỏ hàng</legend>
                        <div className='row align-items-start'>


                            <div className='col-lg-6 align-items-start'>
                                <div className=''>
                                    <legend cl>Đơn hàng</legend>
                                    <fieldset className='w-100'>
                                        <table class="table table-hover">
                                            <ToastContainer />
                                            <thead>
                                                <tr className='table-dark'>
                                                    <th scope="col">Sản phẩm</th>
                                                    <th scope="col">Đơn giá</th>
                                                    <th scope="col">Tổng cộng</th>
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
                                                                    {product.title} - {product.color} - {product.productSize} x {product.quantity}
                                                                </div>
                                                            </div>
                                                            </td>
                                                            <td className='align-middle'>{(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                            <td className='align-middle'>{(product.price * product.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    products.length == 0 ?
                                                        <tr>
                                                            <td>Hiện tại không có sản phẩm trong giỏ hàng</td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        :
                                                        <tr>
                                                            <td></td>

                                                            <td colSpan='2' className='align-middle'>
                                                                <span>
                                                                    Phí ship: Miễn phí
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    Tạm tính: {totalPrice.current.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                }

                                            </tbody>
                                        </table>



                                    </fieldset>

                                </div>
                            </div>
                            <div className='col-lg-6 border border-primary rounded pb-5'>
                                <legend cl>Thông tin đơn hàng</legend>
                                <fieldset className='w-100'>
                                    <div class="form-group">
                                        <label class="form-label mt-4" for="inputDefault">Tên</label>
                                        <input type="text" class="form-control" value={name} placeholder="Name" id="inputDefault" onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="inputDefault">Số điện thoại</label>
                                        <input type="tel" class="form-control" value={phoneNumber} pattern='(84|0[3|5|7|8|9])+([0-9]{8})\b' placeholder="Phone number" id="inputDefault" onChange={(e) => setPhonenumber(e.target.value)} required />
                                    </div>
                                    <div class="form-group w-75">
                                        <label for="provinceSelect1" class="form-label">Tỉnh</label>
                                        <select class="form-select" id="provinceSelect1" defaultValue="select" onChange={(e) => setProvince(provinces.current[e.target.value])} required>
                                            {
                                                provinces.current.map((singleProvince, i) =>
                                                    <option value={i}>{singleProvince.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div class="form-group w-75">
                                        <label for="DistrictSelect1" class="form-label">Quận,huyện</label>
                                        <select class="form-select" id="DistrictSelect1" defaultValue="select" onChange={(e) => setDistrict(districts.current[e.target.value])} disabled={province === null}>
                                            {
                                                districts.current.map((singleDistrict, i) =>
                                                    <option value={i}>{singleDistrict.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div class="form-group w-75">
                                        <label for="WardSelect1" class="form-label">Khu vực, xã</label>
                                        <select class="form-select" id="WardSelect1" defaultValue="select" onChange={(e) => setWard(wards.current[e.target.value])} disabled={district === null}>
                                            {
                                                wards.current.map((singleWard, i) =>
                                                    <option value={i}>{singleWard.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="streeetTextarea" class="form-label">Đường</label>
                                        <textarea class="form-control" id="streeetTextarea" rows="3" spellcheck="false" onChange={(e) => { setStreet(e.target.value) }}></textarea>
                                    </div>
                                    <h4>Phương thức thanh toán</h4>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioGroup"
                                            value="cash"
                                            checked={selectedOption === 'cash'}
                                            onChange={handleOptionChange}
                                        />
                                        <label className="form-check-label">
                                            Thanh toán trực tiếp
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="radioGroup"
                                            value="online"
                                            checked={selectedOption === 'online'}
                                            onChange={handleOptionChange}
                                        />
                                        <label className="form-check-label">
                                            Chuyển khoản
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Đặt hàng</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <Modal show={isShow}>
                        <Modal.Header closeButton onClick={initModal}>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h2>Cảm ơn vì đã đặt hàng của chúng tôi!</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { navigate('/Order') }}>
                                Tiếp theo
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={isShowPayment}>
                        <Modal.Header closeButton onClick={initModalPayment}>
                            <Modal.Title>Thanh toán chuyển khoản</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PayPalScriptProvider options={{ clientId: "AYktPWBgET5qXqVC7kCu2fk0Av1c-laTMmsHZEv7nb2eEVD43F-_u4ayInRSFu1F57brMyvb8p76UV4s" }}>
                                <PayPalButtons
                                    createOrder={(data, action) => {
                                        return action.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: 0.02,
                                                        currency_code: "USD"
                                                    }
                                                }
                                            ]
                                        })
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            alert(`Transaction completed by ${name}`);
                                        });
                                    }} />
                            </PayPalScriptProvider>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => { navigate('/Order') }}>
                                Tiếp theo
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </form>
            }


        </>
    )
}

export default Information
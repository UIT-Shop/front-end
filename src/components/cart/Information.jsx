import React from 'react'
import Navbar from '../../common/header/NavBar'
import { useRef, useReducer } from 'react'
import { useEffect, useState } from 'react';
import { variables } from '../../Variables'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axious from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'

function Information() {
    let navigate = useNavigate();

    const [province, setProvince] = useState({})
    const [district, setDistrict] = useState({})
    const [ward, setWard] = useState({})
    const [street, setStreet] = useState()
    const [name, setName] = useState()
    const [phoneNumber, setPhonenumber] = useState()
    const isLoading = useRef(true)
    const districts = useRef([])
    const provinces = useRef([])
    const wards = useRef([])
    const id = useRef([])

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const totalPrice = useRef(0)
    const location = useLocation()

    useEffect(() => {
        if (location.state != null) {

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

            isLoading.current = false
            forceUpdate()
        }).catch((error) => {
            alert(error)

            isLoading.current = false
            forceUpdate()
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
        const url = variables.API_URL + `Order`
        axious.post(url, { wardId: ward.id, street: street, name: name, phone: phoneNumber }).then((result) => {
            alert("Bạn đã đặt hàng thành công")
            navigate("/")
        }).catch((error) => {
            alert(error)
        })
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
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
                <div className='pt-5'>
                    <form onSubmit={(e) => saveData(e)} action className='w-50 mt-5 pb-3 mb-5 border border-primary rounded container d-flex align-items-center justify-content-center'>
                        <fieldset className='w-75'>
                            <legend className='mt-3'>Order Information</legend>
                            <div class="form-group">
                                <label class="form-label mt-4" for="inputDefault">Name</label>
                                <input type="text" class="form-control" value={name} placeholder="Name" id="inputDefault" onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="inputDefault">Phone number</label>
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


                            <button type="submit" class="btn btn-primary mt-3">Đặt hàng</button>
                        </fieldset>
                    </form>
                </div>
            }


        </>
    )
}

export default Information
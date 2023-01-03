import React from 'react'
import Navbar from '../common/header/NavBar'
import { useRef, useReducer } from 'react'
import { useEffect, useState } from 'react';
import { variables } from '../Variables'
import { Navigate, useNavigate } from 'react-router-dom';
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

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        fetchProvince()
    }, [])
    useEffect(() => {
        console.log(Object.keys(province).length)
        if (!(Object.keys(province).length === 0)) {
            console.log(province)
            fetchDistricts()
        }

    }, [province])
    useEffect(() => {
        if (!(Object.keys(district).length === 0)) {
            console.log(district)
            fetchWards()
        }
    }, [district])
    useEffect(() => {

    }, [ward])

    const fetchProvince = async () => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces`

        axious.get(url).then((result) => {
            console.log(province)
            provinces.current = result.data.data
            forceUpdate()
        }).catch((error) => {
            alert(error)
            console.log(error);
            forceUpdate()
        })
    }
    const fetchDistricts = async (index) => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces/${province.id}/districts`

        axious.get(url).then((result) => {
            console.log(province)
            districts.current = result.data.data
            console.log(districts.current)
            forceUpdate()
        }).catch((error) => {
            alert(error)
            console.log(error);
            forceUpdate()
        })
    }
    const fetchWards = async (index) => {
        forceUpdate()
        const url = variables.API_URL + `Address/provinces/${province.id}/districts/${district.id}/wards`

        axious.get(url).then((result) => {
            console.log(province)
            wards.current = result.data.data
            forceUpdate()
        }).catch((error) => {
            alert(error)
            console.log(error);
            forceUpdate()
        })
    }

    const saveData = async (e) => {
        e.preventDefault();
        const url = variables.API_URL + `Order`
        axious.post(url, { wardId: ward.id, street: street, name: name, phone: phoneNumber }).then((result) => {
            alert("Order successfully")
            navigate("/")
            console.log(result)
        }).catch((error) => {
            alert(error)
            console.log(error);
        })
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div>
                <form onSubmit={(e) => saveData(e)} action className='w-50 mt-5 pb-3 mb-5 border border-primary rounded container d-flex align-items-center justify-content-center'>


                    <fieldset className='w-75'>
                        <legend className='mt-3'>Order Information</legend>
                        <div class="form-group">
                            <label class="form-label mt-4" for="inputDefault">Name</label>
                            <input type="text" class="form-control" placeholder="Name" id="inputDefault" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="inputDefault">Phone number</label>
                            <input type="tel" class="form-control" pattern='(84|0[3|5|7|8|9])+([0-9]{8})\b' placeholder="Phone number" id="inputDefault" onChange={(e) => setPhonenumber(e.target.value)} required />
                        </div>
                        <div class="form-group w-75">
                            <label for="provinceSelect1" class="form-label">Province</label>
                            <select class="form-select" id="provinceSelect1" defaultValue="select" onChange={(e) => setProvince(provinces.current[e.target.value])} required>
                                {
                                    provinces.current.map((singleProvince, i) =>
                                        <option value={i}>{singleProvince.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div class="form-group w-75">
                            <label for="DistrictSelect1" class="form-label">Districts</label>
                            <select class="form-select" id="DistrictSelect1" defaultValue="select" onChange={(e) => setDistrict(districts.current[e.target.value])} disabled={province === null}>
                                {
                                    districts.current.map((singleDistrict, i) =>
                                        <option value={i}>{singleDistrict.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div class="form-group w-75">
                            <label for="WardSelect1" class="form-label">Ward</label>
                            <select class="form-select" id="WardSelect1" defaultValue="select" onChange={(e) => setWard(wards.current[e.target.value])} disabled={district === null}>
                                {
                                    wards.current.map((singleWard, i) =>
                                        <option value={i}>{singleWard.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="streeetTextarea" class="form-label">Street</label>
                            <textarea class="form-control" id="streeetTextarea" rows="3" spellcheck="false" onChange={(e) => { setStreet(e.target.value) }}></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary mt-3">Start Order</button>
                    </fieldset>
                </form>
            </div>

        </>
    )
}

export default Information
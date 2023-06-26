import React from 'react'
import { useRef, useReducer } from 'react'
import { useEffect, useState } from 'react';
import { variables } from '../Variables'
import { Navigate, useNavigate } from 'react-router-dom';
import axious from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'

function UserInformation() {
    let navigate = useNavigate();

    const [name, setName] = useState()
    const [phoneNumber, setPhonenumber] = useState()
    const [email, setEmail] = useState()
    const id = useRef(0)
    const isLoading = useRef(true)

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        fetchUser()
    }, [])

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

        console.log(userData)
        setEmail(userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"])

        axious.get(url).then((result) => {

            console.log(result.data.data)
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

    const saveData = async (e) => {
        e.preventDefault();
        const url = variables.API_URL + `User`
        axious.put(url, { email: email, name: name, phone: phoneNumber }).then((result) => {
            toast.success('Lưu thông tin thành công', {
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

    return (
        <>
            <ToastContainer />
            {
                isLoading.current ? <div style={{ width: "100%", display: "flex", marginTop: 240, marginBottom: 240, justifyContent: 'center', alignItems: 'center' }}>
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
                    <div className='mt-5 pt-3'>
                        <form onSubmit={(e) => saveData(e)} action className='w-50 mt-5 pb-3 mb-5 border border-primary rounded container d-flex align-items-center justify-content-center'>


                            <fieldset className='w-75'>
                                <legend className='mt-3'>Thông tin người dùng</legend>
                                <div class="form-group mt-4">
                                    <label class="form-label" for="inputDefault">Email</label>
                                    <input type="email" class="form-control" disabled placeholder="Email" id="inputDefault" value={email} />
                                </div>
                                <div class="form-group">
                                    <label class="form-label " for="inputDefault">Họ tên</label>
                                    <input type="text" class="form-control" placeholder="Name" value={name} id="inputDefault" onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="inputDefault">Số điện thoại</label>
                                    <input type="tel" class="form-control" pattern='(84|0[3|5|7|8|9])+([0-9]{8})\b' value={phoneNumber} placeholder="Phone number" id="inputDefault" onChange={(e) => setPhonenumber(e.target.value)} required />
                                </div>


                                <button type="submit" class="btn btn-primary mt-3">Lưu thông tin</button>
                            </fieldset>
                        </form>
                    </div>
            }


        </>
    )
}

export default UserInformation
import React, { useState, useEffect } from 'react'
import './RecommendProduct.module.css'
import { Link, useLocation } from "react-router-dom"
import { useRef, useReducer } from 'react'
import { variables } from '../../Variables.js'
import axious from "axios"
import { ColorRing } from 'react-loader-spinner'
import Card from "../common/Card"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

const Topsale = () => {

    const [products, setProducts] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const isLoading = useRef(false)
    const FetchTopSale = async () => {
        isLoading.current = true
        forceUpdate()

        let productsArray = {};
        const url = variables.API_URL + `Product/topSale`
        axious.get(url).then((result) => {
            productsArray = result.data['data'].filter(d => d.images.length > 0 && d.variants.length > 0)
            // var parsedData = productsArray.map(el => 
            //     el.images = el.images.filter(x => x.colorId != null))
            // parsedData = parsedData.filter(d => d.images.length > 0 )
            setProducts(productsArray)

        }).catch((error) => {
            isLoading.current = false
        })
    }
    useEffect(() => {
        FetchTopSale()
    }, [])
    useEffect(() => {
        isLoading.current = false
        console.log("Recommended", products)
        forceUpdate()
    }, [products])
    const getImgURL = (images) => {
        var newList = images.filter(d => d.colorId !== null)
        return newList[0].url
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
                <div className="small-container p-4">
                    <h2 className='pt-5'>Các sản phẩm đang bán chạy 🔥</h2>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        <div className='row'>
                            {
                                products.map((product) =>
                                    <SwiperSlide><Card product={product} isRecommend={true} /></SwiperSlide>
                                )
                            }
                        </div>


                    </Swiper>
                    <div className="row">

                    </div>
                </div>

            }

        </>
    )
}

export default Topsale;
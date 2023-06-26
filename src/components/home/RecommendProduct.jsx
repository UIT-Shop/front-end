import React, { useState, useEffect } from 'react'
import './RecommendProduct.module.css'
import { Link, useLocation } from "react-router-dom"
import { useRef, useReducer } from 'react'
import { variables } from '../../Variables.js'
import axious from "axios"
import { ColorRing } from 'react-loader-spinner'
import Card from "../common/Card"

const RecommendProduct = () => {

    const [products, setProducts] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const isLoading = useRef(false)
    const FetchRecommendation = async () => {
        isLoading.current = true
        forceUpdate()

        let productsArray = {};
        const url = variables.API_URL + `Product/recommend`
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
        window.scrollTo(0, 0)
        if (localStorage.getItem("JWT") != null) {
            FetchRecommendation()
        }
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
                    {
                        localStorage.getItem("JWT") != null ?
                            <h2 className='pt-5'>Gợi ý dành cho bạn</h2>
                            : <div></div>
                    }
                    <div className="row">
                        {
                            products.map((product) => <Card product={product} isRecommend={true} />
                            )
                        }
                    </div>
                </div>

            }

        </>
    )
}

export default RecommendProduct
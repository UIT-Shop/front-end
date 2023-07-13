import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './Card.css'


const Card = (props) => {

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };
    const imgUrl = useRef("")
    const [isSaling, setIsSaling] = useState(false)
    const [salingVariant, setSalingVariant] = useState({})

    const showPrice = () => {
        for (let i = 0; i < Object.keys(props.product.variants).length; i++) {
            if (props.product.variants[i].price < props.product.variants[i].originalPrice) {
                console.log(props.product.variants[i])
                setSalingVariant(props.product.variants[i])
                setIsSaling(true)
                imgUrl.current = props.product.images.filter((d) => d.colorId === props.product.variants[i].colorId)[0].url
                console.log(imgUrl)
                break
            }
        }
    }

    const [rating, setRating] = useState(0)

    useEffect(() => {
        setRating(Math.ceil(props.product.rating))
        showPrice()
    }, [])
    const getImgURL = (images) => {
        if (imgUrl.current !== "") {
            return imgUrl.current
        }
        var newList = images.filter((d) => d.colorId !== 999);
        if (newList.length === 0) {
            return images[0].url;
        } else {
            return newList[0].url;
        }
    }
    return (
        imageError ? null :

            <div class="card">
                <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light">
                    <img src={getImgURL(props.product.images)} alt="" onError={handleImageError}
                        class="w-100" />
                    {/* <a href="#!">
                        <div class="mask">
                            <div class="d-flex justify-content-start align-items-end h-100">
                                <h5><span class="badge bg-primary ms-2">New</span></h5>
                            </div>
                        </div>
                    </a> */}
                </div>
                <div class="card-body">
                    <Link to={`/product/detail/${props.product.id}`} state={props.product}>
                        <a href="" className="text-reset">
                            <h5 className="card-title mb-3 title">{props.product.title}</h5>
                        </a>
                    </Link>
                    <a></a>

                    <a href="" className="text-reset">
                        {
                            <p style={{ marginBottom: 0 }}>{props.product.category.name}</p>
                        }
                    </a>
                    <div className="rating">
                        {
                            [...Array(rating)].map(() => (
                                <i className="fa fa-star"></i>
                            ))
                        }
                        {
                            [...Array(5 - rating)].map(() => (
                                <i className="fa fa-star-o"></i>
                            )
                            )

                        }
                        {"\t" + Number((props.product.rating)).toFixed(1) + "/5"}

                        {
                            isSaling ?
                                <div class="mb-3" style={{ height: '2em' }}>
                                    <h4 style={{ color: "red" }}>{salingVariant.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h4>
                                    <del >{salingVariant.originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</del>
                                </div>
                                :
                                <div class="mb-3" style={{ height: '2em' }}>
                                    <h4 class="mb-3"  >{props.product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h4>

                                </div>

                        }
                    </div>


                </div>
            </div>

    )
}

export default Card
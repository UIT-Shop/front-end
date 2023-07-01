import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './Card.css'


const Card = (props) => {

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const [rating, setRating] = useState(0)

    useEffect(() => {
        setRating(Math.ceil(props.product.rating))
        console.log(rating)
        console.log(props.product)
    }, [])
    const getImgURL = (images) => {
        var newList = images.filter((d) => d.colorId !== 999);
        if (newList.length === 0) {
            return images[0].url;
        } else {
            return newList[0].url;
        }
    }
    return (
        imageError ? null :
            <div class="col-lg-4 col-md-12 mb-4 p-3">
                <div class="card">
                    <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light">
                        <img src={getImgURL(props.product.images)} alt="" onError={handleImageError}
                            class="w-100" />
                        <a href="#!">
                            <div class="mask">
                                <div class="d-flex justify-content-start align-items-end h-100">
                                    <h5><span class="badge bg-primary ms-2">New</span></h5>
                                </div>
                            </div>
                        </a>
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

                        </div>

                        <h5 class="mb-3">{props.product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5>
                    </div>
                </div>
            </div>
    )
}

export default Card
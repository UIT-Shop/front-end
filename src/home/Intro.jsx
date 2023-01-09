import React from 'react'
import './Intro.css'
const Intro = () => {
    return (
        <>
            <div className="container-2 w-100">
                <div className="row w-100">
                    <div className="col-2 left">
                        <h1>Hãy tạo cho bạn<br />một phong cách mới</h1>
                        {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab, sit cupiditate? Sapie!</p> */}
                        <a href="" className="btn">Xem thêm <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className="col-2">
                        <img src="images/image1.png" alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Intro
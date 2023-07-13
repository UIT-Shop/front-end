import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Intro.css'
import { Link } from "react-router-dom";

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item >
                <div className="d-flex align-items-center">
                    <Carousel.Caption className="text-start" style={{ bottom: "auto", width: "30%" }}>
                        <h2 className='caption-title'>Chất vải AIRism mềm mịn với vẻ ngoài như áo cotton.</h2>
                        <Link to='/product/detail/2'><p className='intro-name'>AIRism Cotton Áo Thun Kẻ Sọc Cổ Tròn Dáng Rộng</p></Link>
                        <div class="mb-3" style={{ height: '2em' }}>
                            <del >{244000.0.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</del>
                            <h3 style={{ color: "red", fontSize: "2em   " }}>{391000.0.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                        </div>
                    </Carousel.Caption>
                    <img
                        className="d-block w-100"
                        src="images/main-2.jpg"
                        alt="First slide"
                    />
                </div>

            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex align-items-center">

                    <img
                        className="d-block w-100"
                        src="images/main-3.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className="text-start" style={{ bottom: "auto", width: "30%", left: 'auto' }}>
                        <h2 className='caption-title'>Phom dáng thoải mái, dáng ôm vừa vặn, đa sắc màu.</h2>
                        <Link to='/product/detail/452'><p className='intro-name'>Áo Polo Vải Pique Co Giãn Ngắn Tay</p></Link>

                        <div class="mb-3" style={{ height: '2em' }}>
                            <h3 style={{ color: "white", fontSize: "2em" }}>{489000.0.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="d-flex align-items-center">

                    <img
                        className="d-block w-100"
                        src="images/main-4.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className="text-start" style={{ bottom: "auto", width: "30%", left: "auto" }}>
                        <h2 className='caption-title'>Chiếc áo polo cổ điển, phom dáng thoải mái, chất vải bền.</h2>
                        <Link to='/product/detail/53'><p className='intro-name'>Áo Polo Vải Dry Pique Ngắn Tay</p></Link>
                        <div class="mb-3" style={{ height: '2em' }}>
                            <del >{195000.0.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</del>
                            <h3 style={{ color: "red", fontSize: "2em   " }}>{499000.0.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;
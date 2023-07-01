import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import { useRef, useReducer } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { variables } from '../Variables'
import axious from "axios"
import Pagination from 'react-bootstrap/Pagination';
import { Accordion } from 'react-bootstrap'
import './Product.css'
import Card from '../components/common/Card'
import FilterBar from '../components/product/FilterBar'
import { useLoaderData } from 'react-router-dom';


const Product = () => {
    const [products, setProducts] = useState([])
    const data = useRef([])
    const category = useRef({})
    const [currentCategory, setCate] = useState()
    const isLoading = useRef(true)
    const [loadingProduct, setLoadingProduct] = useState(true)
    const isSearching = useRef(false)
    const searchInput = useRef('')
    const colorData = useRef([])
    const [shirtData, setShirtData] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const pageNumber = useRef(3)
    const [currentPage, setPage] = useState(1)
    const loader = useLoaderData()
    const navigate = useNavigate();
    const [listCategories, setListCategories] = useState([])
    const { gender } = useParams();
    let productsArray = {};
    const [searchResult, setSearchResult] = useState("")
    const pageComponent = () => {
        if (pageNumber.current < 5) {
            return <Pagination>
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First />
                }
                {[...Array(pageNumber.current)].map((elementInArray, index) => (
                    currentPage == index + 1 ?
                        <Pagination.Item active onClick={e => FetchProduct(category.current.id, index + 1)}>{index + 1}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchProduct(category.current.id, index + 1)}>{index + 1}</Pagination.Item>
                )
                )}
                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last />
                }
            </Pagination>
        }
        else if (currentPage < 4) {

            return <Pagination>
                {
                    currentPage == 1 ? <Pagination.First disabled onClick={e => FetchProduct(category.current.id, 1)} /> : <Pagination.First onClick={e => FetchProduct(category.current.id, 1)} />
                }
                {[...Array(currentPage + 2)].map((elementInArray, index) => (
                    currentPage == index + 1 ?
                        <Pagination.Item active onClick={e => FetchProduct(category.current.id, index + 1)}>{index + 1}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchProduct(category.current.id, index + 1)}>{index + 1}</Pagination.Item>
                )
                )}
                <Pagination.Ellipsis />
                <Pagination.Item onClick={e => FetchProduct(category.current.id, pageNumber.current)}>{pageNumber.current}</Pagination.Item>
                <Pagination.Last />
            </Pagination>
        }
        else if (currentPage > pageNumber.current - 3) {
            return <Pagination>
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First onClick={e => FetchProduct(category.current.id, 1)} />
                }
                <Pagination.Item onClick={e => FetchProduct(category.current.id, 1)}>1</Pagination.Item >

                <Pagination.Ellipsis />

                {[...Array(3)].map((elementInArray, index) => (
                    currentPage == pageNumber.current - 2 + index ?
                        <Pagination.Item active>{pageNumber.current - 2 + index}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchProduct(category.current.id, pageNumber.current - 2 + index)}>{pageNumber.current - 2 + index}</Pagination.Item>
                )
                )}
                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last onClick={e => FetchProduct(category.current.id, pageNumber.current)} />
                }
            </Pagination>
        }
        else {
            return <Pagination>
                {
                    currentPage == 1 ? <Pagination.First disabled /> : <Pagination.First onClick={e => FetchProduct(category.current.id, 1)} />
                }
                <Pagination.Item>1</Pagination.Item>

                <Pagination.Ellipsis />

                {[...Array(3)].map((elementInArray, index) => (
                    currentPage == currentPage - 1 + index ?
                        <Pagination.Item active>{currentPage - 1 + index}</Pagination.Item>
                        :
                        <Pagination.Item onClick={e => FetchProduct(category.current.id, currentPage - 1 + index)}>{currentPage - 1 + index}</Pagination.Item>
                )
                )}
                <Pagination.Ellipsis />
                <Pagination.Item onClick={e => FetchProduct(category.current.id, pageNumber.current)}>{pageNumber.current}</Pagination.Item>

                {
                    currentPage == pageNumber.current ? <Pagination.Last disabled /> : <Pagination.Last onClick={e => FetchProduct(category.current.id, pageNumber.current)} />
                }

            </Pagination>
        }
    }
    useEffect(() => {
    }, [])
    useEffect(() => {
    }, [products])


    useEffect(() => {
        isLoading.current = false
        forceUpdate()
    }, [listCategories])
    useEffect(() => {
        clickCategory(category.current)

    }, [shirtData])
    useEffect(() => {
        window.scrollTo(0, 0)
        setLoadingProduct(true)
        isLoading.current = true
        const url = variables.API_URL + "Category"
        axious.get(url).then((result) => {
            console.log(result.data)
            data.current = result.data.data
            console.log(data.current)
            category.current = data.current.find(d => d.type === 'ÁO' && d.gender === gender)
            console.log(category.current)
            var ShirtData = data.current.filter(d => d.gender === gender)
            console.log(ShirtData)
            setShirtData(ShirtData)
            const uniqueCategories = [];
            for (let i = 0; i < ShirtData.length; i++) {
                if (!uniqueCategories.includes(ShirtData[i].type)) {
                    uniqueCategories.push(ShirtData[i].type);
                }
            }
            setListCategories(uniqueCategories);
            FetchProduct(category.current['id'], 1)
            console.log(uniqueCategories)
        }).catch((error) => {
            console.log("product error", error)
        })
            .finally(setLoadingProduct(false))
    }, [gender])



    const FetchProduct = async (param, page) => {
        setLoadingProduct(true)
        forceUpdate()
        let url = ''
        console.log(isSearching.current)
        isSearching.current ?
            url = variables.API_URL + `Product/search/${param}/${page}` :
            url = variables.API_URL + `Product/Category/${param}?page=${page}`
        axious.get(url).then((result) => {
            console.log(result)
            productsArray = result.data['data'].products
            // var parsedData = productsArray.map(el => 
            //     el.images = el.images.filter(x => x.colorId != null))
            // parsedData = parsedData.filter(d => d.images.length > 0 )
            setPage(page)
            setProducts(productsArray)
            setCate(productsArray[0].category.name)
            pageNumber.current = result.data.data.pages
            setLoadingProduct(false)

        }).catch((error) => {
            console.log(error)
            setLoadingProduct(false)
        }).finally(

        )
    }
    const clickCategory = (category) => {
        try {
            const listElement = document.getElementsByClassName("categories-button")
            if (listElement.length > 0) {
                var element = document.getElementById(category['id']);

                if (!element.classList.contains('clicked')) {
                    Array.from(listElement).forEach(Element => {
                        if (Element.classList.contains('clicked')) {
                            Element.classList.remove("clicked")
                            Element.style.backgroundColor = "transparent"
                            Element.style.color = "#000"
                        }
                    });
                    element.classList.add("clicked")
                    element.style.backgroundColor = "#000"
                    element.style.color = "#fff"
                    category.current = category
                }
                FetchProduct(category['id'], 1)
            }
        }
        catch (e) {
            alert(e)
        }


    }
    function CheckCategory(event, category) {
        isSearching.current = false
        clickCategory(category)
    }
    const handleCategoryClick = (category) => {
        // Handle category selection
        console.log(`Selected category: ${category}`);
        // console.log(props.gender)
    };

    const handleSearch = (e) => {
        e.preventDefault();
        isSearching.current = true
        setSearchResult(searchInput.current.value)
        FetchProduct(searchInput.current.value, 1)

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
                <div className='container'>
                    <div className='row'>
                        <div className='col-4 sticky-top pt-5 align-self-start'>
                            <form class="input-group pt-5" onSubmit={(e) => handleSearch(e)}>
                                <input ref={searchInput} type="text" class="form-control" style={{ height: '2em' }} placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                <button type="submit" class="btn btn-secondary" id="button-addon2"><i className="fa fa-search"></i></button>
                            </form>
                            <Accordion defaultActiveKey="0">
                                {listCategories.map((category, index) => <Accordion.Item eventKey={index}>
                                    <Accordion.Header>{category}</Accordion.Header>
                                    <Accordion.Body>
                                        {shirtData.filter(d => d.type == category && d.gender == gender).map((sCategory => <div className='categories'>
                                            <button id={sCategory.id} className='categories-button' onClick={event => CheckCategory(event, sCategory)}>
                                                {sCategory.name}
                                            </button>
                                        </div>))}
                                    </Accordion.Body>
                                </Accordion.Item>)}

                            </Accordion>
                            {/* <div className='small-container'>
                            <div className="row-2">
                                <div className='genres'><br /> <h3>Áo</h3></div>
                                <div className='categories'>
                                    {shirtData.map((category) => <button id={category['id']} className='categories-button' onClick={event => CheckCategory(event, category)}>{category['name']}</button>)}
                                </div>
                                <div className='genresee'> <h3>Quần</h3></div>
                                <div className='categories'>
                                    {pantData.map((category) => <button id={category['id']} className='categories-button' onClick={event => CheckCategory(event, category)}>{category['name']}</button>)}
                                </div>
                            </div>
                        </div> */}
                        </div>
                        <div className='col-8'>
                            <div className="small-container">
                                <div className="row row-2">

                                    {/* <select>
                            <option>Default sorting</option>
                            <option>Sort by price</option>
                            <option>Sort by popularity</option>
                            <option>Sort by rating</option>
                            <option>Sort by sales</option>
                        </select> */}
                                </div>

                                <div className="row">
                                    {
                                        loadingProduct ? <ColorRing
                                            visible={true}
                                            height="80"
                                            width="80"

                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                        />
                                            :
                                            <div className='row'>
                                                {
                                                    isSearching.current ?
                                                        <h2>{`Kết quả tìm kiếm ${searchResult}:`}</h2>
                                                        : <h2>{`${currentCategory} ${gender}`}</h2>
                                                }
                                                {
                                                    products.map((product) =>
                                                        isSearching.current ?
                                                            <Card product={product} />
                                                            :
                                                            <Card product={product} category={currentCategory} />

                                                        // <div class="col-lg-4 col-md-12 mb-4">
                                                        //     <div class="card">
                                                        //         <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                                        //             data-mdb-ripple-color="light">
                                                        //             <img src={getImgURL(product.images)} alt=""
                                                        //                 class="w-100" />
                                                        //             <a href="#!">
                                                        //                 <div class="mask">
                                                        //                     <div class="d-flex justify-content-start align-items-end h-100">
                                                        //                         <h5><span class="badge bg-primary ms-2">New</span></h5>
                                                        //                     </div>
                                                        //                 </div>
                                                        //             </a>
                                                        //         </div>
                                                        //         <div class="card-body">
                                                        //             <Link to='/Detail' state={product}>
                                                        //                 <a href="" class="text-reset">
                                                        //                     <h5 class="card-title mb-3">{product.title}</h5>
                                                        //                 </a>
                                                        //             </Link>

                                                        //             <a href="" class="text-reset">
                                                        //                 <p>{currentCategory}</p>
                                                        //             </a>
                                                        //             <h6 class="mb-3">{product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h6>
                                                        //         </div>
                                                        //     </div>
                                                        // </div>
                                                        // <div className="col-4">
                                                        //     <Link to='/Detail' state={product}>
                                                        //         <img src={product.images[0].url} alt="" />
                                                        //         <h4 >{product.title}</h4>
                                                        //     </Link>
                                                        //     <div className="rating">
                                                        //         <i className="fa fa-star"></i>
                                                        //         <i className="fa fa-star"></i>
                                                        //         <i className="fa fa-star"></i>
                                                        //         <i className="fa fa-star"></i>
                                                        //         <i className="fa fa-star-o"></i>
                                                        //     </div>
                                                        //     <p>{product.variants[0].originalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                                        // </div>
                                                    )
                                                }
                                                <div>
                                                    {pageComponent()}
                                                </div>
                                            </div>

                                    }
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            }
        </>
    )
}

export default Product

export async function loader() {

}
import React from 'react'
import { useEffect, useState } from 'react';
import { Card, Accordion, Form, Button } from 'react-bootstrap';

const FilterBar = (props) => {
    const [listCategories, setListCategories] = useState([])
    useEffect(() => {
        const uniqueCategories = [];
        for (let i = 0; i < props.categories.length; i++) {
            if (!uniqueCategories.includes(props.categories[i].type)) {
                uniqueCategories.push(props.categories[i].type);
            }
        }
        setListCategories(uniqueCategories);
    }, []);

    return (
        <>


        </>

    )
}

export default FilterBar
import React from 'react'
import { Link } from "react-router-dom";

const CategoryTile = ({ name, category }) => (
    <div>
        <Link to={`/blog/${category}`}>{name}</Link>
    </div>
)

export default CategoryTile
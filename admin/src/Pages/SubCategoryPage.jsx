import React from 'react'
import AddSubcategoryForm from '../Components/Subcategory/AddSubcategoryForm'
import GetSubcategory from '../Components/Subcategory/GetSubcategory'

export default function SubCategoryPage() {
  return (
    <>
    <div className="container">
        <AddSubcategoryForm/>
        <br></br>
        <GetSubcategory/>
    </div>
    </>
  )
}

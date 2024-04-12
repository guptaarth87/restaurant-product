import React from 'react'
import AddCategoryForm from '../Components/Category/AddCategoryForm'
import GetCategory from '../Components/Category/GetCategory'

export default function CategoryPage() {
  return (
    <>
    <div className="container">
    <AddCategoryForm/>
    <br></br>
    <GetCategory/>
    </div>
    </>
  )
}

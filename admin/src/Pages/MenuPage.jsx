import React from 'react'
import AddMenuForm from '../Components/AddMenuForm/AddMenuForm'
import GetMenu from '../Components/AddMenuForm/GetMenu'

export default function MenuPage() {
  return (
   <>
   <div className="container">
    <AddMenuForm/>
    <GetMenu/>
   </div>
   </>
  )
}

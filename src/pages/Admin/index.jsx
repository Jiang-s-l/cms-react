import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Admin() {
  const a = useLocation()
  console.log("@",a);

  return (
    <div>Admin</div>
  )
}

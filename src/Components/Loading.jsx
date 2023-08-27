import React from 'react'

export default function Loading({ring}) {
  return (
    <div className="container-mine flex">
    <div className={`lds-ring${ring?ring:''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  )
}

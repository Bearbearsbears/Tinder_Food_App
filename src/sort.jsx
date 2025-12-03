import React from 'react'

Function sort({}){
  return(
  <div classname='flex justify-content-center'>
    {
      .map(val => (
        <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold'>
              {val}
        </button>
    ))
    }
        <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold ${filter==='all}'>
          All
        </button>
  </div>
}

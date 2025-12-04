import React from 'react'
//buttons for the filter function-- based upon breakfast, lunch, and dinner. Default 'all' would display all items regardless of filter
    <div classname='flex justify-content-center'>
        <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold ${filter==='all'}'}>
              All
        </button>
    <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold ${filter==='Breakfast'}'}>
              Breakfast
        </button>
            <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold ${filter==='Lunch'}'}>
              Lunch
        </button>
            <button 
          classname= {'p-1 px-2 mx-4 btn fw-bold ${filter==='Dinner'}'}>
          Dinner
        </button>
            
  </div>
}

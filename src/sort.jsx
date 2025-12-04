import React, { useState } from "react";
//buttons for the filter function-- based upon breakfast, lunch, and dinner. Default 'all' would display all items regardless of filter

export default function Sort() {
    const[filter, setFilter] = useState("all");

    return (
      <div className='flex justify-content-center'>
        
        <button 
          className= {'p-1 px-2 mx-4 btn fw-bold ${filter==="all"}'}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button 
          className= {'p-1 px-2 mx-4 btn fw-bold ${filter==="Breakfast"}'}
          onClick={() => setFilter("Breakfast")}
        >
          Breakfast
        </button>

        <button 
          className= {'p-1 px-2 mx-4 btn fw-bold ${filter==="Lunch"}'}
          onClick={() => setFilter("Lunch")}
        >
          Lunch
        </button>

        <button 
          className= {'p-1 px-2 mx-4 btn fw-bold ${filter==="Dinner"}'}
          onClick={() => setFilter("Dinner")}
        >
          Dinner
        </button>
        
      </div>
    );
}


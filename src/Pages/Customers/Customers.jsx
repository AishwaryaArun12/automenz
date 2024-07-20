import React, { useState } from 'react'
import AddCustomer from './AddCustomer'

const Customers = () => {
  const [open, setOpen] = useState(false)
  return (
    <div class="min-h-screen  text-white p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl">Customers</h1>
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="bg-[#0A0A0B] text-white p-2 pl-10 rounded-md focus:outline-none"
          />
          <svg
            class="w-5 h-5 text-zinc-500 absolute left-3 top-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
              <button onClick={()=>{setOpen(true)}} className="text-black  p-2 inline-flex font-semibold items-center h-9 rounded-lg bg-yellow-400">
                Add Customers
              </button>
            </div>
      </div>
      
      <div class="bg-[#0A0A0B] p-4 rounded-lg shadow-md overflow-x-auto">
        <table class="min-w-full text-left">
          <thead className="border-b border-b-zinc-700">
            <tr>
              <th class="px-4 py-2">Customer name</th>
              <th class="px-4 py-2">id</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Location</th>
              <th class="px-4 py-2">No of Vehicles</th>
              <th className='px-4 py-2'>Edit</th>
              <th class="px-4 py-2">More Info</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="px-4 py-2 flex items-center">
                <img
                  src="https://placehold.co/40x40"
                  alt="Customer"
                  class="w-10 h-10 rounded-full mr-4"
                />
                Aswin Shyam
              </td>
              <td class="px-4 py-2">#232</td>
              <td class="px-4 py-2">albinvargees07@gmail.com</td>
              <td class="px-4 py-2 flex items-center">
                
                India
              </td>
              <td class="px-4 py-2">
                <span class="text-yellow-500">★★★★★</span>
              </td>
              <td><button className="p-2 mx-5 bg-yellow-400 rounded-md" onClick={()=>{setBankId(account._id),setEditBank(true)}}>
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.59647 11.4728L1 13L1.17582 9.99259L6.61001 1.09714C6.63833 1.0512 6.68368 1.01832 6.73615 1.00569C6.78862 0.993047 6.84396 1.00167 6.8901 1.02967L8.96318 2.29724C9.00912 2.32556 9.042 2.37091 9.05463 2.42338C9.06727 2.47585 9.05865 2.53119 9.03065 2.57733L3.59647 11.4728Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.74219 2.51367L8.16283 3.99386" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.05469 11.9102L1.9379 12.4499" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button></td>
              <td class="px-4 py-2 text-green-500"><div
         
         //  onClick={() => {
         //    console.log(currency)
         //    navigate("/food/vendor/FoodOverview", {
         //      state: { productDetails: product,currency:currency},
         //    });
         //  }}
          className="bg-yellow-400 rounded-full w-10 h-10 p-2 px-4  cursor-pointer"
        >
          {" "}
          <img
            src="/Vector.png"
            className={` w-4 h-5 translate`}
            alt=""
          />
        </div></td>
            </tr>

            <tr class="border-b border-zinc-700">
              <td class="px-4 py-2 flex items-center">
                <img
                  src="https://placehold.co/40x40"
                  alt="Customer"
                  class="w-10 h-10 rounded-full mr-4"
                />
                Aswin Shyam
              </td>
              <td class="px-4 py-2">#232</td>
              <td class="px-4 py-2">albinvargees07@gmail.com</td>
              <td class="px-4 py-2 flex items-center">

                India
              </td>
              <td class="px-4 py-2">
                <span class="text-yellow-500">★★★★★</span>
              </td>
              <td><button className="p-2 mx-5 bg-yellow-400 rounded-md" onClick={()=>{setBankId(account._id),setEditBank(true)}}>
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.59647 11.4728L1 13L1.17582 9.99259L6.61001 1.09714C6.63833 1.0512 6.68368 1.01832 6.73615 1.00569C6.78862 0.993047 6.84396 1.00167 6.8901 1.02967L8.96318 2.29724C9.00912 2.32556 9.042 2.37091 9.05463 2.42338C9.06727 2.47585 9.05865 2.53119 9.03065 2.57733L3.59647 11.4728Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.74219 2.51367L8.16283 3.99386" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.05469 11.9102L1.9379 12.4499" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button></td>
              <td class="px-4 py-2 text-red-500"><div
         
        //  onClick={() => {
        //    console.log(currency)
        //    navigate("/food/vendor/FoodOverview", {
        //      state: { productDetails: product,currency:currency},
        //    });
        //  }}
         className="bg-yellow-400 rounded-full w-10 h-10 p-2 px-4  cursor-pointer"
       >
         {" "}
         <img
           src="/Vector.png"
           className={` w-4 h-5 translate`}
           alt=""
         />
       </div></td>
            </tr>
          </tbody>
        </table>
      </div>
      {open &&  <AddCustomer setOpen={setOpen}/>}
    </div>
  )
}

export default Customers

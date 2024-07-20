import React from 'react'

const EditCustomerModal = ({}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40'>
    <div className="bg-white w-full max-w-3xl p-12 top-3 h-[95vh] overflow-auto rounded-lg shadow-md relative">
        <div className='flex justify-between items-center'>

          <h2 className="text-2xl font-semibold mb-4">Edit Customer</h2>
          <div className='rounded-full border border-orange-500 px-2 cursor-pointer'>

          <button onClick={()=>setOpen(false)} className="text-red-500 text-xl">&times;</button>
          </div>
        </div>
          <div className='flex justify-center '>

          <div className="flex w-fit justify-center mb-6 relative">
          <img className="w-48 h-48 object-cover rounded-lg" src={data.image ? data.image :'https://placehold.co/150'} alt="Clinic profile picture" />

            <div onClick={handleImageEdit} className='p-1 rounded-sm bg-white bg-opacity-50 absolute bottom-4 right-4'>

            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8572 1.90446L20.096 0.141533C19.9073 -0.0471777 19.6007 -0.0471777 19.412 0.141533L17.8153 1.73653L15.7556 3.79621V1.37695C15.7556 1.10929 15.5395 0.893198 15.2719 0.893198H0.483754C0.217799 0.893198 0 1.10929 0 1.3772V13.7573C0 14.025 0.217799 14.241 0.483754 14.241H15.2719C15.5395 14.241 15.7556 14.025 15.7556 13.7573V8.69144L20.2619 4.18366L21.8572 2.58866C22.0476 2.3997 22.0476 2.09317 21.8572 1.90446ZM0.967753 1.86095H14.7881V4.76421L12.8753 6.67869L11.3771 5.18196C11.1884 4.99325 10.8819 4.99325 10.6932 5.18196L5.86909 10.0058L4.31761 8.45262C4.12719 8.26391 3.82237 8.26391 3.63219 8.45262L0.967753 11.1171V1.86095ZM14.7881 13.2735H0.967753V12.485L3.97417 9.48026L5.52736 11.0317C5.71607 11.2205 6.02261 11.2205 6.21132 11.0317L11.0354 6.20765L12.1902 7.36411L11.6546 7.89969C11.6111 7.9432 11.5756 7.99478 11.5514 8.05124L10.2322 11.1317C10.1547 11.3141 10.195 11.5253 10.3353 11.6656C10.4289 11.7575 10.5514 11.8076 10.6773 11.8076C10.7418 11.8076 10.8064 11.7947 10.8677 11.7673L13.9499 10.448C14.0064 10.4238 14.058 10.3898 14.1015 10.3463L14.7886 9.65919V13.2735H14.7881ZM12.2285 8.92855L13.0704 9.77213L11.5979 10.4028L12.2285 8.92855ZM14.9301 8.1478C14.9189 8.15904 14.9091 8.17029 14.8979 8.18178L13.6446 9.43333L12.5671 8.35435L13.2058 7.71562C13.209 7.71244 13.2139 7.70927 13.2171 7.70585C13.222 7.70096 13.2269 7.69607 13.2315 7.68971L18.1942 2.72873L19.2717 3.80599L14.9301 8.1478ZM19.7283 3.34961L18.6508 2.27235L19.754 1.16917L20.8313 2.24644L19.7283 3.34961Z" fill="black"/>
            </svg>
            </div>

          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Clinic Name</label>
              <input 
type="text" 
value={data.clinicName} 
onChange={(e) => setdata({...data, clinicName: e.target.value})}
className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" 
/>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">Contact Number</label>
              <input type="text" className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm p-2" value={data.contactNumber} onChange={(e) => setdata({...data, contactNumber: e.target.value})} />
            </div>
          </div>
          <div className="mb-6">
<h3 className="text-lg font-medium mb-2">Availability</h3>
<div className="grid grid-cols-1 gap-4 p-3">
{data.workingDays && data?.workingDays?.map((day) => (
  <div key={day.day} className="grid grid-cols-4 gap-6">
    <span>{day.day}</span>
    <input
type="time"
value={day.open ? new Date(day.open).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : ''}
onChange={(e) => {
const updatedWorkingDays = data.workingDays.map(d => 
  d.day === day.day ? {
    ...d, 
    open: e.target.value ? new Date(`2000-01-01T${e.target.value}:00`) : null
  } : d
);
setdata({...data, workingDays: updatedWorkingDays});
}}
className="border border-zinc-300 rounded-md p-1"
disabled={day.isClosed}
/>
<input
type="time"
value={day.close ? new Date(day.close).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : ''}
onChange={(e) => {
const updatedWorkingDays = data.workingDays.map(d => 
  d.day === day.day ? {
    ...d, 
    close: e.target.value ? new Date(`2000-01-01T${e.target.value}:00`) : null
  } : d
);
setdata({...data, workingDays: updatedWorkingDays});
}}
className="border border-zinc-300 rounded-md p-1"
disabled={day.isClosed}
/>
    <label>
      <input
        type="checkbox"
        checked={day.isClosed}
        onChange={(e) => {
          const updatedWorkingDays = data.workingDays.map(d => 
            d.day === day.day ? {...d, isClosed: e.target.checked,close:null, open:null} : d
          );
          setdata({...data, workingDays: updatedWorkingDays});
        }}
        className="form-checkbox h-5 mr-1 w-5 text-red-600"
      /> Close
    </label>
  </div>
))}
</div>
</div>
<div className="mb-6">
<div className='flex justify-between'>
<h3 className="text-lg font-medium mb-2">Vehicles Details</h3>
<button onClick={()=> setAddBank(true)} className="mb-2 p-2 bg-[#F5895A33] text-secondary-foreground rounded-md">Add Account</button>
{addBank && <AddBank setdata={setdata} setAddBank={setAddBank}/>}
</div>
<div className="space-y-4">
{data.bankDetails.map((account, index) => (
  <div key={index} className="grid grid-cols-6 flex items-center  p-4 border border-zinc-300 rounded-md">
    <div className="flex items-center space-x-4 col-span-3">
      <img src="https://placehold.co/40" alt={`${account.bankName} logo`} className="w-10 h-10" />
      <div>
        <p className="font-medium">{account.bankName}</p>
        <p className="text-sm text-zinc-500">XXXXXXXXXXXX{account.accountNumber.slice(-4)}</p>
      </div>
    </div>
    <div className='items-center flex space-x-4 col-span-2'>
      <button className="p-2 bg-[#F5895A33] rounded-md" onClick={()=>{setBankId(account._id),setEditBank(true)}}>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.59647 11.4728L1 13L1.17582 9.99259L6.61001 1.09714C6.63833 1.0512 6.68368 1.01832 6.73615 1.00569C6.78862 0.993047 6.84396 1.00167 6.8901 1.02967L8.96318 2.29724C9.00912 2.32556 9.042 2.37091 9.05463 2.42338C9.06727 2.47585 9.05865 2.53119 9.03065 2.57733L3.59647 11.4728Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.74219 2.51367L8.16283 3.99386" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.05469 11.9102L1.9379 12.4499" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button className="p-2 bg-[#EE515833] rounded-md">
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.65441 14C8.44782 14 8.28012 13.8323 8.28012 13.6257C8.28012 13.4179 8.4454 13.252 8.66171 13.252C8.8683 13.252 9.03601 13.4191 9.03601 13.6257C9.03601 13.8335 8.87073 14 8.65441 14ZM0.374219 1.96331H3.31281V0.37369C3.31281 0.167097 3.48051 0 3.6865 0H6.81891C7.0255 0 7.19321 0.167704 7.19321 0.37369V1.96331H10.1318C10.3384 1.96331 10.5061 2.13101 10.5061 2.3376V3.78439C10.5061 3.99098 10.3384 4.15869 10.1318 4.15869L0.374297 4.15808C0.167704 4.15808 0 3.99098 0 3.78378V2.337C0 2.1304 0.167704 1.9627 0.374297 1.9627L0.374219 1.96331ZM9.75792 2.71131H0.747862V3.41009H9.7573V2.71131H9.75792ZM7.42584 13.252H2.1589L0.81724 5.42621H9.6887L8.50138 12.352C8.46674 12.5555 8.60346 12.7482 8.80701 12.7828C9.01057 12.8174 9.2032 12.6807 9.23782 12.4772L10.4962 5.13574C10.5461 4.88539 10.3644 4.67759 10.1316 4.67759L0.374141 4.67819C0.145662 4.67819 -0.0329777 4.886 0.00591111 5.11509L1.47275 13.6694C1.49402 13.8553 1.6526 13.9999 1.84462 13.9999H7.4264C7.63299 13.9999 7.80009 13.8322 7.80009 13.6256C7.80009 13.419 7.63239 13.2519 7.4264 13.2519L7.42584 13.252ZM6.44511 0.748049H4.06139V1.96332H6.44511V0.748049Z" fill="#EE5158"/>
        </svg>
      </button>
    </div>
    {account.isPrimary && <span className="text-sm text-[#F5895A]">Primary</span>}
  </div>
))}
</div>
</div>
{
editBank && <EditBank data={data} setEditBank={setEditBank} setdata={setdata} id={bankId}/>
}
          <div className="flex justify-center">
            <button onClick={handleSubmit} className="px-6 py-2 bg-[#F5895A] text-white rounded-md">Submit</button>
          </div>
        </div>      
</div>
  )
}

export default EditCustomerModal

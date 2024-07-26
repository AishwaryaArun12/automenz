import React from 'react'

const DeleteModal = ({deleteFn,setDeleteModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-80">
              <div className="bg-[#151515] shadow-lg shadow-red-800 rounded-sm p-9  relative">
                <button className="absolute top-2 right-2 text-muted-foreground hover:text-muted-foreground/80">
                  <img onClick={()=>setDeleteModal(false)} undefinedhidden="true" alt="close" src="https://openui.fly.dev/openui/24x24.svg?text=✖️" />
                </button>
                <h2 className="text-xl font-bold mb-4">Delete</h2>
                <p className="text-muted-foreground mb-6">Are you sure you want to delete 1 selected item?</p>
                <div className="flex justify-end space-x-4 mt-3">
                  <button onClick={()=> setDeleteModal(false)} className="text-red-600 hover:text-destructive/80">Cancel</button>
                  <button onClick={()=>deleteFn()}  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-destructive/80">Delete</button>
                </div>
              </div>
            </div>
  )
}

export default DeleteModal

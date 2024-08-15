import React from "react"

const Card = ({title,name,url})=>{

    return(
    <div className=" border p-4">
        <h1 className="text-lg">Name : {name}</h1>
        <h1 className="text-lg">Title : {title}</h1>

        <h1 className="text-lg">URL : {url}</h1>

    </div>
    )
}
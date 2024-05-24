import React from 'react'

function CategoryForm({ handleSubmit , value , setValue }) {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter New Category" value = {value} onChange={(e) => setValue(e.target.value)} />
            </div>
        
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default CategoryForm

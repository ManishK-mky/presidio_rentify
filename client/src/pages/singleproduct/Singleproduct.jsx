import Header from "../../components/Layout/Header"
import './style.css'


const Singleproduct = () => {
  return (
    <>
    <Header/>
    <div className="d-flex justify-content-center mt-4">
    <div className="pwrap">
      <div className="pimmg">
        <div className="image"></div>
      </div>
      <div className="pinfo px-4">
        <div className="ptitle"><h2>Product Title</h2></div>
        <div className="pprice"><span className="price">Price:</span> $100</div>
        <div className="pdesc"><span className="price">Description:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ante nec placerat aliquam, justo metus ultrices nunc, in facilisis sapien lacus ut ante. Nullam auctor, ante nec placerat aliquam, justo metus ultrices nunc, in facilisis sapien lacus ut ante.</div>
        <div className="pbtn">Buy Now</div>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Singleproduct
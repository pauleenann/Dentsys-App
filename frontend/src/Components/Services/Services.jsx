import './Services.css'
import teethExamine from '../../Assets/teethExamine.jpg'
import veeners from '../../Assets/veeners.jpg'
import braces from '../../Assets/braces.jpg'

const Services = () => {
  return (
    <div className='services-container container '>
        <h2 className='services-h2'>Services Offered</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
  <div className="col">
    <div className="card services-card h-100 ">
      <img src={teethExamine} className="card-img-top" alt="..."/>
      <div className="card-body services-body">
        <h5 className="card-title services-title">Teeth Whitening</h5>
        <p className="card-text services-text">Say goodbye to stains and discoloration with our safe and effective teeth whitening treatments.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card services-card h-100">
      <img src={veeners} className="card-img-top" alt="..."/>
      <div className="card-body services-body">
        <h5 className="card-title services-title">Veneers</h5>
        <p className="card-text services-text">Say hello to a flawless smile with our premium veneer treatments.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card services-card h-100">
      <img src={braces} className="card-img-top" alt="..."/>
      <div className="card-body services-body">
        <h5 className="card-title services-title">Braces</h5>
        <p className="card-text services-text">Embark on your journey to a beautifully aligned smile with our comprehensive braces treatments.</p>
      </div>
    </div>
  </div>
  </div>
  <div className="more">
    <a href="">See more</a>
    <img src="" alt="" />
  </div>
</div>
  )
}

export default Services

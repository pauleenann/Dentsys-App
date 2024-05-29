import React from 'react'
import './ServicesPage.css'
import s1 from '../../Assets/Services/s1.jpg'
import s2 from '../../Assets/Services/s2.png'
import s3 from '../../Assets/Services/s3.jpg'
import s4 from '../../Assets/Services/s4.jpg'
import s5 from '../../Assets/Services/s5.jpg'
import s6 from '../../Assets/Services/s6.jpg'
import s7 from '../../Assets/Services/s7.jpeg'
import s8 from '../../Assets/Services/s8.jpg'
import s9 from '../../Assets/Services/s9.jpg'
import s10 from '../../Assets/Services/s10.jpg'

const ServicesPage = () => {
  return (
    <div className='services-page-container container my-5'>
      <h1 className='my-4'>Services Offered</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
  <div className="col">
    <div className="card h-100">
      <img src={s8} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Teeth Whitening</h5>
        <p className="card-text">Say goodbye to stains and discoloration with our safe and effective teeth whitening treatments.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s9} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Veneers</h5>
        <p className="card-text">Say hello to a flawless smile with our premium veneer treatments.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s1} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Braces</h5>
        <p className="card-text">Embark on your journey to a beautifully aligned smile with our comprehensive braces treatments.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s2} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Composite Restoration</h5>
        <p className="card-text">Our skilled dental team uses advanced composite materials to repair chipped, cracked, or decayed teeth seamlessly</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s7} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Dentures</h5>
        <p className="card-text">Restore your smile's beauty and function with our custom-crafted denture solutions.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s10} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Wisdom Tooth Removal</h5>
        <p className="card-text">Trust our experienced dental team to safely and efficiently remove troublesome wisdom teeth.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s4} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Dental Bridges</h5>
        <p className="card-text">Regain the confidence to eat, speak, and smile with our expertly crafted dental bridges.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s6} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Dental Implants</h5>
        <p className="card-text">Experience the next best thing to natural teeth with our state-of-the-art dental implant solutions.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s5} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Dental Crowns</h5>
        <p className="card-text">Restore strength, functionality, and beauty to damaged or weakened teeth with our custom-crafted dental crowns.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={s3} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title service-title">Dental Bridges</h5>
        <p className="card-text">Regain the confidence to eat, speak, and smile with our expertly crafted dental bridges.</p>
      </div>
    </div>
  </div>
  
  
</div>
    </div>
  )
}

export default ServicesPage

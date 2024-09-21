import React, { useRef } from 'react'
import NavBar from '../Components/NavBar/NavBar'
import './../Styles/Home.css'
import teethExamine from '../Assets/teethExamine.jpg'
import veeners from '../Assets/veeners.jpg'
import braces from '../Assets/braces.jpg'

import { Link } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'


const Home = () => {
    const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const scrollToAboutUs = (e) => {
    e.preventDefault();
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToServices = (e) => {
    e.preventDefault();
    if (aboutUsRef.current) {
     servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
        <NavBar onAboutUsClick={scrollToAboutUs} onServicesClick={scrollToServices}/>
        {/* hero section */}
        <section className='home-header'>
            <div className="overlay">
                <div className="home-container">
                    {/* header */}
                    <div className="home-cont-header">
                        <h5 className='home-title'>Toothie Cutie</h5>
                        <p className='home-subtitle'>Verdant Clinic</p>
                    </div>
                    <div className="home-cont-body">
                        {/* text */}
                        <p className='m-0'>
                        Your path to <br/>dental wellness starts here
                        </p>
                        {/* button */}
                        <Link to="/appointment" className="btn appointment-btn">Book an appointment</Link>
                    </div>
                </div>
            </div>
        </section>
        {/* service section */}
        <section className='home-service' ref={servicesRef}>
            <p className="home-service-title m-0">
                Services Offered
            </p>
            {/* card */}
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
                <Link to='/services-page' className='service-see-more'>See more</Link>
        </section>
        {/* about us*/}
        <section className='home-about-us' ref={aboutUsRef}>
                {/* image */}
                <div className="about-us-img">

                </div>
                {/* info */}
                <div className="about-us-info">
                    <p className="about-us-title m-0">
                        About us
                    </p>
                    <div className="about-us-subtitle ">
                        <p className="m-0">
                        At Toothie Cutie, we're not just about dental care; we're about crafting beautiful, healthy smiles that light up faces. </p>
                        <p className="m-0">
                           Our expert team combines compassion with cutting-edge technology to provide personalized care tailored to your unique needs.  
                        </p>
                        <p className="m-0">
                            From routine check-ups to advanced treatments, we're dedicated to ensuring your dental experience is comfortable, enjoyable, and, most importantly, leaves you grinning from ear to ear.
                        </p>
                    </div>
                </div>

        </section>
        {/* footer */}
        <Footer/>
      
    </div>
  )
}

export default Home

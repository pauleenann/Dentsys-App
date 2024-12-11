import React, { useEffect } from 'react'
import './AddDentalHistory.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import AdminInfo from '../AdminInfo/AdminInfo'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import tooth1 from './../../Assets/Tooth/tooth1.png'
import tooth2 from './../../Assets/Tooth/tooth2.png'
import tooth3 from './../../Assets/Tooth/tooth3.png'
import tooth4 from './../../Assets/Tooth/tooth4.png'
import tooth5 from './../../Assets/Tooth/tooth5.png'
import tooth6 from './../../Assets/Tooth/tooth6.png'
import tooth7 from './../../Assets/Tooth/tooth7.png'
import tooth8 from './../../Assets/Tooth/tooth8.png'
import tooth9 from './../../Assets/Tooth/tooth9.png'
import tooth10 from './../../Assets/Tooth/tooth10.png'
import tooth11 from './../../Assets/Tooth/tooth11.png'
import tooth12 from './../../Assets/Tooth/tooth12.png'
import tooth13 from './../../Assets/Tooth/tooth13.png'
import tooth14 from './../../Assets/Tooth/tooth14.png'
import tooth15 from './../../Assets/Tooth/tooth15.png'
import tooth16 from './../../Assets/Tooth/tooth16.png'
import tooth17 from './../../Assets/Tooth/tooth17.png'
import tooth18 from './../../Assets/Tooth/tooth18.png'
import tooth19 from './../../Assets/Tooth/tooth19.png'
import tooth20 from './../../Assets/Tooth/tooth20.png'
import tooth21 from './../../Assets/Tooth/tooth21.png'
import tooth22 from './../../Assets/Tooth/tooth22.png'
import tooth23 from './../../Assets/Tooth/tooth23.png'
import tooth24 from './../../Assets/Tooth/tooth24.png'
import tooth25 from './../../Assets/Tooth/tooth25.png'
import tooth26 from './../../Assets/Tooth/tooth26.png'
import tooth27 from './../../Assets/Tooth/tooth27.png'
import tooth28 from './../../Assets/Tooth/tooth28.png'
import tooth29 from './../../Assets/Tooth/tooth29.png'
import tooth30 from './../../Assets/Tooth/tooth30.png'
import tooth31 from './../../Assets/Tooth/tooth31.png'
import tooth32 from './../../Assets/Tooth/tooth32.png'
import selected1 from './../../Assets/Tooth Selected/selected1.png'
import selected2 from './../../Assets/Tooth Selected/selected2.png'
import selected3 from './../../Assets/Tooth Selected/selected3.png'
import selected4 from './../../Assets/Tooth Selected/selected4.png'
import selected5 from './../../Assets/Tooth Selected/selected5.png'
import selected6 from './../../Assets/Tooth Selected/selected6.png'
import selected7 from './../../Assets/Tooth Selected/selected7.png'
import selected8 from './../../Assets/Tooth Selected/selected8.png'
import selected9 from './../../Assets/Tooth Selected/selected9.png'
import selected10 from './../../Assets/Tooth Selected/selected10.png'
import selected11 from './../../Assets/Tooth Selected/selected11.png'
import selected12 from './../../Assets/Tooth Selected/selected12.png'
import selected13 from './../../Assets/Tooth Selected/selected13.png'
import selected14 from './../../Assets/Tooth Selected/selected14.png'
import selected15 from './../../Assets/Tooth Selected/selected15.png'
import selected16 from './../../Assets/Tooth Selected/selected16.png'
import selected17 from './../../Assets/Tooth Selected/selected17.png'
import selected18 from './../../Assets/Tooth Selected/selected18.png'
import selected19 from './../../Assets/Tooth Selected/selected19.png'
import selected20 from './../../Assets/Tooth Selected/selected20.png'
import selected21 from './../../Assets/Tooth Selected/selected21.png'
import selected22 from './../../Assets/Tooth Selected/selected22.png'
import selected23 from './../../Assets/Tooth Selected/selected23.png'
import selected24 from './../../Assets/Tooth Selected/selected24.png'
import selected25 from './../../Assets/Tooth Selected/selected25.png'
import selected26 from './../../Assets/Tooth Selected/selected26.png'
import selected27 from './../../Assets/Tooth Selected/selected27.png'
import selected28 from './../../Assets/Tooth Selected/selected28.png'
import selected29 from './../../Assets/Tooth Selected/selected29.png'
import selected30 from './../../Assets/Tooth Selected/selected30.png'
import selected31 from './../../Assets/Tooth Selected/selected31.png'
import selected32 from './../../Assets/Tooth Selected/selected32.png'
import isAuthenticated from '../Auth';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server


const AddService = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [services,setServices] = useState()
    const [options,setOptions] = useState()
    const [dentists, setDentists] = useState([])
    const [startingPrice,setStartingPrice] = useState(0)
    const [toothFactor,setToothFactor] = useState(0)
    const [additionalFee,setAdditionalFee] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [error, setError] = useState({
        error:'error'
    })
    const [dentalHistory, setDentalHistory] = useState({
        action: 'procedureHistory',
        p_id: id,
        p_date: '',
        p_time: '',
        p_selectedTeeth: [],
        p_dentist: '',
        p_service:'',
        p_severity_material:'',
        inv_totalamount: totalPrice,
        inv_status: 'pending',
        inv_due:'',
        inv_issue:''
    })
    const appointmentTime = [
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM"
    ]
    const toothImages = {
        1: { default: tooth1, selected: selected1 },
        2: { default: tooth2, selected: selected2 },
        3: { default: tooth3, selected: selected3 },
        4: { default: tooth4, selected: selected4 },
        5: { default: tooth5, selected: selected5 },
        6: { default: tooth6, selected: selected6 },
        7: { default: tooth7, selected: selected7 },
        8: { default: tooth8, selected: selected8 },
        9: { default: tooth9, selected: selected9 },
        10: { default: tooth10, selected: selected10 },
        11: { default: tooth11, selected: selected11 },
        12: { default: tooth12, selected: selected12 },
        13: { default: tooth13, selected: selected13 },
        14: { default: tooth14, selected: selected14 },
        15: { default: tooth15, selected: selected15 },
        16: { default: tooth16, selected: selected16 },
        17: { default: tooth17, selected: selected17 },
        18: { default: tooth18, selected: selected18 },
        19: { default: tooth19, selected: selected19 },
        20: { default: tooth20, selected: selected20 },
        21: { default: tooth21, selected: selected21 },
        22: { default: tooth22, selected: selected22 },
        23: { default: tooth23, selected: selected23 },
        24: { default: tooth24, selected: selected24 },
        25: { default: tooth25, selected: selected25 },
        26: { default: tooth26, selected: selected26 },
        27: { default: tooth27, selected: selected27 },
        28: { default: tooth28, selected: selected28 },
        29: { default: tooth29, selected: selected29 },
        30: { default: tooth30, selected: selected30 },
        31: { default: tooth31, selected: selected31 },
        32: { default: tooth32, selected: selected32 },
    };

    useEffect(()=>{
        getServices()
        getOptions()
        getDentists()
    },[])


    useEffect(()=>{
        // reset tooth factor
        setToothFactor(0)
        // reset additional fee
        setAdditionalFee('')
        //get issue and due dates
        getDates()

        switch(dentalHistory.p_service){
            case '1':
            case '3':
            case '10':
            case '11':
            case '17':
                setDentalHistory((prevdata)=>({
                    ...prevdata,
                    p_selectedTeeth: Array.from({ length: 32 }, (_, i) => i + 1)
                }))
                setToothFactor(1)
                break;
            case '7':
                if(dentalHistory.p_severity_material >=16 && dentalHistory.p_severity_material <=18){
                    setDentalHistory((prevdata)=>({
                        ...prevdata,
                        p_selectedTeeth: Array.from({ length: 32 }, (_, i) => i + 1)
                    }))
                    setToothFactor(1)
                }else if(dentalHistory.p_severity_material >=19 &&dentalHistory.p_severity_material <=21){
                    setDentalHistory((prevdata)=>({
                        ...prevdata,
                        p_selectedTeeth: Array.from({ length: 16 }, (_, i) => i + 1)
                    }))
                    setToothFactor(1)
                }else if(dentalHistory.p_severity_material >=49 &&dentalHistory.p_severity_material <=51){
                    setDentalHistory((prevdata)=>({
                        ...prevdata,
                        p_selectedTeeth: Array.from({ length: 16 }, (_, i) => i + 17)
                    }))
                    setToothFactor(1)
                }else{
                    setDentalHistory((prevdata)=>({
                        ...prevdata,
                        p_selectedTeeth: []
                    }))
                }
                break
            case '15':
                setToothFactor(1);
                break;
            default:
                setDentalHistory((prevdata)=>({
                    ...prevdata,
                    p_selectedTeeth: [],
                }))
                break;
        }
        
    },[dentalHistory.p_service,dentalHistory.p_severity_material])
    
    useEffect(()=>{
        setDentalHistory((prevdata)=>({
            ...prevdata,
            p_severity_material: '',
        }))
    },[dentalHistory.p_service])

    //useeffect for setting starting price
    useEffect(() => {
        console.log(dentalHistory.p_severity_material);
        let price = 0;
        if (options) {
            const matchingOption = options.find(
                (opt) => opt.option_id == dentalHistory.p_severity_material
            );
            price = matchingOption ? matchingOption.option_price? matchingOption.option_price:0 : 0;
        }
        setStartingPrice(parseInt(price));
    }, [dentalHistory.p_severity_material, options]);

    // useEffect for calculating total price
    useEffect(()=>{
        //if hindi siya dentures
        if(dentalHistory.p_service!=13){
             setTotalPrice((startingPrice*toothFactor)+additionalFee)
        }else{
            if(dentalHistory.p_selectedTeeth.length==1){
                setTotalPrice((startingPrice*toothFactor)+additionalFee)
            }else if(dentalHistory.p_selectedTeeth.length==0){
                setTotalPrice(0)
            }else{
                setTotalPrice(parseInt(totalPrice)+500)
            }
        }
       
    },[startingPrice,toothFactor,additionalFee])
    
    //useEffect for setting totalprice sa dentalhistory
    useEffect(()=>{
        setDentalHistory((prevdata)=>({
            ...prevdata,
            inv_totalamount: totalPrice
        }))
    },[totalPrice])

    //get dates for due and issue date
    const getDates = () =>{
        const today = new Date();

        // issue date
        const year = today.getFullYear()
        const month = today.getMonth()+1
        const day = today.getDate()
        const issueDate = `${year}-${month}-${day}`
        console.log('issue date: ',issueDate)

        switch(dentalHistory.p_severity_material){
            case '16':
                //braces, mild, 30k
                handleDue(26);
                break
            case '17':
                handleDue(31);
                break;
            case '18':
                handleDue(36);
                break;
            case '19':
            case '49':
                handleDue(34)
                break;
            case '20':
            case '50':
                handleDue(44)
                break;
            case '21':
            case '51':
                handleDue(54)
                break;
            default:
                handleDue(0)
                break;
        }
        
        // set issue date
        setDentalHistory((prevdata)=>({
            ...prevdata,
            inv_issue: issueDate
         }))
    }

    const handleDue = (month)=>{
        const future = new Date();
        future.setMonth(future.getMonth()+month)
         // due date
         const futureYear = future.getFullYear();
         const futureMonth = future.getMonth()+1;
         const futureDay = future.getDate();
         const dueDate = `${futureYear}-${futureMonth}-${futureDay}`;

         setDentalHistory((prevdata)=>({
            ...prevdata,
            inv_due: dueDate
         }))

         console.log('due date: ',dueDate)
         
    }

    const getServices = async ()=>{
        try{
            const response = await axios.get(`http://localhost:80/api2/?action=getServices`);
            setServices(response.data)
        }catch(err){
            console.log("Couldn't retrieve services: ", err.message)
        }
    }

    const getOptions = async ()=>{
        try{
            const response = await axios.get(`http://localhost:80/api2/?action=getOptions`);
            setOptions(response.data)
        }catch(err){
            console.log("Couldn't retrieve options: ", err.message)
        }
    }

    const getDentists = async()=>{
        try{
            const response = await axios.get(`http://localhost:80/api2/?action=getDentists`);
            setDentists(response.data)
        }catch(err){
            console.log("Couldn't retrieve options: ", err.message)
        }
    }

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDentalHistory((prevdata)=>({
            ...prevdata,
            [name]:value
        }))

    }

    const handleToothClick = (toothNum)=>{
        console.log('tooth clicked')
        //check if tooth is already selected
        // if selected, remove to p_selectedTeeth
        const isSelected = dentalHistory.p_selectedTeeth.includes(toothNum)
        setDentalHistory((prevdata)=>({
            ...prevdata,
            p_selectedTeeth: isSelected ? prevdata.p_selectedTeeth.filter(num=>num!==toothNum):[...prevdata.p_selectedTeeth, toothNum]
        }))
        //if wala pa sa p_selectedTeeth, add sa toothFactor, pag andon na, iminus sa toothfactor 
        setToothFactor(!isSelected?toothFactor+1:toothFactor-1)
    }

    const renderTooth = (toothNum)=>{
        let toothImage;
        let disable;
        switch(dentalHistory.p_service){
            case '1':
            case '3':
            case '10':
            case '11':
            case '17':
                //logic for services for all teeth
                toothImage = toothImages[toothNum].selected;
                disable = true; //para di makapindot ng tooth
                break;
            case '7':
                if(dentalHistory.p_severity_material >=16 &&dentalHistory.p_severity_material <=18){
                    toothImage = toothImages[toothNum].selected;
                }else if(dentalHistory.p_severity_material >=19 &&dentalHistory.p_severity_material <=21){
                    if(toothNum<=16){
                        toothImage = toothImages[toothNum].selected;
                    }else{
                        toothImage = toothImages[toothNum].default;
                    }
                }else if(dentalHistory.p_severity_material >=49 &&dentalHistory.p_severity_material <=51){
                    if(toothNum>=17){
                        toothImage = toothImages[toothNum].selected;
                    }else{
                        toothImage = toothImages[toothNum].default;
                    }
                }else{
                    toothImage = toothImages[toothNum].default;
                }
                disable = true; //para di makapindot ng tooth
                break
            case '15':
                if(dentalHistory.p_severity_material=='35'){
                    return null //mucocele ay sa gilagid, hindi sa ipin kaya walang irereturn na tooth chart
                }else{
                    toothImage = dentalHistory.p_selectedTeeth.includes(toothNum)?toothImages[toothNum].selected:toothImages[toothNum].default;
                }
                break
            default:
                toothImage = dentalHistory.p_selectedTeeth.includes(toothNum)?toothImages[toothNum].selected:toothImages[toothNum].default;
        }

        return (
            <div className='tooth'>
                <img src={toothImage} alt="" />
                <button onClick={()=>handleToothClick(toothNum)} disabled={disable}>{toothNum}</button>
            </div>
        )
    }

    const formValidation = ()=>{
        let err ={}

        if(dentalHistory.p_date==''){
            err.date = 'Please choose a date';
        }
        if(dentalHistory.p_time==''){
            err.time = 'Please choose a time';
        }
        if(dentalHistory.p_selectedTeeth.length==0){
            err.selectedTeeth = 'Please choose a tooth';
        }
        if(dentalHistory.p_dentist==''){
            err.dentist = 'Please choose a dentist';
        }
        if(dentalHistory.p_service==''){
            err.service = 'Please choose a service';
        }
        if(dentalHistory.p_severity_material==''){
            err.severity_material = 'Please choose a severity/material';
        }

        setError(err)
    }

    const handleSave = async ()=>{
        setLoading(true);
            try{
                const response = await axios.post("http://localhost:80/api2/user/save", dentalHistory).finally(() => setLoading(false));
                console.log(response)
                if(response.status==200){
                    socket.emit('newData');
                }
                navigate(`/view-patient-info/${id}`);
            }catch(err){
                console.log("Can't save dental history. An error occurred: ", err.message)
            }
    }

    console.log(options)

  return (
    <div className='add-dental-history-container'>
        <AdminNavbar></AdminNavbar>
        <div className="content">
            <AdminInfo></AdminInfo>
            {/* go back button */}
            <div className="row">
                <Link to='/patient-list' className='back'>
                <i class="fa-solid fa-chevron-left mt-4"></i> <span>Go back</span>
                </Link>
            </div>
            {/* header */}
            <div className="add-dental-history-header row">
                <h1 className=''>Add a new service</h1>
            </div>

        {/* form */}
        <div className="add-dental-history-form row mt-3">
            <div className="col">                
                <div className="row">
                    {/* date */}
                    <div className="col-4 mb-5 mt-5 ">
                        <label htmlFor="" className="form-label labels">Date</label>
                        <input  type="date" id="p_date" name="p_date" className="form-control labels" onChange={handleChange} onBlur={formValidation}/>
                        <p className="error-message">{error.date}</p>
                    </div>

                    {/* time */}
                    <div className="col-6 mt-5 mb-3">
                        <label htmlFor="" className="form-label labels" >Time</label>
                        <div className="row">
                            <div className="col-xl-6 col-sm-12 mb-3">
                                {appointmentTime.map((time,index)=>{
                                    if(index<=3){
                                        return <div class="form-check">
                                        <input class="form-check-input" type="radio" name="p_time" value={time} onChange={handleChange} onBlur={formValidation}/>
                                        <label class="form-check-label time-text" for="flexRadioDefault1">
                                        {time}
                                        </label>
                                    </div>
                                    }
                                })}
                        </div>
                        <div className="col-xl-6 col-sm-12 mb-3">
                            {appointmentTime.map((time,index)=>{
                                if(index>3){
                                    return <div class="form-check">
                                        <input class="form-check-input" type="radio" name="p_time" value={time} onChange={handleChange} onBlur={formValidation}/>
                                        <label class="form-check-label time-text" for="flexRadioDefault1">{time}</label>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                    <p className="error-message">{error.time}</p>
                </div>
                
                <div className="row">
                    {/* services */}
                    <div className="col-4 mb-3">
                        <label htmlFor="" className="form-label labels mb-2">Type of Service</label>
                        <select class="form-select" aria-label="Default select example" id="p_service" name="p_service" onChange={handleChange} onBlur={formValidation}>
                            <option value="" labels disabled selected>Select a Service</option>
                            {services?services.length>0?services.map(item=>{
                                return <option value={item.service_id}>{item.service_name}</option>
                            })
                            :'':''}       
                        </select>
                        <p className="error-message">{error.service}</p>
                    </div>

                    {/* service severity/material*/}
                    <div className="col-4">
                        <label htmlFor="" className="form-label labels mb-2">Level of Severity/Type of Material</label>
                        <select class="form-select" aria-label="Default select example" id="p_severity_material" name="p_severity_material" onChange={handleChange} onBlur={formValidation}>
                            <option value="" labels disabled selected={dentalHistory.p_severity_material==''}>Select a Severity/Material</option>
                            {options?options.length>0?options.map(item=>{
                                if(item.service_id==dentalHistory.p_service){
                                    return <option value={item.option_id}>{item.option_name}</option>
                                }
                            })
                            :'':''}
                        </select>
                        <p className="error-message">{error.severity_material}</p>
                    </div>

                    {/* additional fee */}
                    <div className="col-4">
                        <label htmlFor="" className='form-label labels mb-2'>Additional Fee</label>
                        <input type="number"  className="form-control" value={additionalFee} onChange={(e)=>{e.target.value==''?setAdditionalFee(''):setAdditionalFee(parseInt(e.target.value))}} onBlur={formValidation}/>
                    </div>
                    </div>
                    
                    {/* tooth num */}
                    <div className={`col-7 mb-5 ${dentalHistory.p_severity_material=='35'?'hide-tooth-chart':'unhide-tooth-chart'}`}>
                        <label htmlFor="" className="form-label labels" >Tooth Number </label>
                        <input type="text" className="form-control " name='toothNumber' id='toothNumber' value={dentalHistory.p_selectedTeeth}/>
                    </div>
                </div>

                {/* tooth chart */}
                <div className={`tooth-chart row ${dentalHistory.p_severity_material=='35'?'hide-tooth-chart':'unhide-tooth-chart'}`}>
                    <div className="col-12">
                        {[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1].map(renderTooth)}                        
                    </div>
                    <div className="col-12">
                        {[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32].map(renderTooth)}
                    </div>
                </div>
                
            </div>
            {/* end of row for tooth chart */}

            {/* dentist */}
            <div className="row mt-5">
                <div className="col-6">
                    <label htmlFor="" className="form-lavel labels">Dentist</label>
                    <select class="form-select" aria-label="Default select example" id="p_dentist" name="p_dentist" onChange={handleChange} onBlur={formValidation}>
                        <option value="" labels disabled selected>Select Dentist</option>
                        {dentists.map(item=>{
                            return <option value={item.id} labels>Dr. {item.u_fname} {item.u_lname}</option>
                        })}
                    </select>
                    <p className="error-message">{error.dentist}</p>
                </div>
            </div>

            {/* receipt */}
            <div className=" row mt-5 mb-5">
                <div className="col p-0">
                    <div className="receipt-container">
                        {/* receipt header */}
                        <div className="receipt-header">
                            <h6 className='m-0'>Procedure Description</h6>
                            <h6 className='m-0'>Cost</h6>
                        </div>
                        {/* receipt info */}
                        <div className="receipt-info row">
                            {/* receipt procedure */}
                            <div className="receipt-procedure col-6">
                                <ul>
                                    <li className='service-name'> {services?services.map(item=>{
                                        if(item.service_id==dentalHistory.p_service){
                                            return item.service_name
                                        }
                                    }):''}
                                        <ul>
                                    <li className='tooth-severity-material'>Severity/Material: <span> {options?options.map(item=>{
                                        if(item.option_id==dentalHistory.p_severity_material){
                                            return item.option_name
                                        }
                                    }):''}</span></li>
                                    <li className='tooth-no'>Tooth No.: <span> {dentalHistory.p_selectedTeeth.join(', ')}
                                       
                                    </span></li>
                                    </ul></li>
                                </ul>
                            </div>
                            {/* receipt cost */}
                            <div className="receipt-cost col-6">
                                <p>₱ {totalPrice}
                                </p>
                            </div>
                        </div>
                        {/* total */}
                        <div className="receipt-total row">
                                <h6 className='m-0 col-8'>Total Due</h6>
                                <p className='m-0 col'>₱ {totalPrice}<span></span></p>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* button */}
            <div className="text-center">
                <button className='btn save-patient' onClick={handleSave} disabled={Object.keys(error).length!=0}>Save</button>
            </div>
        </div>
      </div>
      {loading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
    </div>
  )
}

export default isAuthenticated(AddService);

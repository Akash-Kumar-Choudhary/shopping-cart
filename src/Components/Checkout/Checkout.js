import React,{useEffect, useState} from'react'

import classes from "./Checkout.module.css";

const isValid=value => {
  return value.trim()!==''
}
const isValidPostal=value => {
  return value.trim().length===5
}

const Check = (props) => {
  const [enteredName,setenteredName]=useState('')
  const [enteredStreet,setenteredStreet]=useState('')
  const [enteredPostal,setenteredPostal]=useState('')
  const [enteredCity,setenteredCity]=useState('')

  const [nameWasTouched,setnameWasTouched]=useState(false)
  const [streetWasTouched,setstreetWasTouched]=useState(false)
  const [pastalWasTouched,setpostalWasTouched]=useState(false)
  const [cityWasTouched,setcityWasTouched]=useState(false)

  const [formIsValid,setformIsValid]=useState(false)




  const enteredNameIsValid=isValid(enteredName)
  const enteredStreetIsValid=isValid(enteredStreet)
  const enteredPostalIsValid=isValidPostal(enteredPostal)
  const enteredCityIsvalid=isValid(enteredCity)

  const nameIsInvalid=!enteredNameIsValid && nameWasTouched
  const streetIsInvalid=!enteredStreetIsValid && streetWasTouched
  const postalIsInvalid=!enteredPostalIsValid && pastalWasTouched
  const cityIsInvalid=!enteredCityIsvalid && cityWasTouched

  const formValid=enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsvalid

  useEffect(() => {
    if(formValid){
      setformIsValid(true)
    }
    else{
      setformIsValid(false)
    }
  },[enteredNameIsValid,enteredStreetIsValid,enteredStreetIsValid,enteredPostalIsValid,enteredCityIsvalid])


  const nameBlurChangeHandler=(event) => {
    setnameWasTouched(true)
  }
  const streetBlurChangeHandler=() => {
    setstreetWasTouched(true)
  }
  const postalBlurChangeHandler=() => {
    setpostalWasTouched(true)
  }

  const cityBlurChangeHandler=() => {
    setcityWasTouched(true)
  }

 

  const SubmitChangeHandler = (event) => {
    event.preventDefault();
    setnameWasTouched(true)
    setstreetWasTouched(true)
    setpostalWasTouched(true)
    setcityWasTouched(true)

    if(!formValid){
      return
    }

    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalcode:enteredPostal,
      city:enteredCity

    })

    setenteredName('')
    setenteredStreet('')
    setenteredPostal('')
    setenteredCity('')


    setnameWasTouched(false)
    setstreetWasTouched(false)
    setpostalWasTouched(false)
    setcityWasTouched(false)


  };

  const nameChangeHandler=(event) => {
    setenteredName(event.target.value)
  }
  const streetChangeHandler=(event) => {
    setenteredStreet(event.target.value)
  }
  const postalChangeHandler=(event) => {
    setenteredPostal(event.target.value)
  }
  const cityChangeHandler=(event) => {
    setenteredCity(event.target.value)
  }

  const namecontrolclass=`${classes.control} ${nameIsInvalid ? classes.invalid : ''}`
  const streetcontrolclass=`${classes.control} ${streetIsInvalid ? classes.invalid: ''}`
  const postalcontrolclass=`${classes.control} ${postalIsInvalid ? classes.invalid : ''}`
  const citycontrolclass=`${classes.control} ${cityIsInvalid ? classes.invalid : ''}`

  return (
    <form className={classes.form} onSubmit={SubmitChangeHandler}>
      <div className={namecontrolclass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name"  value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurChangeHandler} ></input>
        {nameIsInvalid && <p>Please enter Valid Name</p>}
      </div>
      <div className={streetcontrolclass}>
        <label htmlFor="street">Steet</label>
        <input type="text" id="street" value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurChangeHandler}></input>
        {streetIsInvalid && <p>Please enter Valid Street</p>}
      </div>
      <div className={postalcontrolclass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal code" value={enteredPostal} onChange={postalChangeHandler} onBlur={postalBlurChangeHandler} ></input>
        {postalIsInvalid && <p>Please enter Valid postal code</p>}
      </div>
      <div className={citycontrolclass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" value={enteredCity} onChange={cityChangeHandler} onBlur={cityBlurChangeHandler}></input>
        {cityIsInvalid && <p>Please enter Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled ={!formIsValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Check;

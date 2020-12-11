import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import getPostData from '../utils/getPostData';

const ContactForm = () => {
  const [data, setData] = useState();
  const [apiData, setApiData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };
  
  // Stretch goal
  useEffect(() => {
    if (data !== undefined){
    getPostData(data)
    .then(result => setApiData(result));
    }
  }, [data]);

  return (
    <div className="App">
      <form data-testid="form-element" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            // missing id to connect with label causing test error
            // adding code below to fix
            id='firstName'
            name="firstName"
            placeholder="Edd"
            // name length is too short, test failed
            // lengthen name allowed to 20
            // ref={register({ required: true, maxLength: 3 })}
            ref={register({required: true, maxLength: 20})}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">
            Email*
          </label>
          <input name="email" 
            // id="lastName" wrong id for input, test failed
            // add correct id below
            id="email"
            placeholder="bluebill1049@hotmail.com"
            ref={register({ required: true })} 
          />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message" 
            ref={register({ required: false })} 
          />
        </div>
        {data && (
          // added test id to grab element
          <pre  data-testid="pre-element" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input type="submit" />
      </form>
      
    </div>
  );
};

export default ContactForm;

import { useState, useEffect, useContext } from 'react';
import contact_us from '../SVGs/contact_us.svg';
import {useFormik} from "formik";
import * as yup from 'yup';
import { contextAPI } from '../App';

export function ContactUs1() {

  return (
    <div className='content'>
      <div className='svgs'>
        <object className='world' type="image/svg+xml" data={contact_us}>
          <img src={contact_us} alt="imagee" />
        </object>
      </div>

      <div className="Body">
        <section className='welcome'>
          <h1>Contact us made using ( formik and yup )</h1>
        </section>
        <section className='mainContent'>
          <Contact />
        </section>
      </div>
    </div>
  );
}


function Contact() {

  const {queryAPI} = useContext(contextAPI);

  const [queries, setQueries] = useState();
  const getQueries = () => {
    fetch(queryAPI, { method: "GET" })
    .then(response => response.json())
    .then(data => setQueries(data));
  };
  useEffect(() => getQueries(), []);

  function Delete(id) {
    fetch(`${queryAPI}/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(() => getQueries());
  };


  const formValidationSchema = yup.object({
    name: yup.string()
              .required("How can I call you without a Name?😀")
              .max(15,"Can you make it easy to read?🙄"),
    mail:yup.string()
             .required("I love mailing Though😂"),
    
  })

  const AddQuery = (values) => {
    const newQuery = values;
    fetch(queryAPI,
      {
        method: "POST",
        body: JSON.stringify(newQuery),
        headers: { "Content-Type": "application/json" }
      })
      .then(() => getQueries());
  };

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
  useFormik({
      initialValues:{name:"",mail:"",comment:""},
     // validate: validateForm,
     validationSchema: formValidationSchema,

     onSubmit:(values)=>{
         AddQuery(values);
     }
    })

  return (
    <div className='contactAndQueries'>
      <div className='contactDetails'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name*</label><br />

          <input type="text" 
                 id="name" 
                 placeholder='please Enter your name!!!'
                 onChange={handleChange}
                 value={values.name}
                 onBlur={handleBlur}
                 style={(errors.name && touched.name)?{borderBottom:"2px solid red"}:{}} />
                 <br />
         <h3 style={{color:"red"}}>{(errors.name && touched.name)?errors.name:""}</h3>
          <label htmlFor="mail">Email*</label><br />

          <input type="email"
                 id="mail" 
                 placeholder="please enter your email" 
                 onChange={handleChange} 
                 value={values.mail}
                 onBlur={handleBlur}
                 style={(errors.mail && touched.mail)?{borderBottom:"2px solid red"}:{}}/>
                 <br />
         <h3 style={{color:"red"}}>{(errors.mail && touched.mail)?errors.mail:""}</h3>
          <label htmlFor="comments">Any comments??</label><br />

          <textarea type="text" 
          className='comment'
                 id="comment" 
                 placeholder='(optional)'
                 onChange={handleChange}
                 value={values.comment} />
                 <br />
          <button type="submit">submit</button>
        </form>
      </div>
      {(queries !== undefined)
        ? (queries.length !== 0)
          ? <div className='queries'>
            <h2>New requests</h2>
            {queries.map((query, index) => {
              return (
                <div className='query' key={index}>
                  <div>
                    <h1>{query.name}</h1>
                    <h2>{query.mail}</h2>
                    <h3>{(query.comment !== "") ? query.comment : ""}</h3>
                  </div>
                  <div>
                    <button onClick={() => Delete(query.id)}>Delete</button>
                  </div>
                </div>);
            })}
          </div>
          : ""
        : ""}
    </div>
  );
}

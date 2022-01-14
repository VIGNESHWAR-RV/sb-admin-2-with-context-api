import { useState, useEffect, useContext } from 'react';
import contact_us from '../SVGs/contact_us.svg';
import { contextAPI } from '../App';


export function ContactUs2() {

  return (
    <div className='content'>
      <div className='svgs'>
        <object className='world' type="image/svg+xml" data={contact_us}>
          <img src={contact_us} alt="imagee" />
        </object>
      </div>

      <div className="Body">
        <section className='welcome'>
          <h1>Contact us made using useState</h1>
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

  const [name,setName] = useState("");
  const [mail,setMail] = useState("");
  const [comment,setComment] = useState("");

  const newQuery = {name,mail,comment};
  console.log(newQuery);
  const AddQuery = () => {
      (newQuery.name === "" || newQuery === undefined)
            ?alert("please enter proper name")
            : (newQuery.mail === "" || newQuery === undefined)
                 ? alert("please enter a valid mail")
                 : fetch(queryAPI,
                     {
                       method: "POST",
                       body: JSON.stringify(newQuery),
                       headers: { "Content-Type": "application/json" }
                     })
                     .then(() => getQueries())
                     .then(()=>{setName("");setMail("");setComment("")})
                 };

  return (
    <div className='contactAndQueries'>
      <div className='contactDetails'>
        <div>
          <label htmlFor="name">Name*</label><br />
          <input type="text" 
                 id="name" 
                 placeholder='please Enter your name!!!'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}/>
                 <br />
          <label htmlFor="mail">Email*</label><br />

          <input type="email"
                 id="mail" 
                 placeholder="please enter your email"
                 value={mail} 
                 onChange={(e)=>{setMail(e.target.value)}}/>
                 <br />
          <label htmlFor="comments">Any comments??</label><br />

          <textarea type="text" 
          className='comment'
                 id="comment" 
                 placeholder='(optional)'
                 value={comment}
                 onChange={(e)=>setComment(e.target.value)}/>
                 <br />
          <button onClick={()=>{AddQuery()}}>submit</button>
        </div>
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

import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
  

  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
      const person = characters[index]
        deleteUser(person).then((response) => {if(response.status === 204){
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        }});
        
      }

      useEffect(() => {
        fetchUsers()
          .then((res) => {
            if (res.status === 200){
              res.json().then((json) => setCharacters(json["users_list"]))
            }          
          })
          .catch((error) => { console.log(error); });
      }, [] );
  
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );

      function updateList(person){        
        postUser(person)
          .then((response) => response.json()
            .then((newPerson) => {
              if(response.status === 201){
                setCharacters([...characters, newPerson]);}
            }
            ))
          .catch((error) => {
            console.error(error);
          });
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }

    
    
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }
    
  

  function deleteUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  
}

  

export default MyApp;
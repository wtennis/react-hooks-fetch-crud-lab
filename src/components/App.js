import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  //write useEffect that fetches questions
  //send fetched questions down to QuestionList 

  useEffect(() => {
    console.log('useEffect fired')
    fetch('http://localhost:4000/questions')
    .then(r=> r.json())
    .then(data => setQuestions(data))
  }, [])
// Add a cleanup function return here?


  //Callback function passed as props to QuestionForm:
      function onFormSubmit(formData) {
        console.log(questions)
        //Make newQ (object) match what QuestionList is expecting (key, answers as array, etc.)
        const newQ = {
                id: questions.length + 1,
                prompt: formData.prompt,
                answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
                correctIndex: formData.correctIndex
              }
        
        // Fetch POST to update json for persistance
        fetch('http://localhost:4000/questions', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newQ)
        })
          .then(r=> r.json())
          .then(data => {
          //save question sent back from server to variable:
            let qFromServer = data
          //add the question to a new questions array:
            const updatedQs = [...questions, qFromServer]
          //update state with this new array:
            setQuestions(updatedQs)
            console.log(updatedQs)
          })

  
  }

//Callback function pased to through QuestionList to QuestionItem
//Function should DELETE the data on json server
function handleDelete(ID) {
    //create object for question to delate
    const qToDelete = questions.filter(question => 
      question.id === ID
    )
    console.log(qToDelete)
    //Filter out the question to be deleted and reset the state of questions
    const updatedQs2 = questions.filter(question => question.id !== ID)
    setQuestions(updatedQs2)
 

    //Fetch DELETE (no response from json)
        fetch(`http://localhost:4000/questions/${ID}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json"
          },
          //note: qToDelete is actually an array with one object in it...
          //but it get's stringified to what the server wants, so no need to 
          //put JSON.stringify(qToDelete[0])
          body: JSON.stringify(qToDelete)
        })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
        {page === "Form" ?
          <QuestionForm onFormSubmit = {onFormSubmit}/> 
          : 
          <QuestionList 
                        questions = {questions} 
                        handleDelete = {handleDelete}
                        />}
    </main>
  );
}

export default App;

import React, {useState} from "react";

function QuestionItem({ question, handleDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correct, setCorrect] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function correctHandler(e) {
    console.log(e.target.value)
    //PATCH so that correctIndex changes
    
      console.log(e.target.value)
      //PATCH so that correctIndex changes
      fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex: e.target.value})
    })
      .then(r => r.json())
      .then(console.log)
  }

  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange = {correctHandler} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick = {() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

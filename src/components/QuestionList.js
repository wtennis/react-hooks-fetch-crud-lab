import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete}) {
  //create displayedQuestions variables using QuestionItem component
  const displayedQuestions = questions.map(question => {
    return (<QuestionItem 
                key = {question.id} 
                question = {question} 
                handleDelete = {handleDelete}
                />)
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayedQuestions}</ul>
    </section>
  );
}

export default QuestionList;

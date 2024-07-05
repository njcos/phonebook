const Person = ({ person, deleteHandler }) => {
    return (
      <li>{person.name}{' '}{person.number} <button onClick = {deleteHandler}>Delete</button></li>
    )
  }
  
  export default Person
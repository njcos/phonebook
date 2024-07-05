const AddNumber = ({addnumber, addname, addrecord}) => {
    return (
        <div>
            <form onSubmit={addrecord}>
                <h2>Add a Number</h2>
                <div>
                name: 
                <input 
                name='Enter Name'
                onChange={addname}
                />
                </div>
                <div>
                number:
                <input
                name='Enter Number'
                onChange={addnumber}
                />
                </div>
                <div>
                <button type='submit'>Add</button>
                </div>
        
          </form>
        </div>
        
    )
}

export default AddNumber
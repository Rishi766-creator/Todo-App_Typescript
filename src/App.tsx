import {useState,useEffect} from 'react';
type Todo={
    id:number;
    text:string;
    completed:boolean
    };
function App(){
  
    const [todos,setTodos]=useState<Todo[]>(()=>{
      const stored=localStorage.getItem("todos");
      return stored?JSON.parse(stored):[];
    });
    const [input,setInput]=useState<string>("");
    const addTodo=():void=>{
      if(!input.trim()) return;
      const newTodo:Todo={
        id:Date.now(),
        text:input,
        completed:false

      }
      setTodos(prev=>[...prev,newTodo]);
      setInput("");

    }
    
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
      setInput(e.target.value);

    }
    const toggleTodo=(id:number):void=>{
      setTodos(prev=>
        prev.map(todo=>
          todo.id===id?{...todo,completed:!todo.completed}:todo
        )
      )}
    const deleteTodo=(id:number):void=>{
      setTodos(prev=>
        prev.filter(todo=>todo.id!==id));

      }
    const editTodo=(id:number,newText:string):void=>{
      setTodos( prev=>
        prev.map(todo=>todo.id===id?{...todo,text:newText}:todo)
      )

    }



    
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])
    return(
      <div className='bg-gray-50 flex flex-col justify-center items-center min-h-screen gap-4'>
        <h1 className='text-2xl font-medium'>To-Do App</h1>
        <div className='bg-white p-6 rounded-xl max-w-7xl'>
        <input type="text" placeholder="Enter your task" value={input} onChange={handleChange} className='flex-1 text-sm p-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg m-4'/>
        <button  onClick={addTodo} className='bg-blue-600 text-white font-medium  py-2  px-4 rounded-lg'>Add</button>
        {
          todos.length===0?(<p className='text-center mt-2'>No activities yet</p>):(
            <ul className="mt-4 space-y-3">
            {
              todos.map(todo=>(
                
                <li
                    key={todo.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-300 p-3 rounded-lg"
              >
                  <span
                      className={`break-words ${todo.completed ? "line-through text-gray-400" : ""}`}>
                          {todo.text}
                </span>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    />

                    <button
                    onClick={() => {
                    const newText = prompt("Edit your task", todo.text);
                    if (newText && newText.trim()) {
                        editTodo(todo.id, newText);
                      }
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                     Edit
                    </button>

                    <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                        Delete
                        </button>
                  </div>
                </li>

              ))
            
            
              

            }
            </ul>
            
          )
        }

        </div>
      </div>
    )

}
export default App;
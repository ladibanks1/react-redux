import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodo,
  editTodo,
  saveToStorage,
} from "./store/slices/todoSlice";

function App() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [todoObj, setTodoObj] = useState({
    title: "",
    isDone: false,
    date: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
  });
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [temp, setTemp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(todoObj));
    dispatch(saveToStorage());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoObj((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = (index) => {
    setEdit(false);
    setEditIndex(null);
    dispatch(editTodo({ id: index, data: todoObj }));
    dispatch(saveToStorage());
  };
  const handleEdit = (index) => {
    setEditIndex(index);
    setEdit(true);
    setTemp(todo[index].title);
  };

  return (
    <div>
      <h1>TODO APP WITH REDUX</h1>
      <p>Todo List</p>
      <div>
        {todo.length > 0 ? (
          todo.map((item, index) => {
            return (
              <div key={index}>
                {edit && editIndex === index ? (
                  <input
                    type="text"
                    name="title"
                    value={temp}
                    onChange={(e) => {
                      setTemp(e.target.value);
                      setTodoObj((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      });
                    }}
                  />
                ) : (
                  <p>{item.title}</p>
                )}
                <p>{item.isDone ? "DONE" : "NOT DONE"}</p>
                <button
                  onClick={() => {
                    dispatch(deleteTodo({ id: index }));
                    dispatch(saveToStorage());
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    editIndex === index ? handleSave(index) : handleEdit(index)
                  }
                >
                  {edit && editIndex === index ? "SAVE" : "EDIT"}
                </button>
              </div>
            );
          })
        ) : (
          <p>No Todo</p>
        )}
      </div>
      <p>ADD TASK</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default App;

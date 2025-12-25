import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  toogleTaskCompletion,
  deleteTask,
  decrementTaskQuantity,
  incrementTaskQuantity,
} from "../features/counter/counterSlice";
import "./Todo.css";
import { Form } from "react-bootstrap";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputPrix, setInputPrix] = useState("");
  const [inputQuantite, setInputQuantite] = useState("");

  const liste = useSelector((state) => state.counter.tasks);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!(inputValue,inputPrix,inputQuantite).trim()) return;

  dispatch(
    addTask({
      text: inputValue,
      price: inputPrix ,
      quantity: inputQuantite ,
    })
  );

  setInputValue("");
  setInputPrix("");
  setInputQuantite("");
};
  return (
    <Form onSubmit={handleSubmit} className="todo-form mt-4 p-4 bg-light rounded">
      <div className="input-group mb-3 pt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ajouter un produit"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          
        />
        <input
          type="number"
          className="form-control"
          placeholder="donner le prix"
          value={inputPrix}
          onChange={(e) => setInputPrix(e.target.value)}
          
        />
        <input
          type="number"
          className="form-control"
          placeholder="donner la quantite"
          value={inputQuantite}
          onChange={(e) => setInputQuantite(e.target.value)}
          
        />
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </div>

      <ul className="task-list">
        {liste.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div
              className="task-text"
              onClick={() => dispatch(toogleTaskCompletion(task.id))}
            >
              <div className="product-name">
                <strong>Produit :</strong> {task.text}
              </div>

              <div className="product-details">
                <span>
                  <strong>Prix :</strong> {task.price || 0} DT
                </span>
                <span>
                  <strong>Quantité :</strong> {task.quantity || 0} 
                </span>
              </div>
            </div>

            <button
              className="delete-btn "
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <i className="bi bi-trash-fill poubelle"></i>
            </button>
            <div className="quantity-controls">
              <button
                className="decrement-btn"
                onClick={() => dispatch(decrementTaskQuantity(task.id))}
              >
                -
              </button>
              <span className="quantity">{task.quantity || 0}</span>
              <button
                className="increment-btn"
                onClick={() => dispatch(incrementTaskQuantity(task.id))}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Form>
  );
};

export default Todo;

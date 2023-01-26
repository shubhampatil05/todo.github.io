import React, { useEffect, useState } from "react";
import "./Style.css";
import { add, edit, fulfill, remove, update } from "./todoSlice";
import { useSelector, useDispatch } from "react-redux";

export const Todo = () => {
  const myData = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [toggle, setToggle] = useState(true);

  const eventHandle = (e) => {
    setInputValue(e.target.value);
  };

  const Additem = () => {
    inputValue === "" ? alert("Add Something") : dispatch(add(inputValue));

    setInputValue("");
  };

  const editItem = (id) => {
    dispatch(edit(id));
    setInputValue(myData[id].item);
    setToggle(false);
  };

  const fulfillItem = (id) => {
    dispatch(fulfill(id));
  };
  const deleteItem = (id) => {
    dispatch(remove(id));
  };

  const updateItem = (id) => {
    dispatch(update({ id: id, inputValue: inputValue }));
    setToggle(true);
  };

  return (
    <>
      <div className="container">
        <div className="addTodo">
          <input
            type="search"
            placeholder="Add Items"
            onChange={eventHandle}
            value={inputValue}
          />
          <button className="btn btn-outline-dark" onClick={() => Additem()}>
            Add
          </button>
        </div>

        <div className="tableData">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Item</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            {myData.map((currEle, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th>{index + 1}</th>
                    <th>{currEle.item}</th>
                    <th>{currEle.status}</th>
                    <th>
                      {toggle ? (
                        <button
                          className="btn btn-info"
                          onClick={() => editItem(index)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary update"
                          onClick={() => updateItem(index)}
                        >
                          Update
                        </button>
                      )}

                      <button
                        className="btn btn-success fulfill"
                        onClick={() => fulfillItem(index)}
                      >
                        Fulfill
                      </button>
                      <button
                        className="btn btn-danger delete"
                        onClick={() => deleteItem(currEle.id)}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

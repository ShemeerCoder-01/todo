import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: "T_1", content: "Learn React", status: "started" },
        { id: "T_2", content: "Build Todo App", status: "inprogress" },
        { id: "T_3", content: "Master Drag and Drop", status: "completed" },
    ]);
    const [content, setContent] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSave = () => {
        if (!content || !selectedStatus) {
            alert("Please enter task content and select a status.");
            return;
        }

        const todoObject = {
            id: `T_${todos.length + 1}`,
            content,
            status: selectedStatus,
        };
        setTodos([...todos, todoObject]);
        setContent("");
        setSelectedStatus("");
    };

    const handleDragAndDrop = (result) => {
        const { source, destination } = result;

        // Check if dropped outside a valid droppable area
        if (!destination) return;

        console.log("Source:", source, "Destination:", destination);

        // Create a copy of the current todos list
        const updatedTodos = Array.from(todos);

        // Remove the dragged item and re-insert it at the new index
        const [movedTodo] = updatedTodos.splice(source.index, 1);
        updatedTodos.splice(destination.index, 0, movedTodo);

        // Update state with the reordered list
        setTodos(updatedTodos);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f7f8fa",
                padding: "20px",
            }}
        >
            <div>
                <h1>Added Todos:</h1>
                <DragDropContext onDragEnd={handleDragAndDrop}>
                    <Droppable droppableId="todoList">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    padding: "10px",
                                    width: "300px",
                                    backgroundColor: "#e8e8e8",
                                    borderRadius: "8px",
                                }}
                            >
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    minWidth: "10rem",
                                                    padding: "10px",
                                                    borderRadius: "8px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    backgroundColor: "#4a90e2",
                                                    color: "white",
                                                    ...provided.draggableProps.style, // Apply dragging styles
                                                }}
                                            >
                                                <p>{todo.content}</p>
                                                <p>({todo.status})</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={content}
                    placeholder="Enter task"
                    style={{
                        padding: "0.5rem",
                        outline: "none",
                        margin: "1rem",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                />
                <select
                    onChange={handleSelectChange}
                    value={selectedStatus}
                    style={{
                        padding: "0.5rem",
                        margin: "1rem",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">Select Status</option>
                    <option value="started">Started</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button
                    style={{
                        padding: "0.5rem",
                        color: "#fff",
                        background: "#1677ff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default TodoList;

import React from 'react'
import styles from "./ToDoList.module.css";
import { Button, Divider, Empty, Input, Modal, Select, Tag, Tooltip, message, } from "antd";

const AddTodo = ({handleSearch,handleTypeChange,currentTaskType,setIsAdding}) => {
    const change_adding=()=>{
        setIsAdding(true)

    }
    return (
        <div className={styles.toDoHeader}>
            <h2>Your Tasks</h2>
            <Input style={{ width: "50%" }} onChange={handleSearch} placeholder="Search Your Task Here..." />
            <div>
                <Button onClick={change_adding} type="primary" size="large">
                    Add Task
                </Button>
                <Select value={currentTaskType} style={{ width: 180, marginLeft: "10px" }} onChange={handleTypeChange} size="large"
                    options={[
                        { value: "incomplete", label: "Incomplete" },
                        { value: "complete", label: "Complete" },
                    ]}
                />
            </div>
        </div>
    )
}

export default AddTodo
import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import auth from './firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { async } from '@firebase/util';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Home = () => {
    const [user] = useAuthState(auth)
    const { data: note, isLoading, refetch } = useQuery('note', () => axios.get(`https://limitless-cove-21407.herokuapp.com/note?email=${user.email}`))

    const handleDelete = async (id) => {
        await axios.delete(`https://limitless-cove-21407.herokuapp.com/note/${id}`)
        refetch()
        toast.error("Task deleted")
    }
    console.log(note?.data);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const task = e.target.task.value;
        const description = e.target.description.value;
        const note = {
            task,
            description,
            email: user.email,
            complete: false
        }
        await axios.post('https://limitless-cove-21407.herokuapp.com/note', note).then(response => console.log(response.data))
        refetch()
        toast.success("Task added")
    }

    const handleComplete = async (id) => {
        // event.preventDefault();
        const notes = {

            complete: true
        }
        await axios.put(`https://limitless-cove-21407.herokuapp.com/note/${id}`, notes).then(response => console.log(response.data))
        refetch()
        toast.success('Completed this task')

    }
    return (
        <div>
            <div className='text-center mt-1'>
                <button onClick={() => signOut(auth)} className='btn btn-danger '>Sign Out</button>
            </div>
            <h2 className='text-center mt-4 text-primary'>
                To do list
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group container">


                    <input name='task' type="text" placeholder='Task Name' aria-label="task-name" className="form-control me-2" />
                    <input name='description' type="text" placeholder='Task Description' aria-label="task-description" className="form-control" />
                    <button type="submits" className=" btn btn-success">Add task</button>

                </div>
            </form>
            <div>
                <table className="table container">
                    <thead>
                        <tr className='text-center fs-3 text'>
                            <th scope="col">Sl</th>
                            <th scope="col">Task</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading && <Spinner className='d-flex justify-content-center align-items-center items-center' animation="border" variant="warning" />
                        }
                        {
                            note?.data.map((n, index) => <tr className='text-center' key={note._id}>
                                <th scope="row">{index + 1}</th>

                                <td className={n.complete && 'text-success fw-lighter'}>{(n.complete) ? <del>{n.task}</del> : <span className='fw-bold'>{n.task}</span>}</td>
                                <td className={n.complete && 'text-success fw-lighter'}>{n.complete ? <del>{n.description}</del> : <span className='fw-bold'>{n.description}</span>}</td>
                                <td><div className='d-flex text-center justify-content-center'>
                                    <button onClick={() => handleComplete(n._id)} className='btn btn-success  me-5'>Complete</button><button onClick={() => handleDelete(n._id)} className='btn btn-danger'>Delete</button></div></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
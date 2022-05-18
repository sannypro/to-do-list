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
import { toast } from 'react-toastify';

const Home = () => {
    const [user] = useAuthState(auth)
    const { data: note, isLoading, refetch } = useQuery('note', () => axios.get(`http://localhost:5000/note?email=${user.email}`))

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/note/${id}`)
        refetch()

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
        await axios.post('http://localhost:5000/note', note).then(response => console.log(response.data))
        refetch()
        toast.success("note added")
    }
    const handleComplete = async (id) => {
        // event.preventDefault();
        const notes = {

            complete: true
        }
        await axios.put(`http://localhost:5000/note/${id}`, notes).then(response => console.log(response.data))
        refetch()

    }
    return (
        <div>
            <button onClick={() => signOut(auth)} className='btn btn-danger'>Sign Out</button>
            <h2 className='text-center mt-5 text-primary'>
                To do list
            </h2>
            <form onSubmit={handleSubmit}>
                <div class="input-group container">


                    <input name='task' type="text" placeholder='Task Name' aria-label="task-name" class="form-control" />
                    <input name='description' type="text" placeholder='Task Description' aria-label="task-description" class="form-control" />
                    <button type="submits" class=" btn btn-success">Add task</button>

                </div>
            </form>
            <div>
                <table class="table">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">Sl</th>
                            <th scope="col">Task</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            note?.data.map((n, index) => <tr className='text-center' key={note._id}>
                                <th scope="row">{index + 1}</th>

                                <td>{(n.complete) ? <del>{n.task}</del> : <span>{n.task}</span>}</td>
                                <td>{n.complete ? <del>{n.description}</del> : <span>{n.description}</span>}</td>
                                <td><button onClick={() => handleComplete(n._id)} className='btn btn-success me-5'>Complete</button><button onClick={() => handleDelete(n._id)} className='btn btn-danger'>Delete</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
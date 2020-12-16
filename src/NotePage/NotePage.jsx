import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notesConstants } from '../constants';

const initialInput = {
    title: '',
    body: ''
}


const NotePage = () => {
    const [inputs, setInputs] = useState(initialInput);
    const [selectedNote, setSelectedNote] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const notes = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const { title, body } = inputs;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (title && body) {
            dispatch({type: notesConstants.ADD_EDIT_REQUEST, data: { title, body, id: selectedNote }});
            setInputs(initialInput);
            setSelectedNote(null);
        }
    }

    const handleEdit = (note) => {
        const { id, ...rest} = note;
        setSelectedNote(id);
        setInputs(rest);
    }

    const handleDelete = (id) => {
        dispatch({type: notesConstants.DELETE_REQUEST, id});
        if(selectedNote === id) {
            setInputs(initialInput);
            setSelectedNote('');
        }
    }

    return (
        <div className="row">

            <div className="col-lg-3 sidebar border-right border-2" styles="min-height: calc(100vh - 50px);">
                {notes.items &&
                    <ul className="item">
                        {notes.items.map((note) =>
                            <li key={note.id} className="row border-bottom border-2">
                                <div onClick={() => handleEdit(note)} className="col-lg-10">
                                    <div>{note.title}</div>
                                    <div>{note.body}</div>
                                </div>
                                <button  onClick={() => handleDelete(note.id)} className="col-lg-2" type="button" class="close" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                        )}
                    </ul>
                }
            </div>


            <div className="col-lg-9">
                <h2>Notes</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" value={title} onChange={handleChange} className='form-control' />
                        {submitted && !title &&
                            <div className="invalid-feedback">Title is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Body</label>
                        <textarea rows="10" name="body" value={body} onChange={handleChange} className='form-control' />
                        {submitted && !body &&
                            <div className="invalid-feedback">Body is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
        </div>

        </div>
    );
}

export { NotePage };
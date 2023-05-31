import React from 'react'
import Layout from '../components/layout'
import { useState } from 'react'
import { onRegistration } from '../api/auth'

function Register() {
    //declare initial state
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //create functions
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value }) //to update the state
        // only change value equal to name of input
    }

    const onSubmit = async (e) => {
        e.preventDefault() //to prevent refresh when submit form

        try {
            const { data } = await onRegistration(values) // cos of await, only when complete go to next line

            setError('')
            setSuccess(data.message) // to return message (can see where is the message in backend using dev tools in chrome)
            setValues({ username: '', password: '' })
        } catch (error) {
            setError(error.response.data.errors[0].msg) // to return the error message we wrote out in backend
            setSuccess('')
        }
    }

    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>            
                <h1>Register</h1>

                <div className='mb-3'>
                    <label htmlFor='text' className='form-label'>
                        Username
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='text'
                        className='form-control'
                        id='username'
                        name='username' //imp for onChange function
                        value={values.username}
                        placeholder='username'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input
                        onChange={(e) => onChange(e)}
                        type='password'
                        value={values.password}
                        className='form-control'
                        id='password'
                        name='password'
                        placeholder='password'
                        required
                    />
                </div>

                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </Layout>
    )
}

export default Register
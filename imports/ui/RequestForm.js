import React from 'react'
import {Alert,Form,FloatingLabel} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const RequestForm = () => {
    let { id } = useParams();//used to get values from address bar
    return (
        <div className="form">
            <Form.Label><h1>Donation Form</h1></Form.Label>              
                <FloatingLabel controlId="floatingInput" label="Donor Name" className="mb-3">
                        <input type='text' value={id} className="form-control" onChange={e=>handleDonornameChange(e.target.value)}
                        placeholder="Donor Name"
                        />
                    </FloatingLabel>
                    
        </div>
    )
}

export default RequestForm

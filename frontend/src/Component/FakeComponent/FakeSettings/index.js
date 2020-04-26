import React from 'react'
import Form from "react-bootstrap/Form";
import './style.css'
import Button from "react-bootstrap/Button";

export default function() {
    console.log('Render Settings')
    return (
        <div>
            <h1>ЗАГЛУШКА (Settings)</h1>
            <Form className="settings-block">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Example multiple select</Form.Label>
                    <Form.Control as="select" multiple>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
                <Form.Check
                    disabled
                    type="switch"
                    label="disabled switch"
                    id="disabled-custom-switch"
                />
                <Form.Group controlId="formBasicRangeCustom">
                    <Form.Label>Range</Form.Label>
                    <Form.Control type="range" custom />
                </Form.Group>
                {['checkbox', 'radio'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                        />

                        <Form.Check
                            disabled
                            type={type}
                            label={`disabled ${type}`}
                            id={`disabled-default-${type}`}
                        />
                    </div>
                ))}
                <Button variant="primary" size="lg" block>
                    Save
                </Button>
            </Form>
        </div>
    )
}
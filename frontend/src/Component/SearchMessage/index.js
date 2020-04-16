import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import './style.css'

export default function(props) {
    console.log('Render SearchMessage');
    return (
        <div>
            <h1>Search message</h1>
            <InputGroup className="p-3 search-message">
                <FormControl
                    placeholder="search message"
                    aria-label="search message"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}
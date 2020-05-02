import React from 'react';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function ButtonWithLoader({variant, onClick, visibleLoader, children}) {
    return (
        <Button variant={variant} onClick={onClick}>
            {
                visibleLoader &&
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            }
            {children}
        </Button>
    )
}
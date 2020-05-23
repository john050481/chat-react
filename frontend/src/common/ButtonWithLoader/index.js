import React from 'react';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function ButtonWithLoader({variant, onClick, visibleLoader, children, ...rest}) {
    return (
        <Button variant={variant} onClick={onClick} {...rest}>
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
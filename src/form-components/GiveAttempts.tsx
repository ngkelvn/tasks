import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function GiveAttempts(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    const [requested, setRequested] = useState<string>("0");

    function updateRequested(event: React.ChangeEvent<HTMLInputElement>): void {
        setRequested(event.target.value);
    }

    function use(): void {
        setAttempts(attempts - 1);
    }

    function gain(): void {
        const amount = parseInt(requested);
        if (!isNaN(amount)) {
            setAttempts(attempts + amount);
        }
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <div>Attempts left: {attempts}</div>
            <Form.Group controlId="formRequestedAttempts">
                <Form.Label>Request attempts:</Form.Label>
                <Form.Control
                    type="number"
                    value={requested}
                    onChange={updateRequested}
                />
            </Form.Group>
            <Button onClick={use} disabled={attempts === 0}>
                use
            </Button>
            <Button onClick={gain}>gain</Button>
        </div>
    );
}

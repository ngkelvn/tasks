import React, { useState } from "react";
import { Form } from "react-bootstrap";

const COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
];

export function ChangeColor(): React.JSX.Element {
    const [color, setColor] = useState<string>(COLORS[0]);

    function updateColor(event: React.ChangeEvent<HTMLInputElement>): void {
        setColor(event.target.value);
    }

    return (
        <div>
            <h3>Change Color</h3>
            {COLORS.map((option: string) => (
                <Form.Check
                    inline
                    type="radio"
                    name="color-choice"
                    key={option}
                    id={"color-check-" + option}
                    label={option}
                    value={option}
                    checked={color === option}
                    onChange={updateColor}
                />
            ))}
            <div
                data-testid="colored-box"
                style={{
                    backgroundColor: color,
                    width: "150px",
                    padding: "8px",
                    marginTop: "8px",
                }}
            >
                {color}
            </div>
        </div>
    );
}

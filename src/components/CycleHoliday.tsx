import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday = "🎄" | "🎃" | "🎆" | "🦃" | "💘";

// Christmas, Halloween, Independence Day, Thanksgiving, Valentine's Day
const ALPHABET_NEXT: Record<Holiday, Holiday> = {
    "🎄": "🎃",
    "🎃": "🎆",
    "🎆": "🦃",
    "🦃": "💘",
    "💘": "🎄",
};

// Valentine's Day, Independence Day, Halloween, Thanksgiving, Christmas
const YEAR_NEXT: Record<Holiday, Holiday> = {
    "💘": "🎆",
    "🎆": "🎃",
    "🎃": "🦃",
    "🦃": "🎄",
    "🎄": "💘",
};

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎃");

    function advanceByAlphabet(): void {
        setHoliday(ALPHABET_NEXT[holiday]);
    }

    function advanceByYear(): void {
        setHoliday(YEAR_NEXT[holiday]);
    }

    return (
        <div>
            <h3>Cycle Holiday</h3>
            <div>Holiday: {holiday}</div>
            <Button onClick={advanceByAlphabet}>Advance by Alphabet</Button>
            <Button onClick={advanceByYear}>Advance by Year</Button>
        </div>
    );
}

import { Question, QuestionType } from "./interfaces/question";

// A new blank question: empty body and expected, no options, 1 point, unpublished
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType,
): Question {
    return {
        id: id,
        name: name,
        body: "",
        type: type,
        options: [],
        expected: "",
        points: 1,
        published: false,
    };
}

// Correct if the answer matches `expected`, ignoring case and outer whitespace
export function isCorrect(question: Question, answer: string): boolean {
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanExpected = question.expected.trim().toLowerCase();
    return cleanAnswer === cleanExpected;
}

// Short answer: anything is valid. Multiple choice: must be exactly one option.
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

// "id: first 10 characters of name"
export function toShortForm(question: Question): string {
    const shortName = question.name.slice(0, 10);
    return question.id + ": " + shortName;
}

// "# name", then the body, then "- option" lines for multiple choice
export function toMarkdown(question: Question): string {
    const lines = ["# " + question.name, question.body];
    if (question.type === "multiple_choice_question") {
        const optionLines = question.options.map(
            (option: string): string => "- " + option,
        );
        return [...lines, ...optionLines].join("\n");
    }
    return lines.join("\n");
}

export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

// Copy with a new id, "Copy of " + name, and published reset to false
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id: id,
        name: "Copy of " + oldQuestion.name,
        options: [...oldQuestion.options],
        published: false,
    };
}

// The new question gets its own copy of the options list
export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

// Content from `contentQuestion`, points from the second argument, unpublished
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return {
        id: id,
        name: name,
        body: contentQuestion.body,
        type: contentQuestion.type,
        options: [...contentQuestion.options],
        expected: contentQuestion.expected,
        points: points,
        published: false,
    };
}

import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion } from "./objects";

// Only the questions that are published
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((question: Question): boolean => {
        return question.published;
    });
}

// Drop the "empty" questions: empty body, empty expected AND no options
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter((question: Question): boolean => {
        const isEmpty =
            question.body === "" &&
            question.expected === "" &&
            question.options.length === 0;
        return !isEmpty;
    });
}

// The question with this id, or null if there isn't one
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const found = questions.find((question: Question): boolean => {
        return question.id === id;
    });
    if (found === undefined) {
        return null;
    }
    return found;
}

// A new array without the question that has this id
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question: Question): boolean => {
        return question.id !== id;
    });
}

// Just the names, in the same order
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question): string => {
        return question.name;
    });
}

// One blank, unsubmitted, incorrect answer per question
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question: Question): Answer => {
        return {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false,
        };
    });
}

// Every question becomes published (copies, the input is not changed)
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question: Question): Question => {
        return { ...question, published: true };
    });
}

// The same questions plus a new blank one at the end
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    const newQuestion = makeBlankQuestion(id, name, type);
    return [...questions, newQuestion];
}

// Same questions, except the one with `targetId` gets the new name
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return questions.map((question: Question): Question => {
        if (question.id === targetId) {
            return { ...question, name: newName };
        }
        return question;
    });
}

// Helper: -1 (or an index past the end) adds the option at the end,
// otherwise the option at that index is replaced
function changeOptions(
    options: string[],
    targetOptionIndex: number,
    newOption: string,
): string[] {
    if (targetOptionIndex === -1 || targetOptionIndex >= options.length) {
        return [...options, newOption];
    }
    return options.map((option: string, index: number): string => {
        if (index === targetOptionIndex) {
            return newOption;
        }
        return option;
    });
}

// Same questions, except the one with `targetId` gets its options changed
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question: Question): Question => {
        if (question.id === targetId) {
            const newOptions = changeOptions(
                question.options,
                targetOptionIndex,
                newOption,
            );
            return { ...question, options: newOptions };
        }
        return question;
    });
}

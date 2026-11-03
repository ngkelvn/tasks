/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return [];
    }
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    return [first, last];
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const tripled = numbers.map((n: number): number => {
        return n * 3;
    });
    return tripled;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const integers = numbers.map((text: string): number => {
        const parsed = parseInt(text);
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    });
    return integers;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const cleaned = amounts.map((amount: string): number => {
        let digits = amount;
        if (amount.startsWith("$")) {
            digits = amount.slice(1);
        }
        const parsed = parseInt(digits);
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    });
    return cleaned;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const noQuestions = messages.filter((message: string): boolean => {
        return !message.endsWith("?");
    });
    const result = noQuestions.map((message: string): string => {
        if (message.endsWith("!")) {
            return message.toUpperCase();
        }
        return message;
    });
    return result;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const shortWords = words.filter((word: string): boolean => {
        return word.length < 4;
    });
    return shortWords.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    const allMatch = colors.every((color: string): boolean => {
        return color === "red" || color === "green" || color === "blue";
    });
    return allMatch;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length === 0) {
        return "0=0";
    }
    const sum = addends.reduce((total: number, n: number): number => {
        return total + n;
    }, 0);
    const equation = addends.join("+");
    return sum + "=" + equation;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    const negativeIndex = values.findIndex((value: number): boolean => {
        return value < 0;
    });

    // No negative number: add the total of everything at the end
    if (negativeIndex === -1) {
        const total = values.reduce((sum: number, n: number): number => {
            return sum + n;
        }, 0);
        return [...values, total];
    }

    // Negative number found: add the total of the numbers before it,
    // placed right after the negative number
    const beforeNegative = values.slice(0, negativeIndex);
    const total = beforeNegative.reduce((sum: number, n: number): number => {
        return sum + n;
    }, 0);
    const upToNegative = values.slice(0, negativeIndex + 1);
    const afterNegative = values.slice(negativeIndex + 1);
    return [...upToNegative, total, ...afterNegative];
}

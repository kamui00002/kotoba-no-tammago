import { Word, QuizQuestion, Difficulty } from '../types';

/**
 * Fisher-Yates (aka Knuth) Shuffle.
 * @param array An array of any type.
 * @returns A new array with the elements randomly shuffled.
 */
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Generates a set of quiz questions for a given difficulty.
 * @param allWords - The array of all available words.
 * @param difficulty - The desired difficulty for the quiz.
 * @param count - The number of questions to generate.
 * @returns An array of QuizQuestion objects.
 */
export const generateQuizQuestions = (allWords: Word[], difficulty: Difficulty, count: number): QuizQuestion[] => {
    // 1. Filter words by the selected difficulty.
    const filteredWords = allWords.filter(w => w.difficulty === difficulty);

    // 2. Shuffle the filtered words and select the number of questions needed.
    const selectedWords = shuffleArray(filteredWords).slice(0, count);

    // 3. For each selected word, create a quiz question object with shuffled options.
    return selectedWords.map(word => {
        const options = shuffleArray([word.meaning, ...word.wrongChoices]);
        return {
            ...word,
            options,
        };
    });
};

/**
 * Checks if a given value is defined meaning NON undefined AND NOT null.
 * @param value The value to be checked.
 * @returns True if the value is defined, otherwise false.
 */
export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

/**
 * Checks if a given value is a real number meaning any number without the NaN special value.
 * @param value The value to be checked.
 * @returns True if the value is a real number, otherwise false.
 */
export function isRealNumber(value: number | undefined | null): value is number {
    return isDefined(value) && !isNaN(value);
}

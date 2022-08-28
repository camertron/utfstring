/** Regular expression for matching surrogate pairs. */
const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
export function createSurrogatePairScanner(): RegExp {
    return new RegExp(surrogatePairs.source);
}

/**
 * Creates a regular expression that matches every character of a string and is UTF-safe.
 * @returns The regular expression for matching every character of a string.
 */
export function createUtfSafeCharScanner(): RegExp {
    let sources = new Array<string>();

    sources.push(surrogatePairs.source);
    sources.push("[^]");

    return new RegExp(sources.join("|"), "g");
}

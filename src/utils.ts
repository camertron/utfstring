/** Regular expression for matching surrogate pairs. */
const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

/** Regular expression for matching regional indicator pairs. */
const regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;

/**
 * Creates a regular expression that matches every character of a string and is UTF-safe.
 * @returns The regular expression for matching every character of a string.
 */
export function createUtfSafeCharScanner(): RegExp {
    const sources = new Array<string>();

    sources.push(surrogatePairs.source);
    sources.push("[^]");

    return new RegExp(sources.join("|"), "g");
}

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
export function createSurrogatePairScanner(): RegExp {
    const sources = new Array<string>();

    sources.push(surrogatePairs.source);

    return new RegExp(sources.join("|"), "g");
}

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
export function createRegionalIndicatorPairScanner(): RegExp {
    const sources = new Array<string>();

    sources.push(regionalIndicatorPairs.source);
    sources.push(surrogatePairs.source);

    return new RegExp(sources.join("|"), "g");
}

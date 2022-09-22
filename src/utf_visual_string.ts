import { surrogatePairs, UtfString } from "./utf_string";

/** Regular expression for matching regional indicator pairs. */
const regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;

/**
 * Creates a regular expression that matches surrogate pairs.
 * @returns The regular expression that matches surrogate pairs.
 */
export function createRegionalIndicatorAndSurrogatePairScanner(): RegExp {
    return new RegExp(regionalIndicatorPairs.source + "|" + surrogatePairs.source, "g");
}

/**
 * Creates a regular expression that matches regional indicator pairs and surrogate pairs.
 * @returns The regular expression that matches regional indicator pairs and surrogate pairs.
 */
export function createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs(): RegExp {
    const sources = new Array<string>();

    sources.push(regionalIndicatorPairs.source);
    sources.push(surrogatePairs.source);
    sources.push("[^]");

    return new RegExp(sources.join("|"), "g");
}

/**
 * Class with UTF-safe string operations that treats regional indicator pairs as one character.
 */
export class UtfVisualString extends UtfString {
    /**
     * Creates a char scanner that matches unsafe UTF chars.
     * @returns A char scanner that matches unsafe UTF chars.
     */
    protected static override createUnsafeUtfCharFinder(): RegExp {
        return createRegionalIndicatorAndSurrogatePairScanner();
    }

    /**
     * Creates a UTF-safe char scanner.
     * @returns A UTF-safe char scanner.
     */
    protected static override createUtfSafeCharScanner(): RegExp {
        return createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs();
    }
}

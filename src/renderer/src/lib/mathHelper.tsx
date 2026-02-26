/**
 * Re-mapped eine Zahl von einem Quell-Bereich in einen Ziel-Bereich.
 * Ähnlich der map() Funktion in Processing oder Arduino.
 *
 * @param value  - Der zu transformierende Eingabewert.
 * @param inMin  - Die untere Grenze des Eingabebereichs.
 * @param inMax  - Die obere Grenze des Eingabebereichs.
 * @param outMin - Die untere Grenze des Zielbereichs.
 * @param outMax - Die obere Grenze des Zielbereichs.
 * @returns      - Der auf den Zielbereich skalierte Wert.
 *
 * @example
 * // Gibt 0.5 zurück (Mitte zwischen 0 und 1)
 * mapRange(50, 0, 100, 0, 1);
 */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function easeInCirc(x: number): number {
    return 1 - Math.sqrt(1 - Math.pow(x, 2))
}

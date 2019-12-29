export default class Fraction {
    n: number;
    d: number;
    constructor(n: number, d?: number);
    toString(): string;
    static dtf(n: number): Fraction;
    simplified(): Fraction;
    decimal(): number;
    plus(other: Fraction): Fraction;
    minus(other: Fraction): Fraction;
    times(other: Fraction): Fraction;
    divide(other: Fraction): Fraction;
}

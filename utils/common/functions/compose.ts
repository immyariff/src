export type Compose = (
    f: (x: number) => string, 
    g: (x: number) => number) => (x: number) => string;
const compose: Compose = (f, g) => x => f(g(x));

export default compose;
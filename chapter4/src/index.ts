// 関数
function add(a: number, b: number): number {
    return a + b
}

// 関数には関数式、アロー関数式、アロー関数式の省略記法などがある
// パラメータに?をつけると省略可能。デフォルト値もつけれる
let greet = (name: string) => {
    return 'Hello ' + name
}

console.log(add(1, 3))
console.log(greet('TypeScript'))

// 可変長引数関数（定義は一度だけ&最後に書くこと）
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

console.log(sum(1, 2, 3))

// ジェネレータ
function* createFibonacciGenerator() {
    let a = 0
    let b = 1
    while (true) {
        yield a; // ジェネレータが返す値を定義する際はyieldを使う
        [a, b] = [b, a + b]
    }
}
let g = createFibonacciGenerator()
console.log(g.next())

// イテレーター
let numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 10; n++) {
            yield n
        }
    }
}

for (let a of numbers) {
    console.log(a)
}

// 呼び出しシグネチャ（値、例えばデフォルト値などは保持できない、あくまで型の表現）
// (a: number, b: number) => number
type Greet = (name: string) => string
let greeting: Greet = (name => {
    return 'Hello, ' + name
})
greeting('TypeScript')

// オーバーロードのために、完全な呼び出しシグネチャの書き方をすることがあるらしい
// ジェネリック型（パラメータ）、エイリアスにも使えるし、extendsで制限をつけることも可能、そうデフォルト値もね
/*
type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => {
    let result = []
    return result
}

let names = [
    {firstName: 'beth'},
    {firstName: 'caitlyn'},
    {firstName: 'xin'}
]

console.log(filter(names, _ => _.firstName.startsWith('b')))
*/


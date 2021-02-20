// リテラル型と言う考え方があるのか
let a = true
let b = 123
const c = 1_000_000 // リテラル型
console.log(c)
let d: true = true // リテラル型
console.log(d)

// symbol型なんつうもんがあるのね
let s = Symbol('s')
console.log(s)
const cs = Symbol('cs') // typeof cs

let o: {
    firstName: string
    lastName: string
} = {
    firstName: 'John',
    lastName: 'Token'
}
console.log(o)

// publicの代わりにreadonly修飾子も使えるみたいよ
class Person {
    constructor(public firstName: string, public lastName: string) {}
}
o = new Person('Ore', 'Person')
console.log(o)

// 型エイリアス
type Age = number
type P = {
    name: string,
    age: Age
}
let p: P = {
    name: 'Anderson',
    age: 24,
}

// 合併型、交差型なんてのもあるのかww（型で表現というのが面白）
type Returns = string | null
function trueOrNull(isTrue: boolean) {
    if (isTrue) {
        return 'true'
    }
    return null
}

let returns: Returns = trueOrNull(a)
console.log(returns)

let ary = [1, 'd']
let map_ary = ary.map(_ => {
    if (typeof _ === 'number') {
        return _ * 3
    }
    return _.toUpperCase()
})
console.log(map_ary)

// タプル型もあるみたいよ
let friends: [string, ...string[]] = ['sara', 'sora', 'hora']
console.log(friends)

// read onlyの配列も定義できる
let as: readonly number[] = [1, 2, 3]
console.log(as)

// null, undefined, void(kotlinでいうunit), never(throwとか)は区別される

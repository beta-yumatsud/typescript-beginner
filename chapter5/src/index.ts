// class
// チェスゲーム
class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [
            new King('White', 'E', 1),
            new King('Black', 'E', 8),

            new Queen('White', 'D', 1),
            new Queen('Black', 'D', 8),

            new Bishop('White', 'C', 1),
            new Bishop('White', 'F', 1),
            new Bishop('Black', 'C', 8),
            new Bishop('Black', 'F', 8)
        ]
    }
}

abstract class Piece {
    protected position: Position

    constructor(
        private readonly color: Color,
        file: File,
        rank: Rank,
    ) {
        this.position = new Position(file, rank)
    }

    moveTo(position: Position) {
        this.position = position
    }

    abstract canMoveTo(position: Position): boolean
}

class Position {
    constructor(
        private file: File,
        private rank: Rank
    ) {}

    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
}

class King extends Piece {
    canMoveTo(position: Position): boolean {
        let distance = this.position.distanceFrom(position)
        return distance.rank < 2 && distance.file < 2
    }

}
class Queen extends Piece {
    canMoveTo(position: Position): boolean {
        return false;
    }
}
class Bishop extends Piece {
    canMoveTo(position: Position): boolean {
        return false;
    }
}
class Knight extends Piece {
    canMoveTo(position: Position): boolean {
        return false;
    }
}
class Rook extends Piece {
    canMoveTo(position: Position): boolean {
        return false;
    }
}
class Pawn extends Piece {
    canMoveTo(position: Position): boolean {
        return false;
    }
}

type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// interface
// 型エイリアスとほぼ同じ構文になるみたいよ（興味深い）
// 宣言のマージというのは面白いけど、使う画面があるか疑問（マージされちゃうよ！という注意？）
interface User {
    name: string
    eat(food: string): void
}

interface User {
    age: number
}
// この2つは1つにマージされるらしい

class Darma2 implements User {
    eat(food: string): void {
        console.log(this.name + "eat " + food)
    }
    age: number;
    name: string;
}

// クラスは構造的に型付けされる（要は名前じゃなくて構造によるよーというもの）

type State = {
    [key: string]: string
}

class StringDatabase {
    state: State = {}

    get(key: string): string | null {
        return key in this.state ? this.state[key] : null
    }

    set(key: string, value: string): void {
        this.state[key] = value
    }

    static from(state: State) {
        let db = new StringDatabase
        for (let key in state) {
            db.set(key, state[key])
        }
        return db
    }
}
// この宣言で下記の2つの型が生成されるのと同意らしい
interface StringDatabase {
    state: State
    get(key: string): string | null
    set(key: string, value: string): void
}

interface StringDatabaseConstructor {
    new(): StringDatabase
    from(state: State): StringDatabase
}

// ジェネリック型も使えおー
class MyMap<K, V> {
    constructor(initialKey: K, initialValue: V) {
    }
    set(key: K, value: V): void {
    }
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {
        return
    }

    static of<K, V>(k: K, v: V): MyMap<K, V> {
        return
    }
}
let a = new MyMap<string, number>('K', 1)
let b = new MyMap('k', true)

// ミックスイン
type ClassConstructor<T> = new(...args: any[]) => T

function withEZDebug<C extends ClassConstructor<{
    getDebugValue(): object
}>>(Class: C) {
    return class extends Class {
        constructor(...args: any[]) {
            super(...args);
        }

        debug() {
            let Name = this.construcotr.name
            let value = this.getDebugValue()
            return Name + '(' + JSON.stringify(value) + ')'
        }
    }
}

class HardToDebugUser {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) {
    }

    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName
        }
    }
}

let User = withEZDebug(HardToDebugUser)
let user = new User(3, 'Emma', 'Gluzman')
user.debug()

// デコレータも実験的に組み込まれているそう

// ファクトリーパターン
type Shoe = {
    purpose: string
}
class BalletFlat implements Shoe {
    purpose = 'dancing'
}
class Boot implements Shoe {
    purpose = 'woodcutting'
}
class Sneaker implements Shoe {
    purpose = 'walking'
}

let Shoe = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
        switch (type) {
            case "balletFlat": return new BalletFlat
            case "boot": return new Boot
            case "sneaker": return new Sneaker
        }
    }
}

// ビルダーパターン
class RequestBuilder {
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null

    setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }

    setData(data: object): this {
        this.data = data
        return this
    }

    setURL(url: string): this {
        this.url = url
        return this
    }
}
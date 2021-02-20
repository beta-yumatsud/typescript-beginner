// const assertion
let a = {x: 3}
let b: {x: 3}
let c = {x: 3} as const

// 過剰プロパティチェック
type Options = {
    baseURL: string
    cacheSize?: number
    tier?: 'prod' | 'dev'
}

class API {
    constructor(private options: Options) {
    }
}

new API({
    baseURL: 'https://api.hoge.com',
    tier: 'prod'
})

new API({
    baseURL: 'https://api.hoge.com',
    badTier: 'prod'
} as Options)

// 型の絞り込み
type Unit = 'cm' | 'px' | '%'
let units: Unit[] = ['cm', "px", "%"]

function parseUnit(value: string): Unit | null {
    for (let i = 0; i < units.length; i++) {
        if (value.endsWith(units[i])) {
            return units[i]
        }
    }
    return null
}

type Width = {
    unit: Unit,
    value: number
}

function parseWidth(width: number | string | null | undefined): Width | null {
    if (width == null) {
        return null
    }

    if (typeof width == 'number') {
        return {unit: 'px', value: width}
    }

    let unit = parseUnit(width)
    if (unit) {
        return {unit, value: parseFloat(width)}
    }
    return null
}

// タグ付き合併型という手法もあるみたいね
// 絞り込みの一種で型を限定することができる
// Fluxのアクション、Reduxのリデューサー、ReactのuseReducerなどに有益みたい

// ルックアップ
type APIResponse = {
    user: {
        userId: string,
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}
type FriendList = APIResponse['user']['friendList']
type Friend = FriendList['friends'][number]

// keyof演算子: オブジェクトの全てのキーを文字列リテラル型の合併として取得できる
type ResponseKeys = keyof APIResponse // 'user'
type FriendListKeys = keyof FriendList // 'count' | 'friends'

function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k]
}

type ActivityLog = {
    lastEvent: Date
    events: {
        id: string
        timestamp: Date
        type: 'Read' | 'Write'
    }[]
}
// let activityLog: ActivityLog = // ...
// let lastEvent = get(activityLog, 'lastEvent') // Date

// レコード型
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'
let nextDay: Record<Weekday, Day> = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat',
}

// マップ型
let nextDayMap: {[K in Weekday]: Day} = {
    Mon: "Tue",
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat',
}

type Account = {
    id: number
    isEmployee: boolean
    notes: string[]
}
type OptionalAccount = {
    [K in keyof Account]?: Account[K]
}
// 組み込みのマップ型としてRecord、Partial、Required、Readonly、Pickなどがある模様

// コンパニオンオブジェクトパターン
type CUnit = 'EUR' | 'GBP' | 'JPY' | 'USD'
type Currency = {
    unit: CUnit
    value: number
}
let Currency = {
    from(value: number, unit: CUnit): Currency {
        return {
            unit: unit,
            value
        }
    }
}

// ユーザ定義型ガード（型の絞り込みが引き継がれるらしい）
function isString(a: unknown): a is string {
    return typeof a === 'string'
}

// 分散型
type IsString<T> = T extends string ? true : false
type A = IsString<string>
type B = IsString<number>
type Without<T, U> = T extends U ? never : T
type C = Without<boolean | number | string, boolean>
type ElementType<T> = T extends (infer U)[] ? U : T
type D = ElementType<number[]>
// 組み込みの条件型としてExclude, Extract, NonNullableなどがある

// 型アサーション as を使えば良いみたい
// hoge(input as string) 的なね
// 非nullアサーション演算子として ! があるみたい。この辺はkotlinにもあるのでわかりみ

// 型のブランド
type CompanyID = string & {readonly brand: unique symbol}
type OrderID = string & {readonly brand: unique symbol}
type UserID = string & {readonly brand: unique symbol}
type ID = CompanyID | OrderID | UserID
function CompanyID(id: string) {
    return id as CompanyID
}
function OrderID(id: string) {
    return id as OrderID
}
function UserID(id: string) {
    return id as UserID
}
function queryForUser(id: UserID) {
}

let companyId = CompanyID('ytfasdfa')
let userId = UserID('fasdtad')
queryForUser(userId)
// queryForUser(companyId) // エラー

// エラー処理
// (1) nullを返す
// (2) 例外をスローする
// (3) 例外を返す ( 合併型で返すイメージ、型をうまくやれればGo言語に近いかも）
// (4) Option型: コンテナのイメージで、その中に値が入るイメージ。
// → flatMap、getOrElseなどと合わせて使うと便利そうだね
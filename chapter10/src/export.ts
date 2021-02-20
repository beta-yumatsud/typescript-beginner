// export
export function foo() {}
export function bar() {}
export default function meow(loudness: number) {}

// 型やインターフェースもexport可能
// 型と値は別々の名前空間の中に存在することも利用可能
export let X = 3
export type X = {y: string}

// 名前空間
// 関数、変数、型、インターフェースなどをサポート
// 同じ名前の関数でもオーバーロードされたアンビエント関数は可
namespace Network {
    export namespace HTTP {
        export function get<T>(url: string): Promise<T> {
            return
        }
    }

    export namespace TCP {
        export function listenOn(port: number) {
            // ...
        }
    }
}
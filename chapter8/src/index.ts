// 非同期（並行、並列）処理
// 簡易なものはcallbackを使ったりもする
// あとはPromiseとかを使うのはJSとあまり変わらないみたい
/*
import {readFile} from "fs";

type Executor<T, E extends Error> = (
    resolve: (result: T) => void,
    reject: (error: E) => void
) => void

class Promise<T, E extends Error> {
    constructor(f: Executor<T, E>) {}
    then<U, F extends Error>(g: (result: T) => Promise<U, F> | U): Promise<U, F>
    catch<U, F extends Error>(g: (result: E) => Promise<U, F> | U): Promise<U, F>
}

function readFilePromise(path: string): Promise<string, Error> {
    return new Promise<string>(((resolve, reject) => {
        readFile(path, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    }))
}

function appendAndReadPromise(path: string, data: string): Promise<string> {
    return appendPromise(path, data)
        .then(() => readPromise(path))
        .catch(error => console.log(error))
}
*/

// Promiseを使うためにも、基本的にはasync, awaitを使えばOKす。
// イベントエミッター。JSでよくあるやつ。型が安全じゃないよね〜でもTSならという話
// 下記はredis clientを型で安全にした的なやーつ
import {threadId, Worker} from "worker_threads";
import EventEmitter = require("node:events");

type Events = {
    ready: void
    error: Error
    reconnecting: {attempt: number, delay: number}
}

type RedisClient = {
    on<E extends keyof Events>(
        event: E,
        f: (args: Events[E]) => void
    ): void
    emit<E extends keyof Events>(
        event: E,
        arg: Events[E]
    ): void
}

// 並列性
// Web Worker: メッセージパッシングで情報の受け渡しを行う
/*
let worker = new Worker("worker.js")
worker.onmessage = e => {
    console.log(e.data)
}
worker.postMessage("some data")
*/
// 下記は型安全に使えるようにwrapして行くもの。これはいいね〜（コーディングも楽）
/*
type Message = string
type ThreadID = number
type UserID = number
type Participants = UserID[]

type Commands = {
    sendMessageToThread: [ThreadID, Message]
    createThread: [Participants]
    addUserToThread: [ThreadID, UserID]
    removeUserFromThread: [ThreadID, UserID]
}

type IEvents = {
    receivedMessage: [ThreadID, UserID, Message]
    createThread: [ThreadID, Participants]
    addUserToThread: [ThreadID, UserID]
    removedUserFromThread: [ThreadID, UserID]
}

interface SafeEmitter<IEvents extends Record<PropertyKey, unknown[]>> {
    emit<K extends keyof IEvents>(
        channel: K,
        ...data: IEvents[K]
    ): boolean
    on<K extends keyof IEvents>(
        channel: K,
        listener: (...data: IEvents[K]) => void
    ): this
    on(
        channel: never,
        listener: (...data: unknown[]) => void
    ): this
}

let commandEmitter: SafeEmitter<Commands> = new EventEmitter()
onmessage = command => {
    commandEmitter.emit(
        command.data.type,
        ...command.data.data
    )
}

let eventEmitter: SafeEmitter<IEvents> = new EventEmitter()
eventEmitter.on('createThread', data => {
    postMessage({type: 'createdThread', data})
})

commandEmitter.on('sendMessageToThread', (threadId, message) => {
    console.log(`OK, I will send a message to threadID ${threadId}`)
})
*/
// Node.jsでは `child_process` とかを使う以外は上記のように型安全を定義してやれる

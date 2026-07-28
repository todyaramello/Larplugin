declare module '@vendetta/plugin' {
    export const storage: Record<string, any>
}

declare module '@vendetta/metro' {
    export function findByProps(...props: string[]): any
    export function findByDisplayName(name: string): any
    export function findByStoreName(name: string): any
    export function find(mapper: (m: any) => boolean): any
    export function findAll(mapper: (m: any) => boolean): any[]
}

declare module '@vendetta/patcher' {
    export function before(method: string, object: any, callback: (args: any[]) => any): () => void
    export function after(method: string, object: any, callback: (args: any[], ret: any) => any): () => void
    export function instead(method: string, object: any, callback: (args: any[], orig: Function) => any): () => void
}

declare module '@vendetta/storage' {
    export function useProxy<T extends Record<string, any>>(obj: T): T
}

declare module '@vendetta/ui/components' {
    export const Forms: {
        FormSwitchRow: any
        FormInput: any
        FormRow: any
        FormRadioRow: any
        FormSection: any
    }
    export const ErrorBoundary: any
}

declare module '@vendetta/ui/assets' {
    export function getAssetIDByName(name: string): number
}

declare module '@vendetta/metro/common' {
    export const ReactNative: typeof import('react-native')
    export const React: typeof import('react')
}

declare module '@vendetta/logger' {
    export default {
        log(...args: any[]): void
        warn(...args: any[]): void
        error(...args: any[]): void
    }
}

/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: {
        readonly VITE_API_URL: string
        readonly VITE_NODE_ENV: 'development' | 'production' | 'test'
        readonly [key: string]: string | undefined
    }
}

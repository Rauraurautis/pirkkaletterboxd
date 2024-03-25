/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACKEND_SOURCE: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
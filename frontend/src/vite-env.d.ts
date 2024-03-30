/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACKEND_SOURCE: string
    readonly VITE_IP_ADDRESS: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
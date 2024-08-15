// Derived from gulpfile.js

export type GulpTask = 'create-templates' | 'inject-templates' | 'usemin' | 'add-dependencies' | 'copy-asset-files' | 'clean' | 'connect-dev' | 'connect-prod' | 'watch' | 'build' | 'default';

export interface GulpSrcOptions {
    read?: boolean;
}

export interface NgHtml2JsOptions {
    moduleName: string;
    rename: (url: string) => string;
}

export interface UseminOptions {
    css: Array<any>;
    js: Array<any>;
    assets: Array<any>;
}

export interface GulpAngularExtenderOptions {
    [key: string]: string[];
}

export interface ConnectServerOptions {
    root: string;
    port: number;
}

export interface ReplaceOptions {
    pattern: RegExp;
    replacement: string;
}

export interface RevOutdatedOptions {
    count: number;
}

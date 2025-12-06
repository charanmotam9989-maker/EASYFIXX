/// <reference path="../.astro/types.d.ts" />

declare global {
  interface SDKTypeMode {
    strict: true;
  }
}

interface ImportMetaEnv {
  readonly BASE_NAME?: string;
  readonly SENDGRID_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

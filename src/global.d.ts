// src/global.d.ts
export {}; // plik jako moduł

type GtagConsent = "granted" | "denied";

type GtagFn = {
  (command: "js", date: Date): void;
  (command: "config", measurementId: string, params?: Record<string, unknown>): void;
  (command: "event", action: string, params?: Record<string, unknown>): void;
  (command: "consent", action: "default" | "update", params: Record<string, GtagConsent>): void;
  (command: "set", params: Record<string, unknown>): void;
};

type DataLayerItem =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: DataLayerItem[];
  }
}

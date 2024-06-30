// react/src/services/preLoader.ts

export function preLoader(
  src: string,
  onLoad: () => void,
  onError: () => void
): void {
  const img = new Image();
  img.onload = onLoad;
  img.onerror = onError;
  img.src = src;
}

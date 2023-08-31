export default function isIframe(): boolean {
  return window.frameElement !== null
      || window.self !== window.top
      || window.parent !== window;
}

export function isCrossIframe(): boolean {
  const parentLocation = new URL(document.referrer);
  return parentLocation.protocol !== location.protocol ||
          parentLocation.hostname !== location.hostname ||
          parentLocation.port     !== location.port;
}

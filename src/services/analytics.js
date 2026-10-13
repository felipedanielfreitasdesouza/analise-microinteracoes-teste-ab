const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
const contentsquareTagId = import.meta.env.VITE_CONTENTSQUARE_TAG_ID?.trim();

const pendingUmamiEvents = [];

function flushPendingUmamiEvents() {
  if (typeof window === 'undefined' || typeof window.umami?.track !== 'function') {
    return;
  }

  while (pendingUmamiEvents.length > 0) {
    const { name, data } = pendingUmamiEvents.shift();
    window.umami.track(name, data);
  }
}

function addScript(script) {
  document.head.appendChild(script);
}

function initializeUmami() {
  if (!umamiScriptUrl || !umamiWebsiteId || document.querySelector('[data-tcc-analytics="umami"]')) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = umamiScriptUrl;
  script.dataset.websiteId = umamiWebsiteId;
  script.dataset.doNotTrack = 'true';
  script.dataset.tccAnalytics = 'umami';
  script.addEventListener('load', flushPendingUmamiEvents, { once: true });

  addScript(script);
}

function contentsquarePath(path = window.location.pathname) {
  return `${path}${window.location.hash.replace('#', '?__')}`;
}

function initializeContentsquare() {
  if (!contentsquareTagId || typeof window === 'undefined' || document.querySelector('[data-tcc-analytics="contentsquare"]')) {
    return;
  }

  window._uxa = window._uxa || [];
  window._uxa.push(['setPath', contentsquarePath()]);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://t.contentsquare.net/uxa/${contentsquareTagId}.js`;
  script.dataset.tccAnalytics = 'contentsquare';

  addScript(script);
}

export function initializeAnalytics() {
  if (typeof document === 'undefined') {
    return;
  }

  initializeUmami();
  initializeContentsquare();
}

export function trackUmamiEvent(name, data = {}) {
  if (typeof window === 'undefined' || !umamiScriptUrl || !umamiWebsiteId) {
    return;
  }

  if (typeof window.umami?.track !== 'function') {
    pendingUmamiEvents.push({ name, data });
    return;
  }

  window.umami.track(name, data);
}

export function trackContentsquareEvent(name) {
  if (typeof window !== 'undefined' && contentsquareTagId) {
    window._uxa = window._uxa || [];
    window._uxa.push(['trackPageEvent', name]);
  }
}

export function trackExperimentEvent(name, prototype, data = {}) {
  const eventData = { prototype, ...data };
  const contentsquareEventName = `${name}_${prototype.toLowerCase()}`;

  trackUmamiEvent(name, eventData);
  trackContentsquareEvent(contentsquareEventName);
}

export function trackContentsquareStateChange(path) {
  if (typeof window !== 'undefined' && contentsquareTagId) {
    window._uxa = window._uxa || [];
    window._uxa.push(['setPath', contentsquarePath(path)]);
    window._uxa.push(['trackPageview']);
  }
}

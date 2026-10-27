const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL?.trim();
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID?.trim();
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

const pendingUmamiEvents = [];
const taskStartStorageKey = 'tcc-microinteracoes-task-starts';

function getStudySessionId() {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  const storageKey = 'tcc-microinteracoes-session-id';

  try {
    const existingSessionId = window.sessionStorage.getItem(storageKey);

    if (existingSessionId) {
      return existingSessionId;
    }

    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    window.sessionStorage.setItem(storageKey, newSessionId);
    return newSessionId;
  } catch {
    return 'session-unavailable';
  }
}

function readTaskStarts() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    return JSON.parse(window.sessionStorage.getItem(taskStartStorageKey) || '{}');
  } catch {
    return {};
  }
}

function writeTaskStarts(taskStarts) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(taskStartStorageKey, JSON.stringify(taskStarts));
  } catch {
    // O rastreamento não deve impedir o uso do protótipo se o armazenamento estiver indisponível.
  }
}

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

function initializeClarity() {
  if (!clarityProjectId || typeof window === 'undefined' || document.querySelector('[data-tcc-analytics="clarity"]')) {
    return;
  }

  window.clarity = window.clarity || function clarityQueue(...args) {
    window.clarity.q = window.clarity.q || [];
    window.clarity.q.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
  script.dataset.tccAnalytics = 'clarity';

  addScript(script);
}

export function initializeAnalytics() {
  if (typeof document === 'undefined') {
    return;
  }

  initializeUmami();
  initializeClarity();
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

export function trackClarityTag(key, value) {
  if (typeof window !== 'undefined' && clarityProjectId && typeof window.clarity === 'function') {
    window.clarity('set', key, value);
  }
}

export function trackExperimentEvent(name, prototype, data = {}) {
  const eventData = {
    prototype,
    session_id: getStudySessionId(),
    occurred_at: new Date().toISOString(),
    ...data,
  };

  trackUmamiEvent(name, eventData);
}

export function trackTaskStarted(taskId, prototype, data = {}) {
  const taskStarts = readTaskStarts();
  const taskKey = `${prototype}:${taskId}`;

  if (taskStarts[taskKey]) {
    return;
  }

  const startedAt = Date.now();
  taskStarts[taskKey] = startedAt;
  writeTaskStarts(taskStarts);

  trackExperimentEvent('task_started', prototype, {
    task_id: taskId,
    started_at: new Date(startedAt).toISOString(),
    ...data,
  });
}

export function trackTaskCompleted(taskId, prototype, data = {}) {
  const taskStarts = readTaskStarts();
  const taskKey = `${prototype}:${taskId}`;
  const startedAt = taskStarts[taskKey];
  const completedAt = Date.now();
  const durationMs = startedAt ? Math.max(0, completedAt - startedAt) : null;

  if (startedAt) {
    delete taskStarts[taskKey];
    writeTaskStarts(taskStarts);
  }

  trackExperimentEvent('task_completed', prototype, {
    task_id: taskId,
    completed_at: new Date(completedAt).toISOString(),
    duration_ms: durationMs,
    duration_seconds: durationMs === null ? null : Number((durationMs / 1000).toFixed(2)),
    ...data,
  });
}

export function trackTaskError(taskId, prototype, data = {}) {
  trackExperimentEvent('task_error', prototype, {
    task_id: taskId,
    ...data,
  });
}

export function trackTaskAbandoned(taskId, prototype, data = {}) {
  const taskStarts = readTaskStarts();
  const taskKey = `${prototype}:${taskId}`;
  const startedAt = taskStarts[taskKey];
  const abandonedAt = Date.now();
  const durationMs = startedAt ? Math.max(0, abandonedAt - startedAt) : null;

  if (startedAt) {
    delete taskStarts[taskKey];
    writeTaskStarts(taskStarts);
  }

  trackExperimentEvent('task_abandoned', prototype, {
    task_id: taskId,
    abandoned_at: new Date(abandonedAt).toISOString(),
    duration_ms: durationMs,
    duration_seconds: durationMs === null ? null : Number((durationMs / 1000).toFixed(2)),
    ...data,
  });
}

export function trackActiveTasksAbandoned(prototype, data = {}) {
  const taskPrefix = `${prototype}:`;
  const activeTaskIds = Object.keys(readTaskStarts())
    .filter((taskKey) => taskKey.startsWith(taskPrefix))
    .map((taskKey) => taskKey.slice(taskPrefix.length));

  activeTaskIds.forEach((taskId) => {
    trackTaskAbandoned(taskId, prototype, data);
  });
}

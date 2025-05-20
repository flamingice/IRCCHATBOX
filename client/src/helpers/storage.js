export const getLastViewed = (key) => {
  return localStorage.getItem(`lastViewed:${key}`);
};

export const setLastViewed = (key) => {
  localStorage.setItem(`lastViewed:${key}`, new Date().toISOString());
};

export const hasUnread = (key, lastMessageTime) => {
  const lastViewed = getLastViewed(key);

  if (!lastViewed) return true;

  return new Date(lastMessageTime) > new Date(lastViewed);
};

export function getAllLastViewedItems() {
  const result = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && key.startsWith('lastViewed:')) {
      result[key] = localStorage.getItem(key);
    }
  }

  return result;
}

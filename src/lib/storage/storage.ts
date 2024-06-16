export function setLocalStorage(gameID: string, events: Event[]): void {
  localStorage.set(gameID, JSON.stringify(events));
}

export function getLocalStorage(gameID: string): Event[] {
  let events = localStorage.getItem(gameID);
  if (events === null) {
    return [];
  } else {
    return JSON.parse(events);
  }
}

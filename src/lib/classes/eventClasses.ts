// export class EventList {
//   events: Event[];

//   constructor(events?: Event[]) {
//     this.events = events || [];
//   }

//   getEvents(): Event[] {
//     return this.events;
//   }

//   addEvent(event: Event): void {
//     this.events = [...this.events, event];
//   }

//   removeEvent(id: ReturnType<typeof crypto.randomUUID>): void {
//     this.events = this.events.filter((e) => e.id !== id);
//   }

//   editEvent(id: ReturnType<typeof crypto.randomUUID>, event: Event): void {
//     this.events = this.events.map((e) => (e.id === id ? event : e));
//   }
// }

export class Event {
  id: ReturnType<typeof crypto.randomUUID>;
  meta: EventMeta;
  writerMeta: EventWriterMeta;
  screens: {
    start: Screen;
    [index: string]: Screen;
  };
  effects?: {
    onStart?: Effects;
    onEnd?: Effects;
  };

  constructor(title?: string, slug?: string) {
    this.id = crypto.randomUUID();
    this.meta = new EventMeta(title, slug);
    this.screens = { start: new Screen('start') };
    this.writerMeta = new EventWriterMeta();
    this.effects = {
      onStart: new Effects(),
      onEnd: new Effects()
    };
  }
}

export class EventMeta {
  slug: string;
  title: string;
  repeatable: boolean;
  random: boolean;
  priority?: number;
  rarity?: number;
  requires?: Requirements;

  constructor(title?: string, slug?: string) {
    this.slug = slug || '';
    this.title = title || '';
    this.repeatable = false;
    this.random = false;
    this.priority = 1;
    this.rarity = 1;
    this.requires = new Requirements();
  }
}

class EventWriterMeta {
  status: string;

  constructor() {
    this.status = 'draft';
  }
}

class Screen {
  title: string;
  text: string;
  options: Option[];

  constructor(title: string) {
    this.title = title;
    this.text = '';
    this.options = [new Option()];
  }
}

class Option {
  text: string;
  next: string;
  requires?: Requirements;
  effects?: Effects;

  constructor() {
    this.text = '';
    this.next = '';
    this.requires = new Requirements();
  }
}

class Effects {
  editFlags?: FlagSet;
  editEvents?: EventChanges;

  constructor() {
    this.editFlags = new FlagSet();
    this.editEvents = new EventChanges();
  }
}

class EventChanges {
  schedule?: {
    add?: {
      event: string;
      time: number;
    }[];
    remove?: string[];
  };
  lock?: string[];
  unlock?: string[];

  constructor(schedule?: { add?: { event: string; time: number }[]; remove?: string[] }, lock?: string[], unlock?: string[]) {
    this.schedule = schedule;
    this.lock = lock;
    this.unlock = unlock;
  }
}

class Requirements {
  gameReqs?: GameRequirements;
  flags?: FlagSet;

  constructor(gameReqs?: GameRequirements, flags?: FlagSet) {
    this.gameReqs = gameReqs || new GameRequirements();
    this.flags = flags || new FlagSet();
  }
}

class GameRequirements {
  maxLevel?: number;
  minLevel?: number;

  constructor(maxLevel?: number, minLevel?: number) {
    this.maxLevel = maxLevel;
    this.minLevel = minLevel;
  }
}

class FlagSet {
  [index: string]: boolean;
}
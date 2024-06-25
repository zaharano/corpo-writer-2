// I think these could be written as extensions of types inferred from zod schemas
// TODO: refactor to use zod schemas

export type ID = ReturnType<typeof crypto.randomUUID>;

export class Event {
  readonly id: ID;
  meta: EventMeta;
  writerMeta: WriterMeta;
  screens: Screen[];
  readonly startScreen: ID;
  effects?: {
    onStart?: Effects;
    onEnd?: Effects;
  };

  constructor(title: string, slug: string) {
    this.id = crypto.randomUUID();
    this.startScreen = crypto.randomUUID();
    this.meta = new EventMeta(title, slug);
    this.screens = [new Screen('Start', 'start', this.startScreen)];
    this.writerMeta = new WriterMeta();
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
  priority: number;
  rarity: number;
  requires: Requirements;

  constructor(title?: string, slug?: string) {
    this.slug = slug || '';
    this.title = title || '';
    this.repeatable = false;
    this.random = false;
    this.priority = 50;
    this.rarity = 1;
    this.requires = new Requirements();
  }
}

class WriterMeta {
  status: string;

  constructor() {
    this.status = 'draft';
  }
}

class Screen {
  readonly id: ID;
  slug: string;
  title: string;
  text: string;
  options: Option[];
  writerMeta: WriterMeta;

  constructor(title: string, slug: string, id: ID) {
    if (id) this.id = id;
    else this.id = crypto.randomUUID();
    this.slug = slug;
    this.title = title;
    this.text = '';
    this.options = [new Option()];
    this.writerMeta = new WriterMeta();
  }
}

class Option {
  text: string;
  next: string;
  requires?: Requirements;
  effects: Effects;

  constructor() {
    this.text = '';
    this.next = '';
    this.requires = new Requirements();
    this.effects = new Effects();
  }
}

class Effects {
  addFlags: string[];
  removeFlags: string[];
  editEvents: EventChanges;

  constructor() {
    this.addFlags = [];
    this.removeFlags = [];
    this.editEvents = new EventChanges();
  }
}

class EventChanges {
  schedule: {
    add: {
      event: string;
      time: number;
    }[];
    remove: string[];
  };
  lock: string[];
  unlock: string[];

  constructor(schedule?: { add: { event: string; time: number }[]; remove: string[] }, lock: string[] = [], unlock: string[] = []) {
    if (!schedule) schedule = { add: [], remove: [] };
    if (!schedule.add) schedule.add = [];
    if (!schedule.remove) schedule.remove = [];
    this.schedule = schedule;
    this.lock = lock;
    this.unlock = unlock;
  }
}

export class Requirements {
  flags: string[];
  gameReqs: GameRequirements;

  constructor(gameReqs?: GameRequirements, flags?: string[]) {
    this.gameReqs = gameReqs || new GameRequirements();
    this.flags = flags || [];
  }
}

class GameRequirements {
  minLevel: number | null;
  maxLevel: number | null;

  constructor(maxLevel: number | null = null , minLevel: number | null = null) {
    this.maxLevel = maxLevel;
    this.minLevel = minLevel;
  }
}
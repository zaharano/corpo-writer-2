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
  status: Status;
  notes?: string;

  constructor() {
    this.status = 'draft';
  }
}

export const statuses = ['draft', 'completed', 'validated', 'archived'] as const;
export type Statuses = typeof statuses;
export type Status = Statuses[number];

export class Screen {
  readonly id: ID;
  title: string;
  slug: string;
  text: string;
  options: Option[];
  writerMeta: WriterMeta;

  constructor(title: string, slug: string, id?: ID) {
    if (id) this.id = id;
    else this.id = crypto.randomUUID();
    this.slug = slug;
    this.title = title;
    this.text = '';
    this.options = [new Option()];
    this.writerMeta = new WriterMeta();
  }
}

export class Option {
  id: ID;
  text: string;
  next: ID | 'endEvent' | 'endGame' | '';
  requires?: Requirements;
  effects?: Effects;

  constructor() {
    this.id = crypto.randomUUID();
    this.text = '';
    this.next = '';
    this.requires = new Requirements();
    this.effects = new Effects();
  }
}

export class Effects {
  setFlags: SetFlag[];
  editEvents: EventChanges;
  gameEffects: GameEffects;

  constructor() {
    this.setFlags = [];
    this.editEvents = new EventChanges();
    this.gameEffects = new GameEffects();
  }
}

class EventChanges {
  schedule: {
    event: string;
    time: number;
  }[];
  lock: string[];
  unlock: string[];

  constructor(schedule: { event: string, time: number }[] = [], lock: string[] = [], unlock: string[] = []) {
    this.schedule = schedule;
    this.lock = lock;
    this.unlock = unlock;
  }
}

export class Requirements {
  flags: SetFlag[];
  gameReqs: GameRequirements;

  constructor(gameReqs?: GameRequirements, flags?: { id: ID, value: boolean }[]) {
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

class GameEffects {
  performance?: number;
  time?: number;
  newEnemy?: string | 'auto';
  newDepartment?: string | 'auto';
  promotion?: string | 'auto';
  demotion?: string | 'auto';
  VFX?: GameVFX;
}

class GameVFX {
  typeSpeed?: number;
  tracker?: boolean;
  enhancedTracker?: boolean;
  flicker?: boolean;
  corruption?: boolean;
  ghost?: boolean;
}

export class Flag {
  readonly id: ID;
  title: string;
  slug: string;
  description?: string;
  defaultValue?: boolean;
  setBy?: Record<'event' | 'screen' | 'option', ID>;

  constructor(title: string, slug: string, defaultValue?: boolean, description?: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.defaultValue = defaultValue;
  }
}

export type SetFlag = { id: ID, value: boolean };
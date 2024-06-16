import gameID from '$lib/settings'

export class Event {
  meta: EventMeta;
  screens: {
    start: Screen;
    [index: string]: Screen;
  };
  effects?: {
    onStart?: Effects;
    onEnd?: Effects;
  };

  constructor() {
    this.meta = new EventMeta();
    this.screens = { start: new Screen('start') };
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

  constructor() {
    this.slug = '';
    this.title = '';
    this.repeatable = false;
    this.random = false;
    this.priority = 1;
    this.rarity = 1;
    this.requires = new Requirements();
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
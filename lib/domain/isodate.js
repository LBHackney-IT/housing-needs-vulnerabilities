export default class IsoDate {
  static today() {
    return IsoDate.parse(Date.now());
  }

  static parse(date) {
    try {
      if (!date) return date;
      if (date instanceof Date) return date.toISOString().split('T')[0];
      return IsoDate.parse(new Date(date));
    } catch {
      return null;
    }
  }
}

export class IsoDateTime {
  static now() {
    return IsoDateTime.parse(Date.now());
  }

  static parse(date) {
    try {
      if (!date) return date;
      if (date instanceof Date) return date.toISOString();
      return IsoDateTime.parse(new Date(date));
    } catch {
      return null;
    }
  }
}

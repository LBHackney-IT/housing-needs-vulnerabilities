import { Snapshot } from 'lib/domain';
import { normalise } from 'lib/utils/normalise';

function nullifyEmptyStrings(object) {
  if (!object) {
    return object;
  }

  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'object') {
      object[key] = nullifyEmptyStrings(object[key]);
    } else if (object[key] === '') {
      object[key] = null;
    }
  });

  return object;
}

export function createSnapshotModel(snapshot) {
  if (!(snapshot instanceof Snapshot)) {
    throw new TypeError(
      `expected type Snapshot, but got ${snapshot?.constructor.name}`
    );
  }

  return nullifyEmptyStrings({
    ...snapshot,
    queryFirstName: normalise(snapshot.firstName),
    queryLastName: normalise(snapshot.lastName)
  });
}

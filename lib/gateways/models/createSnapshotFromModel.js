import { Snapshot } from 'lib/domain';

export function createSnapshotFromModel({ ...snapshotModel }) {
  return new Snapshot({
    ...snapshotModel
  });
}

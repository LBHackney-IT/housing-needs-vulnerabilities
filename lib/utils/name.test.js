import { getPossessiveName } from 'lib/utils/name';

describe('name', () => {
  it('renders correct title', () => {
    const result = getPossessiveName('Bob', 'Test');
    expect(result).toEqual("Bob Test's");
  });

  it('renders correct title for names that end with "S"', () => {
    const result = getPossessiveName('Bob', 'Tes');
    expect(result).toEqual("Bob Tes'");
  });

  it('renders correct title for names that have special characters', () => {
    const result = getPossessiveName('X Æ A-12', 'Musk');
    expect(result).toEqual("X Æ A-12 Musk's");
  });

  it('renders correct title for names with an empty string for last Name', () => {
    const result = getPossessiveName('Dan', '');
    expect(result).toEqual("Dan's");
  });
});

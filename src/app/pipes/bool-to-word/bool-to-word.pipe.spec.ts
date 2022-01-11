import { BoolToWordPipe } from './bool-to-word.pipe';

describe('BoolToWordPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolToWordPipe();
    expect(pipe).toBeTruthy();
  });
});

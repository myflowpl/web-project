import { UserPhotoPipe } from './user-photo.pipe';

describe('UserPhotoPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPhotoPipe();
    expect(pipe).toBeTruthy();
  });
});

import { ContactPhotoUrlPipe } from './contact-photo-url.pipe';

describe('ContactPhotoUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactPhotoUrlPipe();
    expect(pipe).toBeTruthy();
  });
});

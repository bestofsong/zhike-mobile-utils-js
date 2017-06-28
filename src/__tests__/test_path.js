import path from '../path';

let dirSet = new Set();

beforeEach(() => {
  dirSet.clear();
  path.registerCacheDir(dirSet, 'a');
  path.registerCacheDir(dirSet, 'aa/a');
});

test('check register', () => {
  checkRegister('a');
  checkRegister('aa/a');
});

test('add register - normal', () => {
  path.registerCacheDir(dirSet, 'b');
  checkRegister('a');
  checkRegister('aa/a');
  checkRegister('b');
});

test('add register - subdir', () => {
  const prevTotal = dirSet.size;
  path.registerCacheDir(dirSet, 'a/b');
  checkRegister('a/b');
  checkRegister('a');
  checkRegister('aa/a');
  expect(dirSet.size).toBe(prevTotal);
});

test('add register - superdir', () => {
  const prevTotal = dirSet.size;
  path.registerCacheDir(dirSet, 'aa');
  checkRegister('a');
  checkRegister('aa');
  checkRegister('aa/a');
  expect(dirSet.size).toBe(prevTotal);
});

function checkRegister(p) {
  expect(path.isRegistered(dirSet, p)).toBeTruthy();
  expect(path.isRegistered(dirSet, p + '/')).toBeTruthy();
}

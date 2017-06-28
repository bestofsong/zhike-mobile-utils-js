// @flow

function fixedPath(path) {
  if (typeof path !== 'string' || !path.length) {
    return path;
  }
  path = path.replace(/\/{2,}/g, '/');
  const tail = path.substr(path.length - 1);
  if (tail !== '/') {
    return `${path}/`;
  } else {
    return path;
  }
}

function registerCacheDir(cachedDir, path) {
  if (!path || !path.length) {
    return;
  }
  path = fixedPath(path);
  const items = cachedDir.entries();
  let it;
  const toRm = new Set();

  do {
    it = items.next();
    const value = it && it.value;
    if (value && value[0]) {
      if (path.startsWith(value[0])) {
        return;
      } else if (value[0].startsWith(path)) {
        toRm.add(value[0]);
      }
    }
  } while (it && !it.done);

  toRm.forEach(
    item => cachedDir.delete(item)
  );
  cachedDir.add(path);
}

function isRegistered(cachedDir, path) {
  if (!path || !path.length) {
    return false;
  }
  path = fixedPath(path);
  const items = cachedDir.entries();
  let it;
  do {
    it = items.next();
    const value = it && it.value;
    if (value && value[0]) {
      if (path.startsWith(value[0])) {
        return true;
      }
    }
  } while (it && !it.done);
  return false;
}

export default {
  fixedPath,
  registerCacheDir,
  isRegistered,
};
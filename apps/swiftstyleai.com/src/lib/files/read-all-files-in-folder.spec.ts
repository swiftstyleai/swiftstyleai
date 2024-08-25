import path from 'path';

import readAllFilesInFolder from './read-all-files-in-folder';

describe('lib/files/read-all-files-in-folder', () => {
  it('should return true', async () => {
    const folders = await readAllFilesInFolder('**/*.spec.ts', __dirname);
    expect(folders.indexOf('read-all-files-in-folder.spec.ts') > -1).toEqual(
      true
    );
  });

  it('should return empty with unknow path', async () => {
    const folders = await readAllFilesInFolder(
      '**/*.spec.ts',
      path.join(__dirname, 'zzz')
    );
    expect(folders).toEqual([]);
  });
});

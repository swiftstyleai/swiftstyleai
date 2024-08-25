// https://github.com/isaacs/node-glob#options
import { glob } from 'glob';

/**
 * Reads all files in a specified folder matching a given extension pattern.
 *
 * @param extension - The file extension or glob pattern to match.
 * @param dirname - The directory name to search in. Defaults to the current working directory.
 * @returns A promise that resolves to an array of filenames matching the given pattern.
 */
export default function readAllFilesInFolder(
  extension: string,
  dirname: string = process.cwd()
): Promise<string[]> {
  return glob(extension, {
    cwd: dirname,
  });
}

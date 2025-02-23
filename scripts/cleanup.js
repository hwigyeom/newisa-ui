#!/usr/bin/env node
import { readdir, readFile, stat, unlink } from 'fs/promises';
import { join } from 'path';

// cSpell:ignore cleanupignore

/**
 * 삭제할 대상 확장자
 */
const TARGET_EXTENSIONS = ['.js', '.d.ts', '.d.ts.map'];

/**
 * 제외할 디렉토리 및 파일
 */
const DEFAULT_EXCLUDES = ['node_modules', '.git', '.vscode', '.idea', 'dist', 'coverage', '.cleanupignore'];

/**
 * 재귀적으로 특정 확장자의 파일을 삭제하는 함수
 */
async function cleanDirectory(dir, ignoreList = []) {
  const files = await readdir(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const fileStat = await stat(fullPath);

    if (ignoreList.includes(file)) continue;

    if (fileStat.isDirectory()) {
      await cleanDirectory(fullPath, ignoreList);
    } else if (TARGET_EXTENSIONS.some((ext) => file.endsWith(ext))) {
      // eslint-disable-next-line no-console -- 삭제 로그
      console.log(`DELETE: ${fullPath}`);
      await unlink(fullPath);
    }
  }
}

/**
 * `.cleanupignore` 파일이 있으면 읽어서 제외할 목록을 추가
 */
async function getIgnoreList() {
  // eslint-disable-next-line no-undef -- node.js 환경에서는 process 사용 가능
  const ignoreFilePath = join(process.cwd(), '.cleanupignore');

  try {
    const ignoreContent = await readFile(ignoreFilePath, 'utf-8');
    return [
      ...DEFAULT_EXCLUDES,
      ...ignoreContent
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    ];
  } catch {
    return DEFAULT_EXCLUDES;
  }
}

// 실행
(async () => {
  const ignoreList = await getIgnoreList();
  // eslint-disable-next-line no-undef -- node.js 환경에서는 process 사용 가능
  await cleanDirectory(process.cwd(), ignoreList);
  // eslint-disable-next-line no-console -- 완료 로그
  console.log('✅ Cleanup completed!');
})();

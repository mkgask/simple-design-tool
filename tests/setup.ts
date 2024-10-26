import '@testing-library/jest-dom';

import { afterEach } from 'vitest';
import { cleanup } from '@solidjs/testing-library';

// グローバルのクリーンアップ設定
afterEach(() => {
  cleanup();
});

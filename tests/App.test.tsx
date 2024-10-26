import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { vi } from 'vitest';
import App from '../src/App';

// SolidJSのSSRモックの設定
vi.mock('solid-js', async () => {
  const solid = await vi.importActual<typeof import('solid-js')>('solid-js');

  return {
    ...solid,
    isServer: true,
  }
});

describe('App Component', () => {
  beforeEach(() => {
    // 各テストの前にコンポーネントを再レンダリング
    render(() => <App />);
  });

  test('アプリケーションのルート要素が正しくレンダリングされる', () => {
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});

import { afterEach, expect, it } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { AnswerImprovementPreview } from './answer-improvement-preview';
import { TeamPreview } from './team-preview';
import { PROSPECT_DEMOS } from '@/lib/demo/config/prospects';

afterEach(cleanup);

it.each(PROSPECT_DEMOS)(
  'opens the $slug correction example from every report cadence',
  async (demo) => {
    render(<TeamPreview demo={demo} />);
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Email report' }), {
      button: 0,
      ctrlKey: false,
    });
    for (const cadence of ['Daily', 'Weekly', 'Monthly']) {
      fireEvent.click(
        await screen.findByRole('button', { name: cadence })
      );
      const report = screen.getByRole('article', {
        name: `${cadence} sample report`,
      });
      expect(
        within(report).getByText(demo.conversation.turns[0].question)
      ).toBeTruthy();
      expect(within(report).getByText(/not a measured failure/)).toBeTruthy();
    }
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Preview how to improve this answer →',
      })
    );
    const title = screen.getByRole('heading', {
      name: 'A missing answer becomes a better next conversation.',
    });
    await waitFor(() => expect(document.activeElement).toBe(title));
    expect(
      screen.getByText('Proposed workflow · Interactive example')
    ).toBeTruthy();
    expect(
      screen.getByText(/do not send a request or change any live chatbot/)
    ).toBeTruthy();
  }
);

it('shows the sample retest only after the example correction and review step', () => {
  const demo = PROSPECT_DEMOS[0];
  render(<AnswerImprovementPreview demo={demo} />);
  expect(
    screen.queryByRole('button', { name: 'Replay example question' })
  ).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Use example correction' })
  );
  expect(screen.getByRole('status').textContent).toContain('No live change');
  expect(screen.queryByLabelText('Illustrative retested answer')).toBeNull();
  fireEvent.click(
    screen.getByRole('button', { name: 'Replay example question' })
  );
  const retest = screen.getByLabelText('Illustrative retested answer');
  expect(
    within(retest).getByText(demo.conversation.turns[0].answer)
  ).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Restart example' }));
  expect(screen.queryByLabelText('Illustrative retested answer')).toBeNull();
});

it('clears the previous result when the team changes where its correction belongs', () => {
  render(<AnswerImprovementPreview demo={PROSPECT_DEMOS[0]} />);
  fireEvent.click(
    screen.getByRole('button', { name: 'Use example correction' })
  );
  fireEvent.click(
    screen.getByRole('button', { name: 'Replay example question' })
  );
  fireEvent.click(
    screen.getByRole('radio', { name: /In the chatbot’s knowledge/ })
  );
  expect(screen.queryByLabelText('Illustrative retested answer')).toBeNull();
  expect(
    screen.getByText(/may still share this information in visitor answers/)
  ).toBeTruthy();
  fireEvent.click(
    screen.getByRole('button', { name: 'Use example correction' })
  );
  expect(screen.getByText(/update only this chatbot’s knowledge/)).toBeTruthy();
  fireEvent.click(screen.getByRole('radio', { name: /On our website/ }));
  expect(
    screen.queryByRole('button', { name: 'Replay example question' })
  ).toBeNull();
});

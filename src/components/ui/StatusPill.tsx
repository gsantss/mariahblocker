import { cn } from '../../lib/utils';
export function StatusPill({ children, tone = 'green', pulse = false }: { children: React.ReactNode; tone?: 'green' | 'red' | 'blue' | 'amber'; pulse?: boolean }) {
  return <span className={cn('status-pill', `status-pill--${tone}`)}><span className={cn('status-dot', pulse && 'status-dot--pulse')} />{children}</span>;
}

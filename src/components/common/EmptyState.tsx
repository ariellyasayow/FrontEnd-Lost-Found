import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-300 bg-white/80 p-8 text-center shadow-soft">
      <div className="mx-auto max-w-xl space-y-3">
        <p className="font-display text-2xl text-brand-900">{title}</p>
        <p className="text-sm leading-7 text-brand-700">{description}</p>
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </div>
  );
}

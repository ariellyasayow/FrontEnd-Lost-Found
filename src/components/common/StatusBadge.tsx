import { ITEM_STATUS_META } from '../../constants/itemStatus';
import type { ItemStatus } from '../../types';

type StatusBadgeProps = {
  status: ItemStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = ITEM_STATUS_META[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${meta.tone}`}
    >
      {meta.label}
    </span>
  );
}

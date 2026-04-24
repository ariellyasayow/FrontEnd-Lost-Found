import { Link } from 'react-router-dom';

import { ITEM_CATEGORY_LABELS } from '../../constants/itemCategory';
import { buildItemDetailPath } from '../../constants/routes';
import type { Item } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { StatusBadge } from '../common/StatusBadge';

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-soft transition hover:-translate-y-1">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            {ITEM_CATEGORY_LABELS[item.category]}
          </span>
          <StatusBadge status={item.status} />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-900">{item.title}</h2>
          <p className="text-sm leading-7 text-brand-700">{item.description}</p>
        </div>

        <div className="space-y-1 text-sm text-brand-700">
          <p>Lokasi: {item.location}</p>
          <p>Tanggal posting: {formatDate(item.postedAt)}</p>
          <p>Kontak: {item.contactName}</p>
        </div>

        <Link
          to={buildItemDetailPath(item.id)}
          className="inline-flex text-sm font-semibold text-brand-900 hover:text-brand-700"
        >
          Lihat detail
        </Link>
      </div>
    </article>
  );
}

import { Link } from 'react-router-dom';

import { buildItemDetailPath } from '../../constants/routes';
import type { Item } from '../../types';
import { formatDate } from '../../utils/formatDate';

type ItemCardProps = {
  item: Item;
};

function getCategoryBadge(category: Item['category']) {
  return category === 'found' ? 'FOUND' : 'LOST';
}

export function ItemCard({ item }: ItemCardProps) {
  const locationLabel =
    item.category === 'found'
      ? `Found in ${item.location}`
      : `Last seen near ${item.location}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-brand-100/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(49,60,69,0.10)]">
      <Link to={buildItemDetailPath(item.id)} className="block">
        <div className="relative overflow-hidden bg-brand-100/20">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute right-3 top-3">
            <span className="inline-flex rounded-full bg-brand-700/95 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
              {getCategoryBadge(item.category)}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex-1 space-y-1">
          <h2 className="line-clamp-2 min-h-[2.9rem] text-[0.98rem] font-medium leading-6 text-brand-900">
            {item.title}
          </h2>
          <p className="line-clamp-2 text-[0.95rem] leading-6 text-brand-700">
            {locationLabel}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.72rem] text-brand-500">
          <p>{formatDate(item.postedAt)}</p>

          <Link
            to={buildItemDetailPath(item.id)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-100/60 hover:text-brand-900"
            aria-label={`Lihat detail ${item.title}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

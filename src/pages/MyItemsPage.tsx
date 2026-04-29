import { Link } from "react-router-dom";

import { Container } from "../components/common/Container";
import { StatusBadge } from "../components/common/StatusBadge";
import { ITEM_CATEGORY_LABELS } from "../constants/itemCategory";
import { ITEM_STATUS } from "../constants/itemStatus";
import { getReportItemCategoryLabel } from "../constants/reportCategory";
import { ROUTES } from "../constants/routes";
import { useItems } from "../hooks/useItems";
import { formatDate } from "../utils/formatDate";

export default function MyItemsPage() {
  const { myItems, updateItemStatus } = useItems();

  return (
    <Container className="space-y-8 pb-12 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
            Barang Saya
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-brand-700">
            Lacak dan kelola barang yang telah Anda laporkan. Tandai barang
            hilang saat sudah ditemukan, atau tandai barang temuan saat sudah
            dikembalikan kepada pemiliknya.
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <Link
            to={ROUTES.postLostItem}
            className="rounded-xl border-2 border-brand-300 bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-900 transition-all hover:bg-brand-100"
          >
            Post Hilang
          </Link>
          <Link
            to={ROUTES.postFoundItem}
            className="rounded-xl bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700"
          >
            Post Ditemukan
          </Link>
        </div>
      </div>

      {myItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-brand-300 bg-canvas py-20 text-center">
          <svg
            className="mb-4 h-16 w-16 text-brand-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="font-display text-xl text-brand-900">
            Belum ada item milik Anda
          </h3>
          <p className="mt-2 text-sm text-brand-500">
            Setelah Anda membuat laporan, item akan langsung muncul di halaman
            ini.
          </p>
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-soft">
          {myItems.map((item, index) => {
            const canMarkLostAsFound =
              item.category === "lost" && item.status === ITEM_STATUS.ACTIVE;
            const canMarkFoundAsReturned =
              item.category === "found" && item.status !== ITEM_STATUS.RETURNED;

            return (
              <div
                key={item.id}
                className={`flex flex-col gap-5 p-5 transition-colors hover:bg-brand-100/20 sm:flex-row sm:items-center sm:gap-6 sm:p-6 ${
                  index !== myItems.length - 1
                    ? "border-b border-brand-100"
                    : ""
                }`}
              >
                <Link
                  to={`/barang/${item.id}`}
                  className="shrink-0 overflow-hidden rounded-2xl"
                >
                  <img
                    src={
                      item.imageUrl ||
                      "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={item.title}
                    className="h-24 w-24 object-cover transition-transform duration-300 hover:scale-110 sm:h-28 sm:w-28"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-center space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500">
                    <span>{ITEM_CATEGORY_LABELS[item.category]}</span>
                    <span className="text-brand-300">/</span>
                    <span>{getReportItemCategoryLabel(item.itemType)}</span>
                    <span className="text-brand-300">/</span>
                    <span>{formatDate(item.postedAt)}</span>
                  </div>

                  <Link
                    to={`/barang/${item.id}`}
                    className="group inline-block w-fit"
                  >
                    <h3 className="font-display text-xl text-brand-900 transition-colors group-hover:text-brand-700">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-sm text-brand-500">
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  {canMarkFoundAsReturned ? (
                    <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      Menunggu Diambil
                    </span>
                  ) : item.status === ITEM_STATUS.RETURNED &&
                    item.category === "lost" ? (
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Sudah Ditemukan
                    </span>
                  ) : item.status !== ITEM_STATUS.ACTIVE ? (
                    <StatusBadge status={item.status} />
                  ) : null}

                  {canMarkLostAsFound && (
                    <button
                      type="button"
                      onClick={() =>
                        updateItemStatus(item.id, ITEM_STATUS.RETURNED)
                      }
                      className="rounded-xl border-2 border-brand-500 bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-500 hover:text-white active:scale-95"
                    >
                      Tandai Sudah Ditemukan
                    </button>
                  )}

                  {canMarkFoundAsReturned && (
                    <button
                      type="button"
                      onClick={() =>
                        updateItemStatus(item.id, ITEM_STATUS.RETURNED)
                      }
                      className="rounded-xl border-2 border-amber-400 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 transition-all hover:bg-amber-400 hover:text-white active:scale-95"
                    >
                      Tandai Sudah Dikembalikan
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}

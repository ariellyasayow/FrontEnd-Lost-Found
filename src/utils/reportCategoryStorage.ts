import type { ReportItemCategory } from "../constants/reportCategory";

const STORAGE_KEY = "lost-found-report-category-labels";

type ReportCategoryStore = Record<string, ReportItemCategory>;

type ReportCategorySource = {
  title: string;
  description: string;
  location: string;
};

function getSignature(source: ReportCategorySource) {
  return [source.title, source.description, source.location]
    .map((value) => value.trim().toLowerCase().replace(/\s+/g, " "))
    .join("|");
}

function readStore(): ReportCategoryStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReportCategoryStore) : {};
  } catch {
    return {};
  }
}

export function rememberReportItemCategory(
  source: ReportCategorySource & { itemType: ReportItemCategory },
) {
  try {
    const store = readStore();
    store[getSignature(source)] = source.itemType;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* UI metadata only; ignore storage failures. */
  }
}

export function getRememberedReportItemCategory(source: ReportCategorySource) {
  return readStore()[getSignature(source)];
}

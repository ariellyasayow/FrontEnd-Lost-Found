export const REPORT_ITEM_CATEGORY = {
  PERSONAL: "personal",
  VEHICLE: "vehicle",
  BAG: "bag",
  ACCESSORY: "accessory",
  OTHER: "other",
} as const;

export type ReportItemCategory =
  (typeof REPORT_ITEM_CATEGORY)[keyof typeof REPORT_ITEM_CATEGORY];

export const REPORT_ITEM_CATEGORY_OPTIONS: Array<{
  value: ReportItemCategory;
  label: string;
}> = [
  { value: REPORT_ITEM_CATEGORY.PERSONAL, label: "Barang Pribadi" },
  { value: REPORT_ITEM_CATEGORY.VEHICLE, label: "Kendaraan" },
  { value: REPORT_ITEM_CATEGORY.BAG, label: "Tas" },
  { value: REPORT_ITEM_CATEGORY.ACCESSORY, label: "Aksesoris" },
  { value: REPORT_ITEM_CATEGORY.OTHER, label: "Lainnya" },
];

export const REPORT_ITEM_CATEGORY_LABELS: Record<ReportItemCategory, string> =
  REPORT_ITEM_CATEGORY_OPTIONS.reduce(
    (labels, option) => ({ ...labels, [option.value]: option.label }),
    {} as Record<ReportItemCategory, string>,
  );

export function getReportItemCategoryLabel(category?: ReportItemCategory) {
  return category ? REPORT_ITEM_CATEGORY_LABELS[category] : "Lainnya";
}

export function inferReportItemCategory(source: {
  title: string;
  description?: string;
}) {
  const text = `${source.title} ${source.description ?? ""}`.toLowerCase();

  if (
    /\b(motor|mobil|sepeda|helm|kunci kendaraan|stnk|kendaraan)\b/.test(text)
  ) {
    return REPORT_ITEM_CATEGORY.VEHICLE;
  }

  if (/\b(tas|ransel|backpack|sling bag|totebag|koper)\b/.test(text)) {
    return REPORT_ITEM_CATEGORY.BAG;
  }

  if (
    /\b(jam|cincin|gelang|kalung|kacamata|aksesoris|accessory)\b/.test(text)
  ) {
    return REPORT_ITEM_CATEGORY.ACCESSORY;
  }

  if (
    /\b(dompet|kartu|ktp|kpm|nim|laptop|charger|handphone|hp|earbud|airpods)\b/.test(
      text,
    )
  ) {
    return REPORT_ITEM_CATEGORY.PERSONAL;
  }

  return REPORT_ITEM_CATEGORY.OTHER;
}

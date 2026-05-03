// src/components/forms/FormPostItem.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  REPORT_ITEM_CATEGORY,
  REPORT_ITEM_CATEGORY_OPTIONS,
  type ReportItemCategory,
} from "../../constants/reportCategory";
import type { ItemCategory } from "../../types";

export type FormPostItemValues = {
  title: string;
  description: string;
  itemType: ReportItemCategory;
  location: string;
  contactName: string;
  contactWhatsApp: string;
  imageFile?: File;
};

type FormPostItemProps = {
  category: ItemCategory;
  submitLabel?: string;
  onSubmit: (values: FormPostItemValues) => void | Promise<void>;
};

const initialValues: Omit<FormPostItemValues, "imageFile"> = {
  title: "",
  description: "",
  itemType: REPORT_ITEM_CATEGORY.PERSONAL,
  location: "",
  contactName: "",
  contactWhatsApp: "",
};

export function FormPostItem({
  category,
  submitLabel = "Post laporan",
  onSubmit,
}: FormPostItemProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const contactLabel =
    category === "found" ? "Ditemukan oleh / Penghubung" : "Nama Penghubung";
  const locationLabel =
    category === "found" ? "Lokasi ditemukan:" : "Lokasi terakhir hilang:";
  const locationPlaceholder =
    category === "found"
      ? "Contoh: Perpustakaan lantai 2"
      : "Contoh: Kafetaria UNKLAB";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await onSubmit({ ...formValues, imageFile });
      setFormValues(initialValues);
      setImageFile(undefined);
      setImagePreview(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Laporan gagal dikirim.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-full space-y-8 rounded-[2rem] border border-brand-100 bg-white p-6 sm:p-10 shadow-soft"
      onSubmit={handleSubmit}
    >
      {/* Upload Foto */}
      <div className="space-y-3">
        <span className="text-sm font-bold tracking-wide text-brand-900">
          Dokumentasi Foto
        </span>
        <div className="relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand-300 bg-canvas py-14 transition-colors hover:bg-brand-100/50">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Pratinjau foto barang"
              className="h-40 w-full rounded-xl object-cover"
            />
          ) : (
            <>
              <svg
                className="mb-3 h-10 w-10 text-brand-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
              <span className="font-semibold text-brand-900">Unggah Foto</span>
              <span className="mt-1 text-xs text-brand-500">
                Klik untuk memilih foto. Format: jpg/jpeg/png.
              </span>
            </>
          )}
        </div>
        {imageFile && (
          <p className="text-xs text-brand-500">
            File dipilih: <span className="font-medium">{imageFile.name}</span>
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Nama Barang
          </span>
          <input
            required
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Contoh: Dompet hitam kulit"
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Kategori
          </span>
          <select
            required
            name="itemType"
            value={formValues.itemType}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          >
            {REPORT_ITEM_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            {locationLabel}
          </span>
          <input
            required
            name="location"
            value={formValues.location}
            onChange={handleChange}
            placeholder={locationPlaceholder}
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Deskripsi
          </span>
          <textarea
            required
            rows={4}
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Jelaskan ciri-ciri, warna, merek, atau kondisi barang."
            className="w-full resize-none rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            {contactLabel}
          </span>
          <input
            required
            name="contactName"
            value={formValues.contactName}
            onChange={handleChange}
            placeholder="Nama kontak"
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Nomor WhatsApp
          </span>
          <input
            required
            name="contactWhatsApp"
            value={formValues.contactWhatsApp}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>
      </div>

      <div className="pt-4">
        {submitError && (
          <p className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-4 text-sm font-semibold text-white transition-all hover:bg-brand-900 focus:ring-4 focus:ring-brand-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          {isSubmitting ? "Mengirim laporan..." : submitLabel}
        </button>
        <p className="mt-4 text-center text-xs text-brand-500">
          Pastikan informasi sudah benar sebelum laporan diposting.
        </p>
      </div>
    </form>
  );
}

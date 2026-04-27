// src/components/forms/FormPostItem.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { ItemCategory } from "../../types";

export type FormPostItemValues = {
  title: string;
  description: string;
  location: string;
  contactName: string;
  contactWhatsApp: string;
  imageFile?: File;
};

type FormPostItemProps = {
  category: ItemCategory;
  submitLabel?: string;
  onSubmit: (values: FormPostItemValues) => void;
};

const initialValues: Omit<FormPostItemValues, "imageFile"> = {
  title: "",
  description: "",
  location: "",
  contactName: "",
  contactWhatsApp: "",
};

export function FormPostItem({
  category,
  submitLabel = "Submit Report",
  onSubmit,
}: FormPostItemProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const contactLabel =
    category === "found" ? "Ditemukan oleh / Penghubung" : "Nama Penghubung";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ ...formValues, imageFile });
    setFormValues(initialValues);
    setImageFile(undefined);
    setImagePreview(null);
  };

  return (
    <form
      className="w-full space-y-8 rounded-[2rem] border border-brand-100 bg-white p-6 sm:p-10 shadow-soft"
      onSubmit={handleSubmit}
    >
      {/* Upload Foto */}
      <div className="space-y-3">
        <span className="text-sm font-bold tracking-wide text-brand-900">
          Visual Documentation
        </span>
        <div className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-300 bg-canvas py-14 transition-colors hover:bg-brand-100/50 overflow-hidden">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-40 w-full object-cover rounded-xl"
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
              <span className="font-semibold text-brand-900">Upload Photo</span>
              <span className="mt-1 text-xs text-brand-500">
                Drag and drop or click to browse (JPEG / PNG)
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
            Item Name
          </span>
          <input
            required
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="e.g. Silver AirPods Case"
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Location
          </span>
          <input
            required
            name="location"
            value={formValues.location}
            onChange={handleChange}
            placeholder="e.g. Science Library, 3rd Floor"
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3.5 text-sm text-brand-900 outline-none transition-all placeholder:text-brand-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-bold tracking-wide text-brand-900">
            Description
          </span>
          <textarea
            required
            rows={4}
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Provide any distinguishing features, markings, or conditions..."
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
            WhatsApp
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
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-4 text-sm font-semibold text-white transition-all hover:bg-brand-900 focus:ring-4 focus:ring-brand-100 active:scale-[0.98]"
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
          {submitLabel}
        </button>
        <p className="mt-4 text-center text-xs text-brand-500">
          By submitting, you agree to our University Guidelines for community
          reporting.
        </p>
      </div>
    </form>
  );
}

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import type { ItemCategory } from '../../types';

export type FormPostItemValues = {
  title: string;
  description: string;
  location: string;
  contactName: string;
  contactWhatsApp: string;
};

type FormPostItemProps = {
  category: ItemCategory;
  submitLabel?: string;
  onSubmit: (values: FormPostItemValues) => void;
};

const initialValues: FormPostItemValues = {
  title: '',
  description: '',
  location: '',
  contactName: '',
  contactWhatsApp: '',
};

export function FormPostItem({
  category,
  submitLabel = 'Simpan Postingan',
  onSubmit,
}: FormPostItemProps) {
  const [formValues, setFormValues] = useState<FormPostItemValues>(initialValues);

  const contactLabel =
    category === 'found'
      ? 'Ditemukan oleh / penghubung'
      : 'Nama penghubung';

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialValues);
  };

  return (
    <form
      className="space-y-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-soft"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-brand-900">
            Nama Barang
          </span>
          <input
            required
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Contoh: Dompet kulit hitam"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            Lokasi
          </span>
          <input
            required
            name="location"
            value={formValues.location}
            onChange={handleChange}
            placeholder="Contoh: Lobby Auditorium"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            {contactLabel}
          </span>
          <input
            required
            name="contactName"
            value={formValues.contactName}
            onChange={handleChange}
            placeholder="Nama yang bisa dihubungi"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            WhatsApp
          </span>
          <input
            required
            name="contactWhatsApp"
            value={formValues.contactWhatsApp}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-brand-900">
            Upload Foto
          </span>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm text-brand-700 file:mr-4 file:rounded-full file:border-0 file:bg-brand-900 file:px-4 file:py-2 file:text-white"
          />
          <p className="text-xs text-brand-500">
            Placeholder upload saja. Integrasi penyimpanan file bisa ditambahkan
            di tahap berikutnya.
          </p>
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-brand-900">
            Deskripsi
          </span>
          <textarea
            required
            rows={5}
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Tambahkan detail barang, ciri khusus, dan konteks singkat."
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-500"
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-brand-500">
          Tanggal posting akan dibuat otomatis saat submit.
        </p>
        <button
          type="submit"
          className="rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

const tabs = [
  {
    label: "Post Hilang",
    to: ROUTES.postLostItem,
  },
  {
    label: "Post Ditemukan",
    to: ROUTES.postFoundItem,
  },
];

export function PostTypeTabs() {
  return (
    <nav className="grid gap-3 rounded-[1.35rem] border border-brand-100 bg-white p-2 shadow-[0_18px_38px_rgba(49,60,69,0.12)] sm:grid-cols-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            [
              "rounded-[1rem] px-5 py-3 text-center text-sm font-bold transition-all",
              isActive
                ? "bg-brand-900 text-white shadow-[0_16px_30px_rgba(49,60,69,0.34)] ring-4 ring-brand-300/[0.35]"
                : "border border-brand-100 bg-canvas text-brand-700 hover:-translate-y-0.5 hover:bg-white hover:text-brand-900 hover:shadow-soft",
            ].join(" ")
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}

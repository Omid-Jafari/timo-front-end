import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "fa", "tr"] as const;
export type Locale = (typeof locales)[number];

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales }
);

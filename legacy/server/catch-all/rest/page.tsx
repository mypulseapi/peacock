import { notFound } from "next/navigation";

// Catch-all route to handle 404s within the locale
// This ensures the locale-specific not-found.tsx is used
export default function CatchAllPage() {
  notFound();
}

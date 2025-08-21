// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Only handle the homepage with ?panel=...
  if (url.pathname === "/" && url.searchParams.has("panel")) {
    const panel = url.searchParams.get("panel")?.toLowerCase();

    const map: Record<string, string> = {
      projects: "/projects",
      about: "/about",
      contact: "/contact",
    };

    const dest = map[panel ?? ""];
    if (dest) {
      // Build the target URL and carry through any *other* query params
      const newUrl = new URL(dest, url);
      url.searchParams.forEach((value, key) => {
        if (key !== "panel") newUrl.searchParams.set(key, value);
      });

      // Permanent redirect for SEO and caching
      return NextResponse.redirect(newUrl, 308);
    }
  }

  return NextResponse.next();
}

// Limit to the homepage
export const config = {
  matcher: ["/"],
};

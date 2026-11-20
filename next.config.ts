import type { NextConfig } from "next";

function publicBasePath(): string {
  const raw = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
  if (!raw || raw === "/") return "";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

const prefix = publicBasePath();

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
  ...(prefix ? { basePath: prefix, assetPrefix: prefix } : {}),
};

export default nextConfig;

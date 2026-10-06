import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "alesson-imports";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: `/${repositoryName}`,
        assetPrefix: `/${repositoryName}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;

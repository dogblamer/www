import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import CompressionPlugin from "vite-plugin-compression";
import sitemap from "@astrojs/sitemap";
import svgr from "vite-plugin-svgr";
import tailwind from "@astrojs/tailwind";

export const siteUrl = "https://blamer.dog";

const date = new Date().toISOString();
export default defineConfig({
    site: siteUrl + "/",

        integrations: [
        tailwind(),
        react(),
        svgr(),
        sitemap({
            serialize(item) {
                // Default values for pages
                item.priority = siteUrl + "/" === item.url ? 1.0 : 0.9;
                item.changefreq = "weekly";
                item.lastmod = date;
                return item;
            },
        }),
    ],
    renderers: ["@astrojs/renderer-react"],
    prerender: true,
    vite: {
        plugins: [CompressionPlugin(), svgr()],
    },
    buildOptions: {
        minify: true,
    },
});

import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Generated output, reformatted only to be undone by the next regen. Read by every formatter
  // entry point, including the `staged` task above.
  fmt: {
    ignorePatterns: [
      "**/bindings/**",
      "**/routeTree.gen.ts",
      "crates/yaak-templates/pkg/**",
      "crates/yaak-wasm/pkg/**",
    ],
  },
  lint: {
    ignorePatterns: [
      "npm/**",
      "crates/yaak-templates/pkg/**",
      "crates/yaak-wasm/pkg/**",
      "**/bindings/gen_*.ts",
    ],
    options: {
      typeAware: true,
    },
    rules: {
      "typescript/no-explicit-any": "error",
    },
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-0-0-rc-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    // Nested git worktrees live under .claude, and their tests are not this checkout's
    exclude: ["**/node_modules/**", "**/flatpak/**", "**/.claude/**"],
  },
});

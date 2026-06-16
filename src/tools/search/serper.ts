import {
  createSearchExtractEngine,
  createAiSdkSearchTool,
  searchQueryInputSchema,
} from "@deep-search/search-extract";

export const serperSearchInputSchema = searchQueryInputSchema;

export function createSerperSearchTool(apiKey: string, fetchFn: typeof globalThis.fetch) {
  const engine = createSearchExtractEngine({
    fetch: fetchFn,
    searchProviders: {
      serper: { apiKey },
    },
  });
  return createAiSdkSearchTool(engine, "serper", "Search the web with Serper (Google Search API)");
}

import { createSearchExtractEngine, createAiSdkSearchTool, searchQueryInputSchema, } from "@deep-search/search-extract";
export const braveSearchInputSchema = searchQueryInputSchema;
export function createBraveSearchTool(apiKey, fetchFn) {
    const engine = createSearchExtractEngine({
        fetch: fetchFn,
        searchProviders: {
            brave: { apiKey },
        },
    });
    return createAiSdkSearchTool(engine, "brave", "Search the web with Brave Search");
}
//# sourceMappingURL=brave.js.map
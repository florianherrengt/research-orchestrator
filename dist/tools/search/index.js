import { createBraveSearchTool } from "./brave";
import { createExaSearchTool } from "./exa";
import { createSerperSearchTool } from "./serper";
import { createTavilySearchTool } from "./tavily";
import { createSearXNGSearchTool } from "./searxng";
import { isValidServiceUrl } from "../../utils/url-validation";
export function createSearchTools(searchKeys, fetchFn) {
    const tools = {};
    if (searchKeys?.braveApiKey) {
        tools.brave_search = createBraveSearchTool(searchKeys.braveApiKey, fetchFn);
    }
    if (searchKeys?.exaApiKey) {
        tools.exa_search = createExaSearchTool(searchKeys.exaApiKey, fetchFn);
    }
    if (searchKeys?.serperApiKey) {
        tools.serper_search = createSerperSearchTool(searchKeys.serperApiKey, fetchFn);
    }
    if (searchKeys?.tavilyApiKey) {
        tools.tavily_search = createTavilySearchTool(searchKeys.tavilyApiKey, fetchFn);
    }
    if (searchKeys?.searxngBaseUrl && isValidServiceUrl(searchKeys.searxngBaseUrl)) {
        tools.searxng_search = createSearXNGSearchTool(searchKeys.searxngBaseUrl, fetchFn);
    }
    return tools;
}
//# sourceMappingURL=index.js.map
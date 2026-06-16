# research-orchestrator

Reusable deep research agent orchestrator — agentic search loop with guardrails, extracted from [Deep Search](https://github.com/florianherrengt/deep-search-app).

## What it does

Runs an AI agent that performs multi-step deep research:
1. **Clarify** — asks questions to narrow scope
2. **Plan** — generates a structured research plan
3. **Search** — searches across enabled providers (Brave, Exa, Serper, Tavily, SearXNG)
4. **Extract** — reads and extracts page content
5. **Checkpoint** — reviews research quality before answering
6. **Fact-check** — verifies claims against cited sources
7. **Answer** — synthesizes a cited answer

Built on the [Vercel AI SDK](https://sdk.vercel.ai/docs) with guardrails that enforce this workflow.

## Install

```bash
npm install research-orchestrator
```

You also need an AI SDK provider package:

```bash
npm install @ai-sdk/anthropic ai
```

## Quick start

```typescript
import { streamResearch } from "research-orchestrator";
import { createAnthropic } from "@ai-sdk/anthropic";

const model = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })(
  "claude-sonnet-4-5"
);

const stream = streamResearch({
  model,
  messages: [{ role: "user", content: "Compare React vs Vue performance in 2026" }],
  searchKeys: {
    braveApiKey: process.env.BRAVE_API_KEY,
    tavilyApiKey: process.env.TAVILY_API_KEY,
  },
  // Optional: defaults to globalThis.fetch
  // fetch: customFetch,
  // Optional: pluggable page loader for JS-rendered pages
  // pageLoader: myPlaywrightLoader,
});

// Read the stream
for await (const chunk of stream) {
  // Handle UIMessageChunk parts (text, tool calls, sources, etc.)
}
```

## API

### `streamResearch(options)`

High-level function that runs the full research loop and returns a `ReadableStream<UIMessageChunk>`.

**Options:**
| Option | Type | Description |
|--------|------|-------------|
| `model` | `LanguageModel` | AI SDK language model |
| `messages` | `UIMessage[]` | Conversation messages |
| `searchKeys` | `SearchKeys` | API keys for search providers |
| `fetch` | `FetchFn` | Injectable fetch (default: `globalThis.fetch`) |
| `pageLoader` | `PageLoader` | Pluggable page loader for extraction |
| `systemPrompt` | `string` | Custom system prompt |
| `onEvent` | `(event) => void` | Progress callback |
| `isHiddenText` | `HiddenTextPredicate` | Filter for hidden text parts |
| `tools` | `ToolSet` | Pre-built tools (skips internal tool creation) |
| `extraTools` | `ToolSet` | Additional tools merged with base |
| `evaluateStep` | `EvaluateStepFn` | Custom guard evaluation |
| `maxGuardRetries` | `Record<string, number>` | Per-guard retry limits |

### Low-level exports

The package also exports building blocks for apps that need to extend the orchestrator:

- `createGuardedStream` — the core agent loop
- `createResearchTools` — tool factory
- `evaluateAssistantStep` — guardrail evaluation
- `applyToolCallRequirementSafeguards` — tool prerequisite enforcement
- Individual tool factories (`createBraveSearchTool`, `createExtractPageContentTool`, etc.)
- `DEFAULT_SYSTEM_PROMPT`, `RESEARCH_PLANNER_PROMPT`

## How guardrails work

The orchestrator enforces the research workflow through three layers:

1. **Tool-call requirements** — hard gates: `create_research_plan` requires `ask_questions` first; `extract_page_content` requires a search first
2. **Post-response guards** — after each model response, checks if the agent:
   - Asked for input in plain text instead of using the question tool
   - Answered a research question without doing enough research
   - Skipped the research checkpoint
3. **Retry loop** — when a guard fires, the agent is prompted to retry with specific instructions

## License

MIT

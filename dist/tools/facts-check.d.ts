import { type LanguageModel } from "ai";
import { z } from "zod";
export declare const factsCheckInputSchema: z.ZodObject<{
    originalPrompt: z.ZodString;
    finalResearch: z.ZodString;
}, z.core.$strip>;
export declare function createFactsCheckTool(model: LanguageModel): import("ai").Tool<{
    originalPrompt: string;
    finalResearch: string;
}, string>;
//# sourceMappingURL=facts-check.d.ts.map
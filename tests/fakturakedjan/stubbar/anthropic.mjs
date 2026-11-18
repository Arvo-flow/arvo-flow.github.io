// Stubbe för @anthropic-ai/sdk. Svaren kommer ur fallet (globalThis.__FALL):
//   extract_invoice → __FALL.extraktion, categorize → __FALL.kategorisering, recommend → __FALL.modellen.
// Textsvaren: platsoraklet (max_tokens 10) får fallets antal, sanitetsvakten (5) svarar YES och
// kategorivalidatorn (20) svarar fallets kategori. Varje anrop bokförs i __AI.
const anv = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
class APIError extends Error {}
class RateLimitError extends APIError {}
export default class Anthropic {
  static APIError = APIError;
  static RateLimitError = RateLimitError;
  constructor() {
    this.messages = {
      create: async (p) => {
        const fall = globalThis.__FALL ?? {};
        const verktyg = p?.tool_choice?.name ?? null;
        (globalThis.__AI ??= []).push({ verktyg, max_tokens: p?.max_tokens ?? null });
        // Rekommendationens prompt bokförs, så att instrumentet kan läsa vad modellen beordras skriva (FV-A16).
        if (verktyg === 'recommend') {
          globalThis.__PROMPT = (p?.messages ?? []).map((m) => (typeof m.content === 'string' ? m.content
            : (m.content ?? []).map((c) => c?.text ?? '').join('\n'))).join('\n');
        }
        const svar = { extract_invoice: fall.extraktion, categorize: fall.kategorisering, recommend: fall.modellen };
        if (verktyg) {
          if (!(verktyg in svar)) throw new Error(`stubben känner inte verktyget ${verktyg}`);
          return { content: [{ type: 'tool_use', name: verktyg, input: structuredClone(svar[verktyg]) }], usage: anv, stop_reason: 'tool_use' };
        }
        const text = p?.max_tokens === 10 ? String(fall.oraklet ?? '')
          : p?.max_tokens === 5 ? 'YES'
            : p?.max_tokens === 20 ? String(fall.kategorisering?.category ?? '')
              : '';
        return { content: [{ type: 'text', text }], usage: anv, stop_reason: 'end_turn' };
      },
    };
  }
}
export { Anthropic, APIError, RateLimitError };

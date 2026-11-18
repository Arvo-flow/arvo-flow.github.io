// tests/fakturakedjan/laddare.mjs — byter de fyra nätverkspaketen mot stubbar. Inget annat byts:
// handlern, pipelinen, lagringen och rummet är produktionens egna moduler.
const STUBBAR = {
  '@anthropic-ai/sdk': './stubbar/anthropic.mjs',
  '@vercel/kv': './stubbar/kv.mjs',
  '@neondatabase/serverless': './stubbar/neon.mjs',
  resend: './stubbar/resend.mjs',
};
export async function resolve(specifier, context, nextResolve) {
  if (Object.hasOwn(STUBBAR, specifier)) {
    return { url: new URL(STUBBAR[specifier], import.meta.url).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

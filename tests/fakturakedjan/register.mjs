// tests/fakturakedjan/register.mjs — laddarkroken för instrument A (FV, tests/fakturakedjan.mjs).
// Körs bara i barnprocessen som testet startar (`node --import ./register.mjs kor.mjs`), så att
// stubbarna aldrig läcker in i resten av sviten.
import { register } from 'node:module';
register('./laddare.mjs', import.meta.url);

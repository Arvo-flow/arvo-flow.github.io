// Stubbe för resend: inga mejl lämnar processen. Varje utskick bokförs i __MEJL.
export class Resend {
  constructor() {
    this.emails = { send: async (m) => { (globalThis.__MEJL ??= []).push(m); return { data: { id: 'stub' }, error: null }; } };
  }
}
export default Resend;

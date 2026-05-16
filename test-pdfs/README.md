# test-pdfs/

Lägg dina testfakturor här innan du kör stress-testet.

## Namnkonvention

| Filnamn                  | Faktura-typ                        |
|--------------------------|------------------------------------|
| ricoh.pdf                | Skrivarleasing / Managed Print     |
| telia.pdf                | Mobilabonnemang                    |
| microsoft.pdf            | Microsoft 365 (per-seat licenser)  |
| unclear.pdf              | Otydlig faktura (→ review_queue)   |
| outofscope.pdf           | Redovisning/juridik (→ unsupported)|
| *.pdf                    | Valfria extra fakturor             |

## Kör testet

```bash
node scripts/stress-test.mjs
```

Eller med ett enskilt filter:

```bash
node scripts/stress-test.mjs ricoh.pdf
```

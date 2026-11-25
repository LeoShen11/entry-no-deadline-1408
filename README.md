# One Line, No Deadline Met

A one-line joke giving an excuse for missing a deadline, written by `main.ts`
(Node 22) to `/output/entry.txt`.

## The line

> I missed the deadline because my to-do list filed a complaint about unrealistic expectations and went on strike.

112 characters, one line, one sentence.

## How it works

`main.ts` holds the line, validates it before writing anything:

- 1–200 characters (Unicode code points)
- a single line — no newlines, no leading/trailing whitespace, no double spaces
- at least 5 words, mentions the deadline, ends with terminal punctuation

It then writes the line to `/output/entry.txt`, reads the file back, and exits 0
only when the read-back text, character count, and word count match the line
exactly.

## Run

```sh
node --experimental-strip-types main.ts
```

## make.fun

Built for the make.fun bounty "One Line, No Deadline Met"
(`u-markk-st-one-line-no-deadline-met-6adc00ce`). Referral code: `6nk0p130`
— join at https://make.fun/r/6nk0p130

## License

MIT — see `LICENSE`.

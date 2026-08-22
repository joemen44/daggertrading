TRADING PSYCHOLOGY DROPDOWN — ROOT FIX

Replace learn-trading-psychology.html only.

Root cause found:
- Home had one dropdown script.
- Trading Psychology had TWO dropdown scripts.
- An older leftover Trader Tools/More handler conflicted with the shared navigation script.

Fix:
- Removed every old nav dropdown handler from this page.
- Copied the exact Home header.
- Copied the exact single Home dropdown script.
- Page now has only one dropdown handler for Learn, Trader Tools, and More.

No Trading Psychology content was changed.

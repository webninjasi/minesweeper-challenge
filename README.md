# minesweeper-challenge

## Solver

1. Script uses hard coded W & H (width & height) values, so change them first if you want to solve for a different size.
2. `python solver.py`
3. Solver prints details whenever a solution is found
4. Also prints some stats if it ever completes its execution -_-

## Validator/Visualiser

1. Visit https://webninjasi.github.io/minesweeper-challenge/
2. Set the field width on first input box if you need to
3. Copy & paste mines array to the second input box (it's `0, 0, 1, 2, 0, 3, 1, 3, 0, 0, 0, 0, 0, 3, 2, 3, 0, 3, 0, 2, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 2, 3, 0, 1, 0, 3, 3, 3, 1, 3, 0, 0` for the output below)
```
numIndex: [0, 1, 9, 10, 50, 59, 20, 40, 8, 30, 52, 58, 12, 4, 18, 22, 42, 28, 32, 46, 38, 36, 16, 24, 44]
nums: [0, 1, 5, 6, 13, 6, 12, 4, 8, 2, 3, 4, 12, 8, 17, 12, 22, 10, 14, 3, 6, 3, 15, 11, 23, 14, 18, 9, 17, 5, 9, 6, 18, 9, 18, 12, 21, 11, 20, 8, 7, 4, 16, 12, 24, 13, 19, 9, 15, 5, 4, 3, 10, 6, 12, 7, 12, 6, 11, 5]
mines: [0, 0, 1, 2, 0, 3, 1, 3, 0, 0, 0, 0, 0, 3, 2, 3, 0, 3, 0, 2, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 3, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 2, 3, 0, 1, 0, 3, 3, 3, 1, 3, 0, 0]
objective value: 90.0
best objective bound: 43.0
```

## Notes

- This is my first attempt to use CP-SAT and I'm sure the script can be improved.
- Solver is not deterministic while working in parallel (which is the default) so sometimes it takes a few minutes to reach a good solution while other times it takes forever to reach a solution.

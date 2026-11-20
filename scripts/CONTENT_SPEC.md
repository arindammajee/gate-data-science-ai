# Lesson authoring spec

Write one JSON file per assigned slug at `src/content/lessons/<slug>.json`. Use `json.dump` so escaping is correct. Do not edit any other file. Do not modify `bayes-theorem.json`. Do not git commit.

The quality bar is `src/content/lessons/bayes-theorem.json`. Read it. Read `src/lib/cheatsheets.ts` and do not contradict it. If a cheat-sheet identity and your memory disagree, follow the cheat sheet.

## Schema

```json
{
  "slug": "exact-slug",
  "section": "probability | linear-algebra | calculus | programming | databases | machine-learning | artificial-intelligence | aptitude",
  "title": "Human title",
  "syllabus": "The official phrase this lesson covers",
  "minutes": 25,
  "summary": "One or two sentences, at least 60 characters, no formula required.",
  "keywords": ["three", "or", "more"],
  "intuition": "Markdown. At least 500 characters. Two to four short paragraphs. Use $inline$ and $$display$$ math.",
  "definitions": [{"term": "Name", "body": "Markdown with $math$."}],
  "formulas": [{"name": "Name", "latex": "P(A\\mid B)", "note": "Markdown. Use $...$ if the note has math."}],
  "properties": ["Markdown bullets, at least 4."],
  "examples": [{
    "title": "Name",
    "prompt": "Markdown problem statement.",
    "steps": ["At least three steps, each a full sentence with the arithmetic."],
    "answer": "Markdown. State the value."
  }],
  "traps": ["At least 3. Each is a specific mistake, not a vague warning."],
  "python": "Stdlib only. Or null. Required for programming and machine-learning. Must run with python3 and exit 0.",
  "questions": []
}
```

`formulas[].latex` is raw LaTeX with no surrounding `$`. In the JSON file a command is `\\frac`.

Need at least 3 definitions, 2 formulas, 4 properties, 2 examples (each with at least 3 steps), 3 traps, and exactly 5 questions is the target (at least 5). Among the questions: at least 2 MCQ, at least 1 MSQ, at least 1 NAT.

Question object:

```json
{
  "id": "q1",
  "type": "mcq",
  "marks": 1,
  "stem": "Markdown, at least 20 characters.",
  "options": ["four strings", "no letter prefix", "math allowed", "plausible distractors"],
  "answer": ["A"],
  "tolerance": 0,
  "solution": "Markdown, at least 80 characters. First sentence states the answer, then the working."
}
```

- MCQ: exactly one of A–D. `marks` 1 or 2.
- MSQ: at least two of A–D. Say "which of the following are true" in the stem. No partial credit.
- NAT: `options` may be `[]`. `answer` is a list with one numeric string, preferably an integer. If it is not an integer, set `tolerance` and say the rounding rule in the stem. Prefer questions whose answer is an integer (a count, a numerator, `n` times a probability, a degree of freedom).
- Every numerical answer must be computed by Python before it is written down. Assert the value in the generator, or show the arithmetic in the solution in a way you have checked.
- Original questions only. Do not copy GATE papers or coaching material. New numbers, new settings.
- No "lorem", "TODO", "placeholder".
- Dollar signs only for math. Do not write currency with `$`.

## Facts you must not get wrong

- Sample variance divides by `n-1`. Population variance divides by `n`. Say which one you are using.
- Independence is `P(A∩B)=P(A)P(B)`. Mutual exclusion is `P(A∩B)=0`. Nonzero events cannot be both.
- `P(A|B)` is not `P(B|A)`. A false-positive rate is not one minus the true-positive rate.
- Poisson is discrete. Mean = variance = λ. It is not a continuous density.
- Exponential in this site uses the rate λ: mean `1/λ`, variance `1/λ^2`, CDF `1-e^{-λx}`, memoryless. Mention the scale convention only as a trap.
- Correlation 0 does not imply independence. `|ρ| ≤ 1`.
- Continuous: `P(X=x)=0`.
- t has heavier tails than N(0,1). Variance `ν/(ν-2)` for `ν>2`. `(n-1)s^2/σ^2 ~ χ^2_{n-1}` for i.i.d. normal data.
- z-test uses known σ. t-test uses s and df `n-1`. Chi-squared tests are for counts. Goodness-of-fit df is `k-1` minus estimated parameters. Independence df is `(r-1)(c-1)`.
- A 95% CI is a procedure with 95% coverage. A realised interval is not assigned a posterior probability. A p-value is computed under the null.
- Use `z_{0.025}=1.96`, `z_{0.05}=1.645`, `z_{0.005}=2.576` when you need a normal critical value. Otherwise give the critical value in the question. Do not invent a t critical value.
- Rank-nullity: `rank + nullity = number of columns`.
- Idempotent means `A^2=A`. Eigenvalues 0 or 1, trace = rank. Symmetry is not included.
- An orthogonal projection matrix is symmetric and idempotent: `P=A(AᵀA)^{-1}Aᵀ` when A has full column rank.
- Orthogonal matrix: `QᵀQ=I`, inverse is the transpose, preserves lengths.
- Quadratic form depends only on the symmetric part. Positive definite iff those eigenvalues are positive.
- SVD exists for every real matrix, rectangular included. Eigenvalues need a square matrix.
- LU writes `A=LU` with L unit lower triangular. Row swaps give `PA=LU`.
- Calculus on this syllabus is one variable. Do not teach Lagrange multipliers as if they were on the syllabus.
- Differentiable implies continuous. `|x|` at 0 is the counterexample to the converse. `f''(c)=0` makes the second-derivative test silent.
- Selection sort is not stable. Bubble and insertion are stable. Mergesort is stable and always `Θ(n log n)`, with extra linear memory. Quicksort is not stable; worst case `Θ(n^2)`; average `Θ(n log n)`.
- Binary search needs sorted random-access data. Dijkstra needs nonnegative weights. Unweighted shortest paths are BFS.
- Hash tables are average `O(1)`, worst `O(n)`.
- Database normal forms are not feature scaling. 3NF: for every nontrivial `X→A`, X is a superkey or A is prime. BCNF: X is a superkey. BCNF implies 3NF.
- Star schema: denormalised dimensions. Snowflake: normalised dimensions. Multiple-linkage in the syllabus means complete linkage (maximum pairwise distance).
- Ridge shrinks coefficients and does not set them to zero. Do not penalise the intercept. It is not the lasso.
- LDA shares one covariance across classes, so the boundary is linear. PCA does not use labels and maximises variance.
- LOO residual for a linear fit is `(y_i - ŷ_i)/(1-h_ii)`. LOOCV is k-fold with k=n. It has low bias and a high-variance estimate of the test error.
- A feed-forward stack of linear maps is one linear map. XOR is not linearly separable.
- k-means minimises within-cluster sum of squares and can stop at a local minimum. k-medoids uses an actual data point.
- A* with `f=g+h` is optimal on trees when h is admissible (`h ≤ h*`), and on graphs when h is consistent. Greedy best-first is not optimal. Alpha-beta does not change the minimax value.
- Chain and fork: ends are independent given the middle. Collider: ends are marginally independent and dependent given the middle.
- Likelihood weighting clamps evidence and weights by the product of the clamped conditional probabilities. Rejection sampling throws the sample away.

## Python

Stdlib only. No numpy, no input, no network. The snippet should print the key number from a worked example and assert it. Keep it under about 40 lines.

## After writing

Run:

```bash
python3 scripts/validate_content.py <each slug you wrote>
```

Fix every reported error. Then stop.

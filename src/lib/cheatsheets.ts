export type SheetRow = { name: string; latex: string; note?: string };

export type SheetBlock = {
  heading: string;
  intro?: string;
  rows?: SheetRow[];
  bullets?: string[];
};

const R = String.raw;

export const cheatsheets: Record<string, SheetBlock[]> = {
  probability: [
    {
      heading: "Counting and axioms",
      rows: [
        { name: "Permutations", latex: R`{}^nP_r=\frac{n!}{(n-r)!}`, note: "Order matters, no repetition." },
        { name: "Combinations", latex: R`\binom{n}{r}=\frac{n!}{r!(n-r)!}`, note: "Order does not matter." },
        { name: "With repetition", latex: R`\binom{n+r-1}{r}`, note: "Combinations from n types, r draws, replacement of types." },
        { name: "Complement and union", latex: R`P(A^c)=1-P(A),\quad P(A\cup B)=P(A)+P(B)-P(A\cap B)` },
        { name: "Independence", latex: R`P(A\cap B)=P(A)P(B)`, note: "Not the same as P(A\cap B)=0." },
      ],
    },
    {
      heading: "Conditioning and Bayes",
      rows: [
        { name: "Conditional probability", latex: R`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`, note: "Requires P(B)>0." },
        { name: "Marginal from a partition", latex: R`P(B)=\sum_i P(B\mid A_i)P(A_i)` },
        { name: "Bayes", latex: R`P(A_i\mid B)=\frac{P(B\mid A_i)P(A_i)}{\sum_j P(B\mid A_j)P(A_j)}` },
        { name: "Odds form", latex: R`\frac{P(H\mid E)}{P(H^c\mid E)}=\frac{P(E\mid H)}{P(E\mid H^c)}\cdot\frac{P(H)}{P(H^c)}` },
        { name: "Tower property", latex: R`\mathbb{E}[X]=\mathbb{E}[\mathbb{E}[X\mid Y]]` },
        { name: "Law of total variance", latex: R`\mathrm{Var}(X)=\mathbb{E}[\mathrm{Var}(X\mid Y)]+\mathrm{Var}(\mathbb{E}[X\mid Y])` },
      ],
    },
    {
      heading: "Summaries",
      rows: [
        { name: "Sample mean", latex: R`\bar x=\frac1n\sum_{i=1}^n x_i` },
        { name: "Sample variance", latex: R`s^2=\frac{1}{n-1}\sum_{i=1}^n (x_i-\bar x)^2`, note: "Population variance divides by n." },
        { name: "Covariance", latex: R`\mathrm{Cov}(X,Y)=\mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y]` },
        { name: "Correlation", latex: R`\rho=\frac{\mathrm{Cov}(X,Y)}{\sigma_X\sigma_Y}\in[-1,1]`, note: "Zero correlation does not imply independence." },
        { name: "Linear combination", latex: R`\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\,\mathrm{Cov}(X,Y)` },
      ],
    },
    {
      heading: "Named distributions",
      rows: [
        { name: "Bernoulli(p)", latex: R`\mathbb{E}[X]=p,\ \mathrm{Var}(X)=p(1-p)` },
        { name: "Binomial(n,p)", latex: R`\binom{n}{k}p^k(1-p)^{n-k},\quad \mathbb{E}=np,\ \mathrm{Var}=np(1-p)` },
        { name: "Poisson(λ)", latex: R`e^{-\lambda}\lambda^k/k!,\quad \mathbb{E}=\mathrm{Var}=\lambda`, note: "Discrete, support {0,1,2,…}." },
        { name: "Discrete uniform {1,…,n}", latex: R`\mathbb{E}=(n+1)/2,\quad \mathrm{Var}=(n^2-1)/12` },
        { name: "Continuous uniform [a,b]", latex: R`f=1/(b-a),\ \mathbb{E}=(a+b)/2,\ \mathrm{Var}=(b-a)^2/12` },
        { name: "Exponential rate λ", latex: R`f(x)=\lambda e^{-\lambda x},\ \mathbb{E}=1/\lambda,\ \mathrm{Var}=1/\lambda^2,\ F=1-e^{-\lambda x}`, note: "Memoryless. Scale θ=1/λ is the other convention." },
        { name: "Normal", latex: R`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\Big(-\frac{(x-\mu)^2}{2\sigma^2}\Big)` },
        { name: "Standard normal", latex: R`Z=(X-\mu)/\sigma,\quad \Phi(-z)=1-\Phi(z)` },
        { name: "Student t, df ν", latex: R`T=\frac{Z}{\sqrt{V/\nu}},\ V\sim\chi^2_\nu,\ \mathrm{Var}(T)=\frac{\nu}{\nu-2}\ (\nu>2)` },
        { name: "Chi-squared, df k", latex: R`\mathbb{E}=k,\ \mathrm{Var}=2k,\quad \frac{(n-1)s^2}{\sigma^2}\sim\chi^2_{n-1}`, note: "The last display needs i.i.d. normal data." },
      ],
    },
    {
      heading: "CDF, CLT, intervals, tests",
      rows: [
        { name: "CDF and density", latex: R`F(x)=P(X\le x),\quad f=F'\ \text{when }X\text{ is continuous}` },
        { name: "Conditional density", latex: R`f_{X\mid Y}(x\mid y)=\frac{f_{X,Y}(x,y)}{f_Y(y)}` },
        { name: "CLT", latex: R`\sqrt{n}\,(\bar X-\mu)/\sigma \xrightarrow{d} N(0,1)` },
        { name: "CI, σ known", latex: R`\bar x\pm z_{\alpha/2}\,\sigma/\sqrt{n}`, note: "z_{0.025}=1.96, z_{0.05}=1.645, z_{0.005}=2.576." },
        { name: "CI, σ unknown", latex: R`\bar x\pm t_{n-1,\alpha/2}\,s/\sqrt{n}` },
        { name: "z statistic", latex: R`z=\frac{\bar x-\mu_0}{\sigma/\sqrt{n}}` },
        { name: "t statistic", latex: R`t=\frac{\bar x-\mu_0}{s/\sqrt{n}},\quad \mathrm{df}=n-1` },
        { name: "Chi-squared statistic", latex: R`\sum\frac{(O-E)^2}{E}`, note: "Goodness of fit: df = k−1−(parameters estimated). Independence: df=(r−1)(c−1)." },
      ],
      bullets: [
        "A 95% confidence interval is a procedure that covers the true parameter in 95% of repeated samples. The realised interval either covers it or it does not.",
        "A p-value is computed under the null. It is not the probability that the null is true.",
        "P(X=x)=0 for a continuous random variable. Probabilities come from intervals.",
      ],
    },
  ],
  "linear-algebra": [
    {
      heading: "Spaces and rank",
      rows: [
        { name: "Subspace test", latex: R`0\in W,\quad u,v\in W,\ \alpha\in\mathbb{R}\Rightarrow u+v\in W,\ \alpha u\in W` },
        { name: "Dependence", latex: R`\sum_{i=1}^k c_i v_i=0\ \text{for some }c\neq 0` },
        { name: "Rank–nullity", latex: R`\mathrm{rank}(A)+\mathrm{nullity}(A)=n`, note: "A is m×n. Nullity is the dimension of {x: Ax=0}." },
        { name: "Consistency", latex: R`\mathrm{rank}(A)=\mathrm{rank}([A\mid b])`, note: "Unique solution when that common rank equals n." },
      ],
    },
    {
      heading: "Named matrices",
      rows: [
        { name: "Orthogonal projection", latex: R`P=A(A^\top A)^{-1}A^\top`, note: "A has full column rank. $P^2=P=P^\\top$. Eigenvalues are 0 or 1, and trace(P) = rank(P)." },
        { name: "Idempotent", latex: R`A^2=A`, note: "Eigenvalues 0 or 1 and trace(A)=rank(A). Symmetry is extra." },
        { name: "Orthogonal", latex: R`Q^\top Q=I`, note: "Columns are orthonormal, $Q^{-1}=Q^\\top$, $|\\det Q|=1$, and $\\|Qx\\|=\\|x\\|$." },
        { name: "Block triangular", latex: R`\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det(A)\det(D)`, note: "Square diagonal blocks." },
        { name: "Quadratic form", latex: R`x^\top A x=x^\top\frac{A+A^\top}{2}x`, note: "Positive definite iff eigenvalues of the symmetric part are positive." },
      ],
    },
    {
      heading: "Elimination, eigen, SVD",
      rows: [
        { name: "Determinant", latex: R`\det(AB)=\det(A)\det(B),\quad \det(A^\top)=\det(A),\quad \det(A)=\prod_i\lambda_i` },
        { name: "Eigenvalue", latex: R`Av=\lambda v,\ v\neq 0,\quad \det(A-\lambda I)=0` },
        { name: "Real symmetric", latex: R`A=Q\Lambda Q^\top`, note: "Real eigenvalues, orthonormal eigenvectors." },
        { name: "LU", latex: R`A=LU`, note: "L unit lower triangular, U upper. With row swaps, PA=LU." },
        { name: "SVD", latex: R`A=U\Sigma V^\top`, note: "U and V are orthogonal and Σ is rectangular diagonal. $\\sigma_i$ is the square root of an eigenvalue of $A^\\top A$. Rank equals the number of nonzero singular values." },
        { name: "Geometric projection", latex: R`\mathrm{proj}_u v=\frac{u^\top v}{u^\top u}u`, note: "Onto a line. Onto a subspace, solve the normal equations $A^\\top A\\hat x=A^\\top b$." },
      ],
    },
  ],
  calculus: [
    {
      heading: "Limits, continuity, derivatives",
      rows: [
        { name: "Standard limits", latex: R`\lim_{x\to 0}\frac{\sin x}{x}=1,\quad \lim_{x\to 0}\frac{e^x-1}{x}=1,\quad \lim_{x\to 0}\frac{\ln(1+x)}{x}=1` },
        { name: "L'Hôpital", latex: R`\lim\frac{f}{g}=\lim\frac{f'}{g'}`, note: "Only for 0/0 or ∞/∞, and only when the right-hand limit exists." },
        { name: "Continuity", latex: R`\lim_{x\to a}f(x)=f(a)` },
        { name: "Chain, product", latex: R`(f\circ g)'=f'(g)\,g',\quad (fg)'=f'g+fg'` },
        { name: "Implies", latex: R`\text{differentiable}\Rightarrow\text{continuous}`, note: "The converse is false. |x| at 0 is the witness." },
      ],
    },
    {
      heading: "Taylor and extrema",
      rows: [
        { name: "Taylor polynomial", latex: R`P_n(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k` },
        { name: "Lagrange remainder", latex: R`R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}`, note: "For some c strictly between a and x." },
        { name: "Critical point", latex: R`f'(c)=0\ \text{or }f'(c)\text{ does not exist}` },
        { name: "Second-derivative test", latex: R`f''(c)>0\Rightarrow\text{local min},\quad f''(c)<0\Rightarrow\text{local max}`, note: "f''(c)=0 says nothing." },
        { name: "Closed interval", latex: R`\max_{[a,b]}f=\max\{f(a),f(b),f(c_i)\}`, note: "c_i the critical points inside (a,b). Needs continuity on [a,b]." },
      ],
      bullets: [
        "The syllabus is one variable. A partial derivative or a Lagrange multiplier is not a substitute for f'(x)=0.",
      ],
    },
  ],
  programming: [
    {
      heading: "Python costs worth memorising",
      bullets: [
        "List `append` and `pop()` are amortised $O(1)$. `insert(0)` and `pop(0)` are $O(n)$.",
        "Slicing copies. `is` compares identity; `==` compares value. A mutable default argument is shared across calls.",
        "Dict and set lookup are average $O(1)$ and worst-case $O(n)$. Indexing starts at 0.",
      ],
    },
    {
      heading: "Structures",
      rows: [
        { name: "Stack, queue", latex: R`\text{push/pop and enqueue/dequeue are }O(1)`, note: "Stack is LIFO. Queue is FIFO. Use a linked list or a circular buffer, not a list insert at the front." },
        { name: "Linked list", latex: R`\text{insert at head }O(1),\ \text{search }O(n)`, note: "No random access." },
        { name: "BST", latex: R`\text{search, insert, delete }O(h)`, note: "h=⌊log₂ n⌋ when balanced, h=n-1 when a chain." },
        { name: "Hash table", latex: R`\alpha=n/m,\ \text{average }O(1)\text{ if }\alpha\text{ is bounded}` },
        { name: "Handshaking", latex: R`\sum_v\deg(v)=2|E|` },
        { name: "Tree", latex: R`\text{connected and acyclic}\iff |E|=|V|-1\ \text{and connected}` },
      ],
    },
    {
      heading: "Search, sort, paths",
      rows: [
        { name: "Linear search", latex: R`O(n)\ \text{worst},\ O(1)\ \text{best}` },
        { name: "Binary search", latex: R`O(\log n)`, note: "Random access and a sorted array. The interval must shrink, including the equal-key case." },
        { name: "Selection", latex: R`\Theta(n^2),\ \text{in place, not stable}` },
        { name: "Bubble", latex: R`\Theta(n^2)\ \text{worst},\ \Theta(n)\ \text{best with a swap flag, stable}` },
        { name: "Insertion", latex: R`\Theta(n^2)\ \text{worst},\ \Theta(n)\ \text{best, stable, in place}` },
        { name: "Mergesort", latex: R`\Theta(n\log n)\ \text{always, stable, }\Theta(n)\ \text{extra memory}` },
        { name: "Quicksort", latex: R`\Theta(n\log n)\ \text{average},\ \Theta(n^2)\ \text{worst, not stable}` },
        { name: "BFS / DFS", latex: R`\Theta(|V|+|E|)\ \text{on adjacency lists}` },
        { name: "Unweighted distance", latex: R`\text{BFS layers}` },
        { name: "Dijkstra", latex: R`O((|V|+|E|)\log|V|)\ \text{with a binary heap}`, note: "Every edge weight must be nonnegative. Naive array version is O(|V|^2)." },
      ],
    },
  ],
  databases: [
    {
      heading: "Model, algebra, calculus, SQL",
      rows: [
        { name: "Selection, projection", latex: R`\sigma_{\theta}(R),\quad \pi_{A_1,\ldots,A_k}(R)` },
        { name: "Join", latex: R`R\bowtie_{R.A=S.B}S=\sigma_{R.A=S.B}(R\times S)` },
        { name: "Tuple calculus", latex: R`\{t\mid \psi(t)\}`, note: "Safe queries only take values from the active domain." },
        { name: "Keys", latex: R`\text{superkey}\supseteq\text{candidate key}\supseteq\text{primary key}` },
      ],
      bullets: [
        "SQL filters with `WHERE` before grouping and with `HAVING` after. `NULL` fails every comparison, including `NULL = NULL`.",
        "`COUNT(*)` counts rows. `COUNT(col)` skips nulls in that column.",
        "A weak entity's primary key includes the owner's key. A multivalued attribute becomes its own relation.",
      ],
    },
    {
      heading: "Normal forms",
      bullets: [
        "1NF: every attribute value is atomic.",
        "2NF: 1NF, and no non-prime attribute depends on a proper subset of a candidate key.",
        "3NF: for every nontrivial $X\\to A$, $X$ is a superkey or $A$ is prime.",
        "BCNF: for every nontrivial $X\\to A$, $X$ is a superkey. BCNF implies 3NF.",
        "These are not min-max scaling. Feature scaling lives in the preprocessing lesson.",
      ],
    },
    {
      heading: "Files, indexes, warehouse",
      rows: [
        { name: "Min-max scale", latex: R`x'=\frac{x-\min}{\max-\min}` },
        { name: "z-score", latex: R`z=\frac{x-\mu}{\sigma}` },
        { name: "Star", latex: R`\text{fact table}+\text{denormalised dimensions}` },
        { name: "Snowflake", latex: R`\text{dimensions split along a hierarchy}` },
      ],
      bullets: [
        "Heap file: scan. Sorted file: binary search on the sort key. Hash file: equality in expected constant time, no range search.",
        "Dense index: one entry per record. Sparse index: one entry per block. Clustered: the file order matches the index.",
        "Distributive measures (sum, count, min, max) roll up from partial aggregates. Algebraic measures (average) need those pieces stored. Holistic measures (median) do not.",
      ],
    },
  ],
  "machine-learning": [
    {
      heading: "Regression",
      rows: [
        { name: "Simple slope", latex: R`\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^2},\quad \hat\beta_0=\bar y-\hat\beta_1\bar x` },
        { name: "Normal equations", latex: R`\hat\beta=(X^\top X)^{-1}X^\top y`, note: "X has full column rank and includes a column of ones if there is an intercept." },
        { name: "R²", latex: R`R^2=1-\frac{\mathrm{RSS}}{\mathrm{TSS}},\quad \mathrm{TSS}=\sum(y_i-\bar y)^2` },
        { name: "Ridge", latex: R`\hat\beta=(X^\top X+\lambda I)^{-1}X^\top y`, note: "Centre the features. Do not penalise the intercept. Shrinks; does not select." },
        { name: "Hat matrix", latex: R`H=X(X^\top X)^{-1}X^\top,\quad h_{ii}=H_{ii}` },
      ],
    },
    {
      heading: "Classification and trees",
      rows: [
        { name: "Logistic", latex: R`P(y=1\mid x)=\sigma(w^\top x+b),\quad \sigma(z)=\frac{1}{1+e^{-z}}` },
        { name: "Log loss", latex: R`-\sum_i\Big[y_i\log p_i+(1-y_i)\log(1-p_i)\Big]` },
        { name: "Naive Bayes", latex: R`P(y\mid x)\propto P(y)\prod_j P(x_j\mid y)`, note: "Laplace smoothing adds 1 to empty counts." },
        { name: "LDA score", latex: R`\delta_k(x)=x^\top\Sigma^{-1}\mu_k-\tfrac12\mu_k^\top\Sigma^{-1}\mu_k+\log\pi_k`, note: "Shared covariance. The boundary is linear." },
        { name: "Hard-margin SVM", latex: R`\min_{w,b}\ \tfrac12\|w\|^2\quad\text{s.t.}\quad y_i(w^\top x_i+b)\ge 1`, note: "Labels in {-1,+1}. Geometric margin is 2/||w||." },
        { name: "Soft margin", latex: R`\tfrac12\|w\|^2+C\sum_i\xi_i,\quad y_i(w^\top x_i+b)\ge 1-\xi_i,\ \xi_i\ge 0` },
        { name: "Gini, entropy", latex: R`G=1-\sum_k p_k^2,\quad H=-\sum_k p_k\log_2 p_k` },
      ],
    },
    {
      heading: "Validation, networks, clustering, PCA",
      rows: [
        { name: "Squared-error decomposition", latex: R`\mathbb{E}[(y-\hat f)^2]=\mathrm{Bias}^2+\mathrm{Var}+\sigma^2` },
        { name: "LOO residual", latex: R`y_i-\hat y_{(-i)}=\frac{y_i-\hat y_i}{1-h_{ii}}`, note: "Linear smoothers. LOOCV is k-fold with k=n." },
        { name: "Forward layer", latex: R`a^{(l)}=\phi\!\left(W^{(l)}a^{(l-1)}+b^{(l)}\right)` },
        { name: "k-means", latex: R`\sum_{i=1}^n\|x_i-\mu_{c(i)}\|^2`, note: "Assign, then replace each centre by its cluster mean. Local minimum." },
        { name: "Single / multiple linkage", latex: R`d_{\min}(A,B)=\min_{a,b}d(a,b),\quad d_{\max}(A,B)=\max_{a,b}d(a,b)`, note: "The syllabus name multiple-linkage is this maximum." },
        { name: "PCA", latex: R`S v=\lambda v,\quad \text{fraction }\lambda_j\Big/\sum_i\lambda_i`, note: "S is the covariance of centred data. Standardise when units differ. Labels are not used." },
      ],
      bullets: [
        "A stack of linear layers is one linear layer. XOR needs a nonlinearity.",
        "k-medoids picks a data point as the centre, so an outlier does not drag the centre off the data.",
      ],
    },
  ],
  "artificial-intelligence": [
    {
      heading: "Search",
      bullets: [
        "BFS: complete; optimal for unit step costs; time and space $O(b^d)$.",
        "DFS: space $O(bm)$; not optimal; not complete on infinite branches.",
        "Uniform-cost: complete and optimal when every step costs at least $\\varepsilon>0$.",
        "Iterative deepening: complete and optimal for unit costs; space $O(bd)$.",
        "Greedy best-first uses $f=h$ only. Not optimal.",
        "A* uses $f=g+h$. Admissible $h(n)\\le h^*(n)$ makes tree search optimal. Consistent $h(n)\\le c(n,a,n')+h(n')$ makes graph search optimal.",
        "Minimax computes the backed-up value. Alpha-beta prunes when $\\alpha\\ge\\beta$ and does not change that value.",
      ],
    },
    {
      heading: "Logic and networks",
      rows: [
        { name: "Entailment", latex: R`\alpha\models\beta\iff M(\alpha)\subseteq M(\beta)` },
        { name: "Resolution", latex: R`( \ell\vee C),\ (\neg\ell\vee D)\ \vdash\ C\vee D` },
        { name: "Quantifier negation", latex: R`\neg\forall x\,P(x)\equiv\exists x\,\neg P(x),\quad \neg\exists x\,P(x)\equiv\forall x\,\neg P(x)` },
        { name: "Network factorisation", latex: R`P(X_1,\ldots,X_n)=\prod_i P(X_i\mid \mathrm{Pa}_i)` },
        { name: "Conditional independence", latex: R`P(X,Y\mid Z)=P(X\mid Z)P(Y\mid Z)` },
        { name: "Elimination", latex: R`\sum_x\prod_{f\ni x}f`, note: "Multiply the factors that contain x, sum x out, put the new factor back. Order changes cost, not the value." },
      ],
      bullets: [
        "Chain $X\\to Y\\to Z$ and fork $X\\leftarrow Y\\to Z$: the ends are dependent marginally and independent given the middle.",
        "Collider $X\\to Y\\leftarrow Z$: the ends are independent marginally and dependent given the middle (explaining away), when that is the only path.",
        "Prior sampling draws each node given its parents. Rejection sampling discards draws that miss the evidence. Likelihood weighting clamps the evidence and weights the sample by the product of those clamped probabilities.",
      ],
    },
  ],
  aptitude: [
    {
      heading: "Verbal reminders",
      bullets: [
        "A/an is for a countable singular the listener does not yet know. The is for something already identified, unique, or generic in the formal sense.",
        "Each, every, either, and neither take a singular verb. 'A number of' takes a plural verb; 'the number of' takes a singular verb.",
        "In for months and years, on for days and dates, at for clock times.",
        "A narrative sequence follows time markers (before, after, by the time, having). The earliest event is not always the first clause.",
      ],
    },
    {
      heading: "Quantitative",
      rows: [
        { name: "Percentage change", latex: R`\frac{\text{new}-\text{old}}{\text{old}}\times 100\%`, note: "'Increase by' adds the change. 'Increase to' names the new value." },
        { name: "Ratio", latex: R`a:b=\frac{a}{b},\quad \frac{a}{b}=\frac{c}{d}\Rightarrow ad=bc` },
        { name: "Logs", latex: R`\log(ab)=\log a+\log b,\quad \log(a^c)=c\log a,\quad \log_b a=\frac{1}{\log_a b}=\frac{\ln a}{\ln b}` },
        { name: "AP", latex: R`S_n=\frac{n}{2}\big(2a+(n-1)d\big)` },
        { name: "GP", latex: R`S_n=a\frac{r^n-1}{r-1}\ (r\neq 1)` },
        { name: "Circle, sphere", latex: R`A=\pi r^2,\ C=2\pi r,\quad V=\tfrac43\pi r^3,\ S=4\pi r^2` },
        { name: "Cylinder", latex: R`V=\pi r^2 h,\quad \text{curved area}=2\pi r h` },
        { name: "Triangle", latex: R`\text{area}=\tfrac12 ab\sin C=\sqrt{s(s-a)(s-b)(s-c)}` },
      ],
    },
    {
      heading: "Analytical and spatial",
      rows: [
        { name: "Quarter turn", latex: R`(x,y)\mapsto(y,-x)\ \text{clockwise},\quad (x,y)\mapsto(-y,x)\ \text{counterclockwise}` },
        { name: "Half turn", latex: R`(x,y)\mapsto(-x,-y)` },
        { name: "Reflect", latex: R`(x,y)\mapsto(x,-y)\ \text{in the x-axis},\quad (x,y)\mapsto(-x,y)\ \text{in the y-axis}` },
        { name: "Scale about origin", latex: R`(x,y)\mapsto(sx,sy)` },
      ],
      bullets: [
        "Deduction preserves truth: if the premises are true and the form is valid, the conclusion is true. Induction can have true premises and a false conclusion.",
        "An analogy question is a relation. Name the relation in A:B before you look at the options for C.",
        "Each paper fold reflects the holes across that crease. Unfold in reverse order of folding.",
      ],
    },
  ],
};

export function getCheatsheet(section: string) {
  return cheatsheets[section] ?? [];
}

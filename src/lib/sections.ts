export type SectionMeta = {
  slug: string;
  num: number;
  title: string;
  short: string;
  budget: string;
  weeks: string;
  blurb: string;
  overview: string;
  tested: string[];
};

export const sections: SectionMeta[] = [
  {
    slug: "probability",
    num: 1,
    title: "Probability and Statistics",
    short: "Probability",
    budget: "16–20 of 85",
    weeks: "Weeks 1–4",
    blurb:
      "From counting and Bayes through the named distributions, the central limit theorem, and the three tests named in the syllabus.",
    overview: `This is the longest section in the official GATE 2027 DA syllabus, and it is one continuous story. Counting builds sample spaces. Axioms turn events into numbers. Conditional probability and Bayes update those numbers. Random variables compress an outcome into a number, and the named families — uniform, Bernoulli, binomial, Poisson, exponential, normal, $t$, and chi-squared — are the ones you are expected to recognise from a support and a mean.

Poisson sits in the syllabus next to the continuous families, but it is a distribution on the non-negative integers. Treating it as continuous is a standard way to lose a short question.

The last block is inference. A confidence interval is a procedure with a coverage rate, not a probability attached to a number you have already computed. A $z$-test uses a known scale, a $t$-test estimates that scale from the sample, and a chi-squared test is about counts. Degrees of freedom are part of the answer, not a footnote.`,
    tested: [
      "A Bayes update with two or three hypotheses, including a false-positive rate that is not one minus the true-positive rate.",
      "Mean and variance of a named distribution, or of a function of one, using linearity rather than a fresh integral.",
      "The difference between independence and zero covariance, and between a sample standard deviation (divisor $n-1$) and a population one.",
      "A test statistic, its null distribution, and the degrees of freedom. Critical values are either given or are the familiar normal ones (1.645, 1.96, 2.576).",
    ],
  },
  {
    slug: "linear-algebra",
    num: 2,
    title: "Linear Algebra",
    short: "Linear algebra",
    budget: "10–13 of 85",
    weeks: "Weeks 5–6",
    blurb:
      "Spaces and rank, the matrices with names (projection, orthogonal, idempotent, block), then elimination, eigenstructure, LU, and SVD.",
    overview: `Linear algebra on this syllabus is finite-dimensional and computational. A vector space and a subspace are definitions you use, not a chapter you skip on the way to matrices. Dependence, rank, and nullity are the same fact said three ways: the column space, the pivots, and the dimension of the solution set of $Ax=0$.

Several matrices are named explicitly, and each name is a property you can check. A projection matrix for an orthogonal projection is symmetric and idempotent. Idempotent alone ($A^2=A$) does not force symmetry. An orthogonal matrix satisfies $Q^\\top Q=I$; its columns are orthonormal, and it preserves lengths. A partition matrix is a block matrix: multiplication has to be conformable, and a block-triangular determinant factors.

LU and Gaussian elimination are the same process written two ways. SVD is the decomposition that exists for every real matrix, rectangular or not. Eigenvalues need a square matrix, and they need not be real unless the matrix is symmetric.`,
    tested: [
      "Rank, nullity, and whether $Ax=b$ has none, one, or infinitely many solutions.",
      "Eigenvalues of a projection, an idempotent matrix, or a small symmetric matrix, including a quadratic form that is positive definite exactly when those eigenvalues are positive.",
      "The shapes in $A=U\\Sigma V^\\top$, and which of $A^\\top A$ and $AA^\\top$ the singular values come from.",
      "A property that separates orthogonal, idempotent, and projection matrices.",
    ],
  },
  {
    slug: "calculus",
    num: 3,
    title: "Calculus and Optimization",
    short: "Calculus",
    budget: "4–7 of 85",
    weeks: "Week 7",
    blurb:
      "Functions of one variable: limits, continuity, differentiability, Taylor polynomials, and maxima and minima.",
    overview: `The official line is short, and it is entirely single-variable. Multivariable gradients and Lagrange multipliers are outside this section. Spending a month on them does not buy marks on the line that is actually printed.

What is printed is the chain from a function to its local and global extrema. A limit is a number the function approaches. Continuity says the limit equals the value. Differentiability is stronger than continuity: $|x|$ is continuous at the origin and not differentiable there. Taylor's theorem writes the polynomial that matches derivatives at a point, with a remainder that says how far the polynomial can be from the function.

Optimization on a closed interval is a checklist: critical points inside, endpoints, and the values of the function. The second-derivative test is local, and it is silent when the second derivative is zero.`,
    tested: [
      "A limit that needs a standard equivalent ($\\sin x / x$, $(e^x-1)/x$) or one careful application of L'Hôpital, including the hypotheses.",
      "A function that is continuous and not differentiable, or differentiable and therefore continuous.",
      "A Taylor polynomial of low order, sometimes with the Lagrange remainder used as a bound.",
      "The global maximum of a smooth function on a closed interval, endpoints included.",
    ],
  },
  {
    slug: "programming",
    num: 4,
    title: "Programming, Data Structures and Algorithms",
    short: "Programming & DSA",
    budget: "10–13 of 85",
    weeks: "Weeks 8–9",
    blurb:
      "Python, the basic structures, searches, the named sorts, graph traversal, and shortest paths.",
    overview: `The syllabus names Python, not pseudocode in the abstract. Questions often show a few lines and ask what is printed, or they ask for a complexity, a stability claim, or the order of operations in a sort or a shortest-path run.

The structures are the standard ones: stacks, queues, linked lists, trees, and hash tables. Trees here means the vocabulary and binary search trees, not a catalogue of balanced-tree rotations. Hash tables are average-case structures; the worst case is linear when every key collides.

Sorting is five algorithms with three facts each: best and worst comparisons, extra memory, and stability. Mergesort is the stable $n\\log n$ algorithm. Quicksort is not stable, and a bad pivot makes it quadratic. Graph traversal is BFS and DFS. Shortest paths on an unweighted graph are BFS. Dijkstra is the nonnegative-weight algorithm; a negative edge is outside its hypothesis, not a small inconvenience.`,
    tested: [
      "The output of a short Python fragment, including mutation, copies, and zero-based indexing.",
      "Worst-case and best-case complexity, and whether a sort is stable.",
      "A BST insertion or traversal order, or the cost of a hash-table operation under chaining.",
      "One run of BFS or Dijkstra on a graph small enough to do by hand. Negative weights are a trap, not an invitation to invent Bellman-Ford as if it were on the list.",
    ],
  },
  {
    slug: "databases",
    num: 5,
    title: "Database Management and Warehousing",
    short: "Databases",
    budget: "8–11 of 85",
    weeks: "Weeks 10–11",
    blurb:
      "ER and relational design, algebra and SQL, file organisation and indexes, then preprocessing and warehouse schemas.",
    overview: `The section has two halves that share vocabulary and not much else. The first half is a database: entities, relations, relational algebra, tuple calculus, SQL, keys, normal forms, files, and indexes. The second half is the data-mining preprocessing chapter: attribute types, scaling, discretisation, sampling, compression, and the warehouse model of facts, dimensions, hierarchies, and measures.

"Normalisation" is the trap that joins the halves. In the relational half it means normal forms. In the preprocessing half it means rescaling a feature, for example min-max or a $z$-score. The lessons use different titles on purpose.

Normal forms stop being mysterious once functional dependencies are written down. Second normal form cares about partial dependencies on a composite key. Third normal form cares about transitive dependencies of non-prime attributes. Boyce-Codd requires every determinant to be a superkey. BCNF implies 3NF; the converse fails on a small, standard pattern.

Warehouse schemas are star, snowflake, and fact constellation. A star keeps dimensions denormalised. A snowflake normalises them. Measures are distributive, algebraic, or holistic, and that classification decides whether a roll-up is a simple aggregate.`,
    tested: [
      "A relational-algebra expression, or the same query in tuple calculus, including a join condition that is easy to drop.",
      "Which normal form a relation violates, from a list of functional dependencies.",
      "Clustered versus unclustered, dense versus sparse, and when an index does not help.",
      "Star versus snowflake, and whether a measure can be recomputed from aggregates of aggregates.",
    ],
  },
  {
    slug: "machine-learning",
    num: 6,
    title: "Machine Learning",
    short: "Machine learning",
    budget: "18–24 of 85",
    weeks: "Weeks 12–14",
    blurb:
      "Regression and classification, the named predictors, validation, networks, clustering, linkage, and PCA.",
    overview: `Supervised learning on this syllabus is a list of models plus the reason they fail. Simple and multiple linear regression have normal equations. Ridge adds $\\lambda\\|\\beta\\|^2$ and shrinks coefficients; it does not set them to zero. Logistic regression is a linear model for log-odds, fitted by a loss, not by least squares. $k$-nearest neighbours and naive Bayes are the two classifiers that make their assumptions obvious: locality, and conditional independence of features.

Linear discriminant analysis assumes class-conditional Gaussians that share a covariance, so the boundary is linear. A support vector machine maximises a margin; the support vectors are the points that define it. Decision trees cut the space on one feature at a time. Bias and variance say what all of these trade off. Leave-one-out and $k$-fold are how you estimate the trade without a fresh test set. For ordinary least squares, the leave-one-out residual is the ordinary residual divided by $1-h_{ii}$.

A multilayer perceptron with a linear activation on every layer is still a linear map. The feed-forward lesson writes the layer recurrence and the reason a nonlinearity is there. XOR is the example, because a line cannot separate it.

Unsupervised learning is clustering and PCA. $k$-means uses means and a squared Euclidean objective. $k$-medoids uses actual data points. Hierarchical clustering is top-down or bottom-up; the syllabus then names single-linkage and multiple-linkage. Multiple-linkage is the complete-linkage rule: distance between clusters is the maximum pairwise distance. PCA diagonalises the covariance of centred data. It maximises captured variance. It does not know the class labels; that is the LDA lesson.`,
    tested: [
      "A normal-equation or ridge coefficient on a tiny design, or the role of $\\lambda$.",
      "Which assumption a classifier is using, and one prediction on a toy set (nearest neighbours, a linear discriminant, a margin).",
      "What leave-one-out reuses from the hat matrix, and what $k$-fold does and does not shuffle into the test fold.",
      "One Lloyd iteration, one linkage distance, or the fraction of variance in the first principal component.",
    ],
  },
  {
    slug: "artificial-intelligence",
    num: 7,
    title: "Artificial Intelligence",
    short: "Artificial intelligence",
    budget: "8–12 of 85",
    weeks: "Week 15",
    blurb:
      "Uninformed, informed, and adversarial search; propositional and predicate logic; exact and sampling-based inference.",
    overview: `Search comes in three kinds. Uninformed search has no estimate of the remaining cost: breadth-first, depth-first, uniform-cost, and iterative deepening, with completeness and optimality that depend on the cost model. Informed search has a heuristic. Greedy best-first follows $h$ alone and is not optimal. A* follows $f=g+h$. Admissible means $h$ never overestimates; on a tree, that is enough for A* to return an optimal path. Consistent means the heuristic satisfies a triangle inequality, and that is the hypothesis for optimal graph search without reopening.

Adversarial search is minimax on a zero-sum game tree. Alpha-beta prunes branches that cannot change the root value. It does not change that value when both sides play optimally.

Logic is propositional, then predicate. Propositional questions are truth, entailment, and a resolution step. Predicate questions are quantifiers, scope, and an English sentence that does not survive a swapped $\\forall$ and $\\exists$.

Uncertainty is a Bayesian network. Conditional independence is the factorization $P(X_i\\mid \\mathrm{parents})$, and the three path shapes — chain, fork, collider — decide whether conditioning creates or destroys independence. Variable elimination is exact inference by summing a hidden variable out of the factors that mention it. Sampling is approximate: prior samples, rejection sampling, and likelihood weighting. The order in which you eliminate variables changes the cost, not the answer.`,
    tested: [
      "Which search algorithm is complete or optimal under unit costs, and the $f$ values along an A* expansion.",
      "A minimax value, and a branch alpha-beta prunes.",
      "A sentence translated into predicate logic, with the quantifiers in the right order.",
      "A numeric query on a three-node network, either by elimination or by saying what a sampler would reject or reweight.",
    ],
  },
  {
    slug: "aptitude",
    num: 8,
    title: "General Aptitude",
    short: "Aptitude",
    budget: "15 marks exactly",
    weeks: "Weeks 16–18",
    blurb:
      "Verbal, quantitative, analytical, and spatial aptitude. Ten questions, five of them worth two marks, on every GATE paper.",
    overview: `General Aptitude is not a DA topic that happens to sit at the end of the brochure. It is a separate 15-mark block on every paper: five questions of one mark and five of two marks. The official syllabus has four parts.

Verbal aptitude is grammar (tenses, articles, adjectives, prepositions, conjunctions, verb-noun agreement, and the other parts of speech), vocabulary and idioms in context, reading comprehension, and narrative sequencing. The questions are short. A rule you half-remember is how a one-mark verbal item is lost.

Quantitative aptitude is data interpretation — bars, pies, other charts, two- and three-dimensional plots, maps, and tables — plus ratios, percentages, powers, exponents, logarithms, permutations and combinations, series, mensuration, and elementary statistics. This overlaps the probability section in words only. The arithmetic is the school version: read the table, compute the ratio, do not invent a hypothesis test.

Analytical aptitude is deduction and induction, analogy, and numerical relations. Spatial aptitude is the transformation of shapes: translation, rotation, scaling, mirroring, assembling, grouping, paper folding, cutting, and patterns in two and three dimensions. The spatial lessons state the coordinate rules so a figure can be checked rather than stared at.

Nothing in this block depends on the other seven sections. It can run in parallel with them, a lesson at a time, or as the last three weeks of the plan.`,
    tested: [
      "One grammar choice in which two nearby rules both look plausible (article plus countable noun, or a collective subject).",
      "A table or chart, then a ratio or a percentage change, including 'increase by' versus 'increase to'.",
      "A short deduction, an analogy with a relation you can name, or the next term of a series whose rule is not 'add 2'.",
      "A fold-and-punch or a rotation, using the coordinate rule rather than a guess.",
    ],
  },
];

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

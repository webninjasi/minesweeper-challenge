from ortools.sat.python import cp_model


W, H = 6, 10


def upper_limit(x, y):
  vert_zero = y == 0 or y == H-1
  horz_zero = x == 0 or x == W-1
  if vert_zero and horz_zero:
    return 9
  if vert_zero or horz_zero:
    return 15
  return 24

def forbidden_indices(n):
  if n > 9:
    if n > 15:
      return [x for x in range(1, W - 1)] + [x for x in range(W * (H - 1) + 1, W * H - 1)] + [y * W for y in range(H)] + [y * W + W - 1 for y in range(H)]

    return [0, W - 1, W * (H - 1), W * H - 1]

  return []


model = cp_model.CpModel()


# Variables
numIndex = [
  model.NewIntVar(0, W * H - 1, f'numidx_{i}')
  for i in range(25)
]

mines = [
  model.NewIntVar(0, 3, f'mine_{i}')
  for i in range(W * H)
]

nums = [
  model.NewIntVar(0, upper_limit(x, y), f'num_{x},{y}')
  for y in range(H)
    for x in range(W)
]


# Constraints
model.AddAllDifferent(numIndex)

for i, count in enumerate(nums):
  neighbors = [
    (i // W + dy) * W + (i % W) + dx
    for dy in range(-1, 2)
      for dx in range(-1, 2)
        if (dx != 0 or dy != 0) and i // W + dy >= 0 and i // W + dy < H and i % W + dx >= 0 and i % W + dx < W
  ]
  model.Add(sum([mines[j] for j in neighbors]) == count)

for num, idx in enumerate(numIndex):
  model.AddElement(index=idx, variables=mines, target=0)
  model.AddElement(index=idx, variables=nums, target=num)

  for x in forbidden_indices(num):
    model.Add(x != idx)


# Objective
model.Minimize(sum(mines))


# Solve
class SolutionCallback(cp_model.CpSolverSolutionCallback):
  def on_solution_callback(self):
    print('numIndex:', [self.Value(idx) for idx in numIndex])
    print('nums:', [self.Value(num) for num in nums])
    print('mines:', [self.Value(mine) for mine in mines])
    print(f'objective value: {self.ObjectiveValue()}')
    print(f'best objective bound: {self.BestObjectiveBound()}')

solver = cp_model.CpSolver()
status = solver.Solve(model, SolutionCallback())


# Final results
print(f'Status: {solver.StatusName(status)}')
print('Stats:')
print(solver.SolutionInfo())
print(solver.ResponseStats())

const XY = [-1, 0, 1]

export function neighbors(grid, x, y) {
  let neighborsCount = 0
  for (let xX of XY) {
    for (let yY of XY) {
      if (xX === 0 && yY === 0)
        continue
      neighborsCount += grid[x + xX]?.[y + yY] === 1
    }
  }
  return neighborsCount
}

export function newGrid(lines, columns) {
  return new Array(lines).fill(0).map(() => {
    return new Array(columns).fill(0)
  })
}

export function randomizeGrid(grid) {
  for (let x = grid.length; x--;) {
    for (let y = grid[x].length; y--;) {
      grid[x][y] = Math.random() >= 0.666 ? 1 : 0
    }
  }
}

export function tick(grid) {
  const nextGrid = newGrid(grid.length, grid[0].length)
  for (let x = grid.length; x--;) {
    for (let y = grid[x].length; y--;) {
      let neighborsSum = neighbors(grid, x, y)
      const cell = grid[x][y]
      if (cell === 0 && neighborsSum === 3) {
        nextGrid[x][y] = 1
      } else if (cell === 1 && (neighborsSum < 2 || neighborsSum > 3)) {
        nextGrid[x][y] = 0
      } else {
        nextGrid[x][y] = cell
      }
    }
  }
  return nextGrid
}
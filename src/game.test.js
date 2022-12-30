import { describe, expect, test } from '@jest/globals';
import { neighbors, newGrid, randomizeGrid, tick } from './game.js'


describe("tick", () => {
  test('square', () => {
    const matrix = [
      [1, 1],
      [1, 1]
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(matrix))
  })
  test('line', () => {
    const matrix = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]
    const toBe = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(toBe))
  })
  test('alone 1', () => {
    const matrix = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]
    const toBe = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(toBe))
  })
  test('alone 2', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ]
    const toBe = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(toBe))
  })
  test('alone 3', () => {
    const matrix = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    const toBe = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(toBe))
  })
  test('super population', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ]
    const toBe = [
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ]
    expect(JSON.stringify(tick(matrix))).toBe(JSON.stringify(toBe))
  })
})
describe("newGrid", () => {
  test('new grid 1', () => {
    const grid = newGrid(10, 10)
    expect(grid.length).toBe(10)
    expect(grid[0].length).toBe(10)
  })
  test('new grid 2', () => {
    const grid = newGrid(5, 15)
    expect(grid.length).toBe(5)
    expect(grid[0].length).toBe(15)
  })
  test('new grid 3', () => {
    const grid = newGrid(10, 5)
    expect(grid.length).toBe(10)
    expect(grid[4].length).toBe(5)
  })
})
describe("neighbors", () => {
  test('diagonal 1', () => {
    expect(neighbors([
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ], 1, 1)).toBe(2);
  })
  test('diagonal 2', () => {
    expect(neighbors([
      [0, 0, 1],
      [0, 0, 0],
      [1, 0, 0],
    ], 1, 1)).toBe(2);
  })
  test('full', () => {
    expect(neighbors([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ], 1, 1)).toBe(8);
  })
  test('vertical', () => {
    expect(neighbors([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ], 1, 1)).toBe(2);
  })
  test('horizontal', () => {
    expect(neighbors([
      [0, 0, 0],
      [1, 0, 1],
      [0, 0, 0],
    ], 1, 1)).toBe(2);
  })
  test('none', () => {
    expect(neighbors([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ], 1, 1)).toBe(0);
  })
  test('corner 1', () => {
    expect(neighbors([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ], 0, 0)).toBe(1);
  })
  test('corner 2', () => {
    expect(neighbors([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ], 2, 2)).toBe(1);
  })
})


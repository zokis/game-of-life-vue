<template>
  <div class="main">
    <section class="flex one">
      <fieldset class="flex two">
        <label for="rows">
          Rows
          <input type="number" name="rows" v-model="rows" />
        </label>
        <label for="columns">
          Columns
          <input type="number" name="columns" v-model="columns" />
        </label>
        <button class="shyButton new" @click="newGame">New</button>
        <button class="shyButton play" @click="stopPlay">{{ stopPlayLabel }}</button>
      </fieldset>
    </section>
    <section class="flex one">
      <div class="flex tow">
        <div>Generations: {{ generations }}</div>
        <div>{{ gameMessage }}</div>
      </div>
      <div class="flex one center">
        <div>
          <table>
            <tr v-for="(line, i) in grid" :key="i">
              <td @click="cellClick(i, j)" v-for="(cell, j) in line" :key="j" :class="colorizeCell(i, j)">
                &nbsp;
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { neighbors, newGrid, randomizeGrid, tick } from "../game.js"
export default {
  name: 'GameOfLife',
  data() {
    return {
      generations: 0,
      grid: null,
      interval: null,
      gameMessage: "",
      stopPlayLabel: "Stop",
      rows: 12,
      columns: 31,
    }
  },
  methods: {
    cellClick(x, y) {
      if (this.interval === null) {
        this.grid[x][y] = this.grid[x][y] === 1 ? 0 : 1
      }
    },
    stopPlay() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
        this.stopPlayLabel = "Play"
        this.gameMessage = ""
      } else {
        this.stopPlayLabel = "Stop"
        this.interval = setInterval(this.update, 500)
      }
    },
    newGame() {
      this.gameMessage = ""
      this.generations = 0
      this.grid = this.createGrid(parseInt(this.rows), parseInt(this.columns))
      this.randomizeGrid()
      this.interval = setInterval(this.update, 500)
    },
    colorizeCell(x, y) {
      let n = 0
      if (this.grid[x][y] === 1) {
        n = this.neighbors(x, y)
      }
      return `alive${n}`
    },
    createGrid(lines, columns) {
      return newGrid(lines, columns)
    },
    randomizeGrid() {
      randomizeGrid(this.grid)
    },
    neighbors(x, y) {
      return neighbors(this.grid, x, y)
    },
    update() {
      this.generations++
      const newGrid = tick(this.grid)
      if (JSON.stringify(this.grid) === JSON.stringify(newGrid)) {
        this.gameMessage = "Game Over"
        this.stopPlay()
      }
      this.grid = newGrid
    }
  },
  created() {
    this.newGame()
  }
}
</script>

<style scoped>
td {
  border: 1px solid;
  width: 30px;
  height: 30px;
}

.alive0 {
  background-color: #111119;
}

.alive1 {
  background-color: #4CC9F0;
}

.alive2 {
  background-color: #4895EF;
}

.alive3 {
  background-color: #4361EE;
}

.alive4 {
  background-color: #3F37C9;
}

.alive5 {
  background-color: #3A0CA3;
}

.alive6 {
  background-color: #480CA8;
}

.alive7 {
  background-color: #560BAD;
}

.alive8 {
  background-color: #7209B7;
}

.main {
  width: 90%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 0 0;
}

.shyButton {
  font-size: .75em;
}

td,
tr {
  padding: 0em 0em 0em 0em
}

input {
  color: #F72585;
}

button.new {
  background-color: #3c096c;
}

button.play {
  background-color: #7b2cbf;
}

input,
textarea,
.select select {
  font-size: .75em;
  line-height: 1;
  margin: 0;
  height: 1.2em;
  padding: 0.3em 0.3em;
  border: 1px solid #aaa;
  background-color: #fff;
  transition: all .3s;
  width: 100%;
}
</style>

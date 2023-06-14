// La matrice d’adjacence ci-dessous représente un labyrinthe que nous voulons explorer.
// Avec les coordonnées de départ en paramètre d’entrée, écrivez un algorithme qui permet de le parcourir entièrement.

// - 0 représente un chemin ouvert qui peut être parcouru et traversé.
// - 1 représente un chemin fermé qui ne peut être parcouru ou traversé.

// Remplacer par un X les chemins qu’il est possible de parcourir depuis le point de départ, puis afficher le labyrinthe.
// Vous pouvez présumer que le point de départ sera toujours un chemin ouvert.

class Graph {
    constructor(vertices) {
        this.vertices = vertices
        this.adjacencyMatrix = []

        for (let i = 0; i < this.vertices; i++) {
            this.adjacencyMatrix[i] = new Array(this.vertices).fill(0)
        }
    }

    addEdge(i, j) {
        this.adjacencyMatrix[i][j] = 1
    }

    display() {
        for(const row of this.adjacencyMatrix) {
            let displayRow = ''
            for(const value of row) {
                displayRow += value + ' '
            }

            console.log(displayRow)
        }
    }

    depthFirstSearch(start) {
        const stack = [], explored = new Set()

        stack.push(start)

        while (stack.length) {
            const direction = stack.pop()

            this.adjacencyMatrix[direction.row][direction.col] = 'X'
            explored.add(direction)

            for(const validAdjacentNodes of this.validAdjacentNodes(direction, explored)) {
                stack.push(validAdjacentNodes)
            }
        }
    }

    *validAdjacentNodes(currentNode, explored) {
        const directionsOffset = [
            {row: -1, col: 0},
            {row: 1, col: 0},
            {row: 0, col: -1},
            {row: 0, col: 1}
        ]

        for(const offset of directionsOffset) {
            const direction = {row: offset.row + currentNode.row, col: offset.col + currentNode.col}

            if(this.isValidNode(direction.row, direction.col) && !explored.has(direction)) {
                yield direction
            }
        }
    }

    isValidNode(row, col) {
        return col >= 0 && row >= 0 && col < this.adjacencyMatrix.length && row < this.adjacencyMatrix.length && this.adjacencyMatrix[row][col] === 0
    }
}

myGraph = new Graph(5)

myGraph.addEdge(0, 1)
myGraph.addEdge(0, 2)

myGraph.addEdge(1, 0)
myGraph.addEdge(1, 1)

myGraph.addEdge(2, 0)
myGraph.addEdge(2, 3)

myGraph.addEdge(3, 0)
myGraph.addEdge(3, 1)
myGraph.addEdge(3, 3)
myGraph.addEdge(3, 4)

myGraph.addEdge(4, 1);

myGraph.display()
// 0 1 1 0 0
// 1 1 0 0 0
// 1 0 0 1 0
// 1 1 0 1 1
// 0 1 0 0 0

console.log('\n\n')

const start = {row: 0, col: 4}

myGraph.depthFirstSearch(start)

myGraph.display()
// 0 1 1 X X
// 1 1 X X X
// 1 X X 1 X
// 1 1 X 1 1
// 0 1 X X X

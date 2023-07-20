class Graph {
    constructor() {
        this.root = new Map();
    }

    addVertex(value) {
        if (!this.root.has(value)) this.root.set(value, []);
        return this.root;
    }

    removeVertex(vertex) {
        if (!this.root.has(vertex)) return this.root;
        // all edges list
        const edges = this.root.get(vertex);
        // removing vertex from each connected edge
        for (const edge of edges) {
            const edgeVertex = this.root.get(edge);
            const indexOfVertex = edgeVertex?.indexOf(vertex);
            edgeVertex.splice(indexOfVertex, 1)
        }
        // removing vertex
        this.root.delete(vertex)
        //..
        return this.root;
    }

    addEdge(vertexA, vertexB) {
        // Vertex A
        if (!this.root.has(vertexA)) this.root.set(vertexA, [vertexB]);
        if (!this.root.get(vertexA).includes(vertexB)) this.root.get(vertexA).push(vertexB);
        // Vertex B
        if (!this.root.has(vertexB)) this.root.set(vertexB, [vertexA]);
        if (!this.root.get(vertexB).includes(vertexA)) this.root.get(vertexB).push(vertexA);
        //...
        return this.root;
    }

    removeEdge(vertexA, vertexB) {
        if (!this.root.has(vertexA) || !this.root.has(vertexB)) return this.root;
        // Finding indexes of vertices in each edge
        const indexOfVertexAInVertexB = this.root.get(vertexB).indexOf(vertexA);
        const indexOfVertexBInVertexA = this.root.get(vertexA).indexOf(vertexB);
        // Removing edge from both vertices
        this.root.get(vertexA).splice(indexOfVertexBInVertexA, 1)
        this.root.get(vertexB).splice(indexOfVertexAInVertexB, 1)
        return this.root;
    }

    getEdges(vertex) {
        return this.root.get(vertex) ?? [];
    }

    bfs(vertex) {
        if (!this.root.get(vertex)) return new Set();
        //...
        const visited = new Set(vertex);
        const queue = [vertex];
        while (queue.length > 0) {
            const edge = queue.shift();
            const edgeVertexs = this.root.get(edge);

            for (const edgeVertex of edgeVertexs) {
                if (!visited.has(edgeVertex)) {
                    visited.add(edgeVertex);
                    queue.push(edgeVertex);
                }
            }
        }
        return visited;
    }

    dfs(vertex, visited = new Set()) {
        if (!this.root.get(vertex)) return visited;
        //...
        visited.add(vertex);
        const edgeVertexes = this.root.get(vertex);
        for (const edgeVertex of edgeVertexes) {
            if (!visited.has(edgeVertex)) this.dfs(edgeVertex, visited);
        }
        return visited;
    }
}

const graph = new Graph();

graph.addVertex('A');
graph.addVertex("B");
graph.addVertex('C');
graph.addVertex("D");
graph.addVertex('E');
graph.addVertex("F");

graph.addEdge("A", "R");
graph.addEdge("A", "C");
graph.addEdge("A", "G");
graph.addEdge("P", "T");
graph.addEdge("P", "M");
graph.addEdge("D", "M");
graph.addEdge("A", "M");
graph.addEdge("D", "M");
graph.addEdge("Z", "W");

graph.removeVertex("X")
graph.removeEdge("A", "C")

console.log("Edges of P : ", graph.getEdges("P"))
console.log("DFS :", graph.dfs("A"))
console.log("BFS :", graph.bfs("T"))
console.log(graph.root);

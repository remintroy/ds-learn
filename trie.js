class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(value) {
        let node = this.root;
        for (const char of value) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEnd = true
    }

    search(value) {
        let node = this.root;
        for (const char of value) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }

    searchAbsolute(value) {
        let node = this.root;
        for (const char of value) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEnd
    }

    getAllWordsStartsWith(value) {
        const words = [];

        function dfs(node, currentWord) {
            if (node.isEnd) words.push(currentWord);

            for (const char in node.children) {
                dfs(node.children[char], currentWord + char)
            }
        }

        let node = this.root;

        // finding nodes with given input
        for (const char of value) {
            if (!node.children[char]) return [];
            node = node.children[char]
        }

        // dfs in node with prefix
        dfs(node, value)

        return words;
    }
}

const trie = new Trie();

trie.insert('hey')
trie.insert('mug')
trie.insert('map')
trie.insert('maper')
trie.insert('moper')

console.log(trie.search("hey"))
console.log(trie.searchAbsolute("hey"))
console.log(trie.getAllWordsStartsWith("m"))
console.log(trie.root.children)
class BstNode {
    constructor(value) {
        this.right = null
        this.left = null
        this.value = value
    }
}

class Bst {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new BstNode(value)
        function insertNode(node, value) {
            if (node.value >= value) {
                if (node.left === null) node.left = newNode;
                else insertNode(node.left, value)
            } else {
                if (node.right === null) node.right = newNode;
                else insertNode(node.right, value)
            }
        }
        if (this.root == null) this.root = new BstNode(value);
        else insertNode(this.root, value);
    }

    search(searchQuery) {
        function searchNode(node, searchQuery) {
            if (node == null) return false;
            if (node.value == searchQuery) return true;

            if (node.value >= searchQuery) return searchNode(node.left, searchQuery)
            else return searchNode(node.right, searchQuery)
        }
        return searchNode(this.root, searchQuery)
    }

    delete(value) {

        function findMinNode(node) {
            if (node.left == null) return node;
            else return findMinNode(node.left);
        }

        function removeNode(node, value) {
            if (node == null) return null;

            if (node.value > value) {
                node.left = removeNode(node.left, value)
                return node;
            } else if (node.value < value) {
                node.right = removeNode(node.right, value)
                return node;
            } else {

                if (node.left == null && node.right == null) {
                    node = null;
                    return node;
                }

                if (node.left == null) {
                    node = node.right;
                    return node;
                } else if (node.right == null) {
                    node = node.left;
                    return node;
                } else {
                    const smallerRightNode = findMinNode(node.right);
                    node.value = smallerRightNode.value;
                    node.right = removeNode(smallerRightNode, value)
                    return node;
                }
            }
        }
        return removeNode(this.root, value)
    }
}

const bst = new Bst();

bst.insert(10)
bst.insert(2)
bst.insert(4)
bst.insert(1)
bst.insert(20)
bst.insert(22)
bst.insert(19)

console.log(bst.root)

// console.log(bst.search(1))
console.log(bst.delete(20))
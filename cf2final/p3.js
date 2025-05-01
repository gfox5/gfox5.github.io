// Binary Search Tree Implementation
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    search(value) {
        if (this.root === null) return false;
        
        let current = this.root;
        let found = false;
        
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        
        return found;
    }

    // Inorder traversal to get the sorted sequence
    inorder(node = this.root, values = []) {
        if (node !== null) {
            this.inorder(node.left, values);
            values.push(node.value);
            this.inorder(node.right, values);
        }
        return values;
    }
}

// Game logic
class MemoryGame {
    constructor() {
        this.gridSize = 5;
        this.grid = document.getElementById('game-grid');
        this.statusDisplay = document.getElementById('status');
        this.scoreDisplay = document.getElementById('score');
        this.startButton = document.getElementById('start-btn');
        this.resetButton = document.getElementById('reset-btn');
        this.levelSelect = document.getElementById('level');
        this.bodyElement = document.body;
        
        this.patterns = new BinarySearchTree();
        this.currentPattern = [];
        this.userPattern = [];
        this.score = 0;
        this.isPlaying = false;
        this.isUserTurn = false;
        this.cells = [];
        this.activeBall = null;
        
        this.setupGrid();
        this.setupEventListeners();
    }

    setupGrid() {
        this.grid.innerHTML = '';
        this.cells = [];
        
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            this.grid.appendChild(cell);
            this.cells.push(cell);
        }
        
        // Create one ball that will move around
        this.activeBall = document.createElement('div');
        this.activeBall.className = 'ball';
        this.activeBall.style.display = 'none';
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if (this.isUserTurn) {
                    const index = parseInt(e.currentTarget.dataset.index);
                    this.handleUserClick(index);
                }
            });
        });
        
        // Add animation end listener
        this.bodyElement.addEventListener('animationend', () => {
            this.bodyElement.classList.remove('rainbow-flash');
        });
    }
    
    // Rainbow animation function
    playRainbowAnimation() {
        this.bodyElement.classList.add('rainbow-flash');
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.currentPattern = [];
        this.userPattern = [];
        this.startButton.disabled = true;

        let moveCount;
        switch (this.levelSelect.value) {
            case 'easy': moveCount = 3; break;
            case 'medium': moveCount = 5; break;
            case 'hard': moveCount = 7; break;
            default: moveCount = 3;
        }

        this.generatePattern(moveCount);
        this.statusDisplay.textContent = 'Watch the pattern carefully...';
        
        // Display the ball on a random cell to start
        const randomStartIndex = Math.floor(Math.random() * this.cells.length);
        this.cells[randomStartIndex].appendChild(this.activeBall);
        this.activeBall.style.display = 'block';
        
        // Show the pattern 3 times
        this.showPatternMultipleTimes(3);
    }

    generatePattern(moveCount) {
        this.patterns = new BinarySearchTree();
        this.currentPattern = [];
        
        // Generate unique cell indices for the pattern
        const totalCells = this.gridSize * this.gridSize;
        
        for (let i = 0; i < moveCount; i++) {
            let cellIndex;
            do {
                cellIndex = Math.floor(Math.random() * totalCells);
            } while (this.patterns.search(cellIndex));
            
            this.patterns.insert(cellIndex);
            this.currentPattern.push(cellIndex);
        }
        
        console.log("Generated pattern:", this.currentPattern);
    }

    showPatternMultipleTimes(times) {
        let repetition = 0;
        
        const showNextRepetition = () => {
            if (repetition < times) {
                this.showPattern(() => {
                    repetition++;
                    setTimeout(showNextRepetition, 1000);
                });
            } else {
                this.startUserTurn();
            }
        };
        
        showNextRepetition();
    }

    showPattern(callback) {
        let moveIndex = 0;
        const interval = 1000; // 1 second between moves
        
        const showNextMove = () => {
            if (moveIndex < this.currentPattern.length) {
                const cellIndex = this.currentPattern[moveIndex];
                this.moveActiveBall(cellIndex);
                moveIndex++;
                setTimeout(showNextMove, interval);
            } else {
                if (callback) callback();
            }
        };
        
        showNextMove();
    }

    moveActiveBall(cellIndex) {
        this.activeBall.style.display = 'block';
        const cell = this.cells[cellIndex];
        if (cell.contains(this.activeBall)) {
            // Ball is already here, just highlight
            this.highlightCell(cell);
        } else {
            // Move ball to new cell
            cell.appendChild(this.activeBall);
            this.highlightCell(cell);
        }
    }

    highlightCell(cell) {
        cell.classList.add('active');
        setTimeout(() => {
            cell.classList.remove('active');
        }, 500);
    }

    startUserTurn() {
        this.userPattern = [];
        this.isUserTurn = true;
        this.statusDisplay.textContent = 'Your turn! Recreate the pattern.';
        this.activeBall.style.display = 'none';
    }

    handleUserClick(cellIndex) {
        if (!this.isUserTurn) return;
        
        // Move the ball to the clicked cell
        this.moveActiveBall(cellIndex);
        this.userPattern.push(cellIndex);
        
        // Check if this move is correct so far
        const currentIndex = this.userPattern.length - 1;
        if (this.userPattern[currentIndex] !== this.currentPattern[currentIndex]) {
            this.statusDisplay.textContent = 'Incorrect! Game over.';
            this.endGame(false);
            return;
        }
        
        // Check if the pattern is complete
        if (this.userPattern.length === this.currentPattern.length) {
            this.statusDisplay.textContent = 'Correct! Well done!';
            this.score += this.currentPattern.length;
            this.scoreDisplay.textContent = `Score: ${this.score}`;
            
            // Play rainbow animation on success
            this.playRainbowAnimation();
            
            
            this.endGame(true);
        }
    }

    endGame(success) {
        this.isUserTurn = false;
        this.isPlaying = false;
        this.startButton.disabled = false;
        
        if (success) {
            setTimeout(() => {
                this.statusDisplay.textContent = 'Press "Start" to play again';
            }, 2000);
        }
    }

    resetGame() {
        this.isUserTurn = false;
        this.isPlaying = false;
        this.score = 0;
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.statusDisplay.textContent = 'Press "Start" to begin';
        this.startButton.disabled = false;
        this.activeBall.style.display = 'none';
        
        if (this.activeBall.parentNode) {
            this.activeBall.parentNode.removeChild(this.activeBall);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new MemoryGame();
});
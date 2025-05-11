import numpy as np
import heapq
import time

def is_solvable(board):
    flat_board = board.flatten()
    inversions = 0
    for i in range(9):
        if flat_board[i] == 0:
            continue
        for j in range(i + 1, 9):
            if flat_board[j] == 0:
                continue
            if flat_board[i] > flat_board[j]:
                inversions += 1
    return inversions % 2 == 0

class PuzzleState:
    def __init__(self, board, parent=None, move=None, depth=0):
        self.board = board
        self.parent = parent
        self.move = move
        self.depth = depth
        self.blank_pos = tuple(map(int, np.argwhere(self.board == 0)[0]))
        self.h = self._manhattan_distance()
        self.f = self.depth + self.h
    
    def _manhattan_distance(self):
        distance = 0
        for i in range(3):
            for j in range(3):
                if self.board[i, j] != 0:
                    val = self.board[i, j]
                    goal_row, goal_col = (val - 1) // 3, (val - 1) % 3
                    distance += abs(i - goal_row) + abs(j - goal_col)
        return distance
    
    def get_children(self):
        children = []
        i, j = self.blank_pos
        directions = [('up', -1, 0), ('down', 1, 0), ('left', 0, -1), ('right', 0, 1)]
        
        for move, di, dj in directions:
            ni, nj = i + di, j + dj
            if 0 <= ni < 3 and 0 <= nj < 3:
                new_board = self.board.copy()
                new_board[i, j], new_board[ni, nj] = new_board[ni, nj], new_board[i, j]
                children.append(PuzzleState(new_board, self, move, self.depth + 1))
        return children
    
    def __eq__(self, other):
        return np.array_equal(self.board, other.board)
    
    def __lt__(self, other):
        return self.f < other.f
    
    def __hash__(self):
        return hash(self.board.tobytes())

def solve_8_puzzle(initial_board, timeout=60):
    if not is_solvable(initial_board):
        return None, 0, 0
        
    initial_state = PuzzleState(initial_board)
    goal_board = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 0]])
    
    open_set = []
    heapq.heappush(open_set, (initial_state.f, id(initial_state), initial_state))
    open_dict = {hash(initial_state): initial_state}
    closed_set = set()
    
    nodes_expanded = 0
    max_queue = 1
    start_time = time.time()
    
    while open_set:
        if time.time() - start_time > timeout:
            return None, nodes_expanded, max_queue
            
        _, _, current = heapq.heappop(open_set)
        nodes_expanded += 1
        
        open_hash = hash(current)
        if open_hash in open_dict:
            del open_dict[open_hash]
        
        if np.array_equal(current.board, goal_board):
            path = []
            while current.parent:
                path.append((current.move, current.board))
                current = current.parent
            path.reverse()
            return path, nodes_expanded, max_queue
        
        closed_set.add(hash(current))
        
        for child in current.get_children():
            child_hash = hash(child)
            
            if child_hash in closed_set:
                continue
                
            if child_hash in open_dict and child.f >= open_dict[child_hash].f:
                continue
            
            open_dict[child_hash] = child
            heapq.heappush(open_set, (child.f, id(child), child))
            
        max_queue = max(max_queue, len(open_set))
    
    return None, nodes_expanded, max_queue

def print_solution(result):
    if result is None or result[0] is None:
        print("No solution found")
        return
        
    path, nodes_expanded, max_queue = result
    
    if path:
        print(f"Solution found in {len(path)} moves")
        print(f"Nodes expanded: {nodes_expanded}")
        print(f"Maximum queue size: {max_queue}")
        
        for i, (move, board) in enumerate(path):
            print(f"Step {i+1}: {move}")
            print(board)
    else:
        print("No solution found")

if __name__ == "__main__":
    print("8-PUZZLE SOLVER")
    
    hard_board = np.array([
        [8, 6, 7],
        [2, 5, 4],
        [3, 0, 1]
    ])
    
    print("\nSolving 8-puzzle:")
    print(hard_board)
    
    if not is_solvable(hard_board):
        print("This puzzle configuration is NOT solvable!")
    else:
        start_time = time.time()
        result = solve_8_puzzle(hard_board)
        solve_time = time.time() - start_time
        print(f"Time taken: {solve_time:.2f} seconds")
        print_solution(result)

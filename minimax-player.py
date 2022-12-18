"""
Mini-max Tic-Tac-Toe Player
"""

import poc_ttt_gui
import poc_ttt_provided as provided

# Set timeout, as mini-max can take a long time
import codeskulptor
codeskulptor.set_timeout(200)

# SCORING VALUES - DO NOT MODIFY
SCORES = {provided.PLAYERX: 1,
          provided.DRAW: 0,
          provided.PLAYERO: -1}

def mm_move(board, player):
    """
    Make a move on the board.

    Returns a tuple with two elements.  The first element is the score
    of the given board and the second element is the desired move as a
    tuple, (row, col).
    """
    #base case
    player2 = provided.switch_player(player)
    if board.check_win() == player:
        return SCORES[player], (-1, -1)
    elif board.check_win() == player2:
        return SCORES[player2], (-1, -1)
    elif board.check_win() == provided.DRAW:
        return 0, (-1, -1)

    #print board

    #print "player", player

    possible_moves = board.get_empty_squares()
    best_move = None
    #print player, "turn"
    #print "possible moves:", possible_moves
    for row, col in possible_moves:
        #print "player1, player2:", SCORES[player], SCORES[player2]
        new_board = board.clone()
        new_board.move(row, col, player)
        #print new_board
        current_move = None
        if new_board.check_win() == player:
            current_move = SCORES[player], (row, col)
        elif new_board.check_win() == provided.DRAW:
            current_move = 0, (row, col)
        else:
            move2 = mm_move(new_board, player2)
            current_move = move2[0], (row, col)
        #print "current_move", current_move
        #print "player", SCORES[player]
        #print "score", current_move[0] * SCORES[player]
        if best_move is None or (current_move[0] * SCORES[player]) >= best_move[0] * SCORES[player]:
            #print "current >= best", current_move, best_move, SCORES[player]
            best_move = current_move[0], current_move[1]
            #print "best_move", best_move

    #print "final best move", best_move, SCORES[player]
    #print board
    return best_move


def move_wrapper(board, player, trials):
    """
    Wrapper to allow the use of the same infrastructure that was used
    for Monte Carlo Tic-Tac-Toe.
    """
    move = mm_move(board, player)
    assert move[1] != (-1, -1), "returned illegal move (-1, -1)"
    return move[1]

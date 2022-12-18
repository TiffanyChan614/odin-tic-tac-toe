"""
Monte Carlo Tic-Tac-Toe Player
"""

import random
import poc_ttt_gui
import poc_ttt_provided as provided

# Constants for Monte Carlo simulator
# You may change the values of these constants as desired, but
#  do not change their names.
NTRIALS = 1000        # Number of trials to run
SCORE_CURRENT = 1.0 # Score for squares played by the current player
SCORE_OTHER = 1.0   # Score for squares played by the other player

# Add your functions here.
def mc_trial(board, player):
    '''
    This function performs a trial
    on the board given.

    It takes the current board and the next player to move.

    It returns when the game is over
    '''

    player2 = provided.switch_player(player)

    while not board.check_win():
        row1 = random.randrange(0, board.get_dim())
        col1 = random.randrange(0, board.get_dim())
        board.move(row1, col1, player)
        #print board
        if board.check_win():
            break
        row2 = random.randrange(0, board.get_dim())
        col2 = random.randrange(0, board.get_dim())
        board.move(row2, col2, player2)
        #print board

def mc_update_scores(scores, board, player):
    '''
    This function update the scores
    based on the completed board given.

    This function takes a grid of scores (a list of lists)
    with the same dimensions as the Tic-Tac-Toe board,
    a board from a completed game,
    and which player the machine player is.
    '''

    if board.check_win() == provided.DRAW:
        return
    elif board.check_win() == player:
        score_inc = SCORE_CURRENT
    else:
        score_inc = -SCORE_OTHER

    for row in range(board.get_dim()):
        for col in range(board.get_dim()):
            state = board.square(row, col)
            if state == provided.EMPTY:
                continue
            elif state == player:
                scores[row][col] += score_inc
            else:
                scores[row][col] -= score_inc

def get_best_move(board, scores):
    '''
    This function find the best move on the current board.

    It takes a current board and a grid of scores.

    It returns a tuple of (row, col) of the non-empty square
    with the highest score.
    '''

    if not board.get_empty_squares():
        print ("No possible move")
        return

    max_score = None
    max_square = None

    for row in range(board.get_dim()):
        for col in range(board.get_dim()):

            if (max_score is None
                and board.square(row, col) == provided.EMPTY):
                max_square = (row, col)
                max_score = scores[row][col]
                empty_square_found = True

            elif (max_score is not None
                  and scores[row][col] > max_score
                  and board.square(row, col) == provided.EMPTY):
                max_score = scores[row][col]
                max_square = (row, col)

    return max_square

def mc_move(board, player, trials):
    '''
    This function perform the monte carlo stimulation.

    It takes the current board,
    which player the machine player is,
    and the number of trials to run.

    It returns the best move in the form of a (row, col) tuple.
    '''
    scores = [[0 for dummy in range(board.get_dim())] for dummy in range(board.get_dim())]
    for dummy in range(trials):
        board_copy = board.clone()
        mc_trial(board_copy, player)
        mc_update_scores(scores, board_copy, player)
    return get_best_move(board, scores)

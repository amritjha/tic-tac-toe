# tic-tac-toe

This respository is dedicated for the mini-project that we were supposed to do as part of our <strong>Design & Analysis of Algorithms</strong> course. 

The application that I built for the fulfillment of the objective of the project is a <strong>tic-tac-toe game</strong> that has an <strong>unbeatable AI</strong> behind it. 

The heart of this application is the AI of it, which has been accomplished through the application of the popular <strong>Minimax algorithm</strong>. 

The <strong>Minimax algorithm</strong> is a backtracking algorithm that is widely used to give mind to the computer player (i.e the AI) in various two-player games such as Tic Tac Toe, Chess etc. The algorithm fundamentally identifies the two players as the two agents (human and computer), one of which is a maximizing agent(here, human player) while the other one is a minimizing agent(here, computer). Thereafter, the algorithm at each state of the game, takes in the board configuration and maximizes/minimizes upon the respective agents through a recursive approach to determine the best move for the agent of interest. 

The algorithm works with the assumption that the other player would play the game optimally from the given state and optimizes upon the parameters based on this. This is the key reason why the algorithm gives an unbeatable AI, provided its applied right from the initial board configuration. In any other case, it is guaranteed that the minimax approach would always determine the best possible move, however the result of the game depends of what was the state of the game when the algorithm was applied. 


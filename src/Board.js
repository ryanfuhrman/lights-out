import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };

    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // DONE

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.ncols; i++) {
      board.push([]);
      for (let j = 0; j < this.props.nrows; j++) {
        let randomBool = Math.random() <= this.props.chanceLightStartsOn;
        board[i].push(randomBool);
      }
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  // DONE
  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    // DONE
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    // DONE
    const hasWon = this.state.board.every(row => {
      return row.every(cell => {
        return cell === false;
      });
    });

    this.setState({
      board,
      hasWon,
    });
  }

  /** Render game board or winning message. */
  // DONE

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return <h2>Winner!</h2>;
    } else {
      // TODO // make table board // TODO
      return (
        <table className="Board">
          <tbody>
            {this.state.board.map((rows, i) => {
              let y = i;
              return (
                <tr className="Board-row" key={i}>
                  {rows.map((isLit, x) => {
                    return (
                      <Cell
                        id={`${y}-${x}`}
                        key={`${y}-${x}`}
                        isLit={isLit}
                        flipCellsAroundMe={this.flipCellsAround}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default Board;

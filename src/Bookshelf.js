import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'


class Bookshelf extends Component {

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    shelfname: PropTypes.string.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {allBooks, shelfname, changeBookShelf } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {allBooks.filter(book => (book.shelf === shelfname)).map(book => (
            <Book key={book.id}
              book={book} changeBookShelf={changeBookShelf} />
          ))}
        </ol>
      </div>
    )
  }
}

export default Bookshelf

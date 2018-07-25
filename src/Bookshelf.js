import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class Bookshelf extends Component {

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    shelfname: PropTypes.string.isRequired
  }

  render() {
    const {allBooks, shelfname } = this.props;

    return (
    <div key={shelfname} className="bookshelf">
      <h2 className="bookshelf-title">{shelfname}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {allBooks.filter(book => (book.shelf === shelfname)).map(book => (
            <Book key={book.id}
              book={book} />
          ))}
        </ol>
      </div>
    </div>
    )
  }
}

export default Bookshelf

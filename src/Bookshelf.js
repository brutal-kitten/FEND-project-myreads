import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    shelfname: PropTypes.string.isRequired
  }

  render() {
    const {allBooks, shelfname } = this.props;

    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfname}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {allBooks.filter(book => (book.shelf === shelfname)).map(book => (
            <li key ={book.id}>
              <div className="book">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
    )
  }
}

export default Bookshelf

import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  render() {

    const {book , changeBookShelf } = this.props;
    const coverPlaceHolder = "http://via.placeholder.com/128x193"
    let image = (book.imageLinks &&  book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : this.coverPlaceHolder;


    return (
        <li>
          <div className="book">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}>
              <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf: "none"} onChange={(evt) => changeBookShelf(book, evt.target.value)} >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title" ><p>{book.title}</p></div>
            <div className="book-authors"><p>{book.authors}</p></div>
          </div>
        </li>
    )
  }


}


export default Book

import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Book extends Component {

  render() {

    const {book} = this.props;

    return (
        <li>
          <div className="book">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
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
            <p className="book-title">{book.title}</p>
            <p className="book-authors">{book.authors}</p>
          </div>
        </li>


    )
  }


}


export default Book

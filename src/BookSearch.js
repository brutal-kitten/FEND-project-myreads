import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class BookSearch extends Component {
  static propTypes = {
    changeBookShelf: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired
  }

  state = {
    query: '',
    bookSearchResult: [],
    searchResult: true
  }

  /*update state*/
  updateQuery = (query) => {
    this.setState({query: query})
  }
  /*clear query and update state*/
  clearQuery = () => {
    this.setState({query: ''})
  }
  /* when button pressed invoke searchForBooks */
  handleSubmit= (event) => {
    event.preventDefault();
    this.searchForBooks(this.state.query.trim());
  }

  /* search for book*/
  searchForBooks = (query) => {
    BooksAPI.search(query).then((result) => {
      /* for each book in returned array add a shelf information */
      result.forEach(book => {
        let id = book.id;
        this.props.allBooks.forEach(existedBook => {
          if (existedBook.id === id) {
          book.shelf= existedBook.shelf;
          }
          })
        })
      /* update state */
      this.setState({bookSearchResult: result, searchResult: true});
  }).catch(() => {
     /* error handler: change state*/
     this.setState({searchResult: false});
     this.clearQuery()})}


 render() {
   const { query, bookSearchResult, searchResult } = this.state
   const { changeBookShelf, allBooks } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link exact to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={(event) => this.handleSubmit(event)}>
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            <button className="find">Find books</button>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {searchResult === false && (
            <div className='noresult'>
              <h3>Sorry, we dont have such book yet</h3>
            </div>
          )}
          {(bookSearchResult.length > 0) && (searchResult === true) && (query.length > 0) && (
            bookSearchResult.map(book => (
              <Book
               key={book.id}
               book={book} changeBookShelf={changeBookShelf}
               />
            ))
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch

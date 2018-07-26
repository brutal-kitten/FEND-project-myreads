import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

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

  updateQuery = (query) => {

    this.setState({query: query.trim() })
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  searchForBooks = (query) => {
    BooksAPI.search(query).then((result) => {
      result.forEach(book => {
        let id = book.id;
        this.props.allBooks.forEach(existedBook => {
          if (existedBook.id === id) {
          book.shelf= existedBook.shelf;
          }
          })
        })
      this.setState({bookSearchResult: result, searchResult: true});
  }).catch(() => {
     this.setState({searchResult: false});
     this.clearQuery()})}

  if(query) {
    this.searchForBooks(query);
  }

 render() {
   const { query, bookSearchResult, searchResult } = this.state
   const { changeBookShelf, allBooks } = this.props

   if(query) {
     this.searchForBooks(query);
   }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
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

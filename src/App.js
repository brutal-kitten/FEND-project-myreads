import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ books: allBooks });
    })
  }

  changeBookShelf = (book, shelfToBe) => {
    let id = book.id;
    BooksAPI.update(book, shelfToBe).then(() => {
      book.shelf = shelfToBe;

      let allBooks = this.state.books.filter(book => book.id !== id);
      allBooks.push(book);
      this.setState({ books: allBooks });
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
        <BookSearch allBooks={this.state.books} changeBookShelf={this.changeBookShelf}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
                <Bookshelf
                  allBooks={this.state.books}
                  shelfname="wantToRead"
                  changeBookShelf={this.changeBookShelf}
                />
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
                <Bookshelf
                  allBooks={this.state.books}
                  shelfname="currentlyReading"
                  changeBookShelf={this.changeBookShelf}
                />
              </div>
              <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <Bookshelf
                  allBooks={this.state.books}
                  shelfname="read"
                  changeBookShelf={this.changeBookShelf}
                  />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

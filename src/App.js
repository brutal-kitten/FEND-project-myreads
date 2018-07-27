import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  /* get all books and update state*/
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ books: allBooks });
    })
  }

  /* change shelf for a particular book and update state*/
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
        /* view of search page */
        <Route exact path="/search" render={() => (
          <BookSearch allBooks={this.state.books} changeBookShelf={this.changeBookShelf}/>
        )}/>
        /*view of the main page*/
        <Route exact path="/" render={() => (
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
            /* button that navigate to search page*/
            <div className="open-search">
              <Link className="a" to='./search' >Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp

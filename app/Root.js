import { h, Component } from 'preact'
import Router from 'preact-router'

import { omdb } from 'app/API'
import { apiEvents } from 'app/utils'
import { SearchInput } from 'app/Search'
import Home from './Home'
import { ResultsList, Paginate, CurrentItem } from 'app/Results'

export default class Root extends Component {
  setCurrentItem = (item) => {
    if (!item) {
      this.setState({
        currentItem: null
      })
    } else {
      omdb.getItem(item.imdbID)
      .then(fullItem => {
        this.setState({
          currentItem: {...fullItem, imdbID: item.imdbID}
        })
      })
    }
  }

  render () {


    return <Router>
      <CurrentItem path='/item/:id' />
      <Home path='/' default />
    </Router>
  }
}
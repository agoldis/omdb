import { h, Component } from 'preact'
import Router from 'preact-router'
import SearchPanel from './SearchPanel'
import { CurrentItemLoader, CurrentItem } from 'app/CurrentItem'

export default class Root extends Component {
  state = {
    currentItem: null
  }

  setCurrentItem = (item) => {
    this.setState({
      currentItem: item
    })
  }

  render ({}, { currentItem }) {
    return <div>
      <SearchPanel />
      <CurrentItem currentItem={currentItem} />
      <Router>
        <div path='/'></div>
        <CurrentItemLoader path='/item/:id' setCurrentItem={this.setCurrentItem} />
      </Router>
    </div>
  }
}
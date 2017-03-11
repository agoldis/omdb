import { h, Component } from 'preact'
import { omdb } from 'app/API/'
import { apiEvents } from 'app/utils'

import { SearchInput } from 'app/Search'
import { ResultsList, Paginate } from 'app/Results'

export default class Root extends Component {
  state = {
    options: [],
    overallResults: 0,
    currentPage: 1,
    currentSearch: ''
  }

  handleAPINewResults = ({results, overallResults, page}) => this.setState({options: results, overallResults, currentPage: page})

  componentWillMount () {
    apiEvents.on('newResults', this.handleAPINewResults)
  }

  componentWillUnmount () {
    apiEvents.off('newResults', this.handleAPINewResults)
  }

  onTextChange = value => {
    this.setState({
      currentSearch: value,
      currentPage: 1,
      overallResults: 0
    })
    omdb.getItems(value)
  }

  onPageChanged = (nextPage) => {
    const valueToSearch = this.state.currentSearch
    omdb.getItems(valueToSearch, nextPage)
  }

  render ({ }, { options, ...other }) {
    const autoselectOptions = options.map(item => item.Title)
    
    return <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
        <SearchInput options={autoselectOptions} onTextChange={this.onTextChange} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'lightgray' }}>
        <Paginate onPageChanged={this.onPageChanged} {...other}>
          <ResultsList results={options} />
        </Paginate>
      </div>
    </div>
  }
}
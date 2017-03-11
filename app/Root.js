import { h, Component } from 'preact'
import { omdb } from 'app/API/'
import { apiEvents } from 'app/utils'

import { SearchInput } from 'app/Search'
import { ResultsList } from 'app/Results'

export default class Root extends Component {
  state = {
    options: []
  }

  handleAPINewResults = ({results}) => this.setState({options: results})

  componentWillMount () {
    apiEvents.on('newResults', this.handleAPINewResults)
  }

  componentWillUnmount () {
    apiEvents.off('newResults', this.handleAPINewResults)
  }

  onTextChange = value => {
    omdb.getItems(value)
  }

  render ({ }, { options }) {
    const autoselectOptions = options.map(item => item.Title)
    return <div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
        <SearchInput options={autoselectOptions} onTextChange={this.onTextChange} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'lightgray' }}>
        <ResultsList results={options} />
      </div>
    </div>
  }
}
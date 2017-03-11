import { h, Component } from 'preact'
import SuggestionsList from './SuggestionsList'

const defaultState = {
  input: ''
}

export default class SearchInput extends Component {
  state = {...defaultState}

  static defaultProps = {
    options: []
  }

  onKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        this.setState({ input: defaultState.input })
        break;
    }
  }

  handleInput = ({ target }) => {
    const {
      onTextChange
    } = this.props

    this.setState({
      input: target.value
    })
    onTextChange(target.value)
  }

  filter = item => {
    const {
      input
    } = this.state
    const regex = new RegExp(input)
    return item.toLowerCase().indexOf(input) >= 0
  }

  render ({ options }, { input }) {
    const itemsList = options.filter(this.filter)

    return (
      <div>
        <div>
        <label>Search for your movie</label>
        <input
          type='text'
          value={input}
          onKeyDown={this.onKeyDown}
          onInput={this.handleInput}
        />
        </div>
        <SuggestionsList itemsList={itemsList} />
      </div>
    )
  }
}
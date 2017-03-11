import { h, Component } from 'preact'
import SuggestionsList from './SuggestionsList'
import fuzzy from 'fuzzy'

const styles = {
  input: {
    fontFamily: 'Helvetica Neue',
    fontSize: '14px',
    height: '25px',
    minWidth: '70vw'
  },
  label: {
    fontFamily: 'Helvetica Neue',
    color: 'skyblue',
    paddingBottom: '5px'
  }
}
const defaultState = {
  searchValue: '',
  displayValue: '',
  selectionIndex: 0,
  itemsList: []
}

export default class SearchInput extends Component {
  state = {...defaultState}

  static defaultProps = {
    options: []
  }

  selectNext = () => {
    const {
      itemsList,
      selectionIndex
    } = this.state

    let newIndex = selectionIndex + 1
    if (newIndex >= itemsList.length) {
      newIndex = 0
    }
    this.setState({
      selectionIndex: newIndex,
      displayValue: itemsList[newIndex].original
    })
  }

  selectPrev = () => {
    const {
      itemsList,
      selectionIndex
    } = this.state

    let newIndex = selectionIndex - 1
    if (newIndex < 0) {
      newIndex = itemsList.length > 0 ? itemsList.length - 1 : 0
    }
    this.setState({
      displayValue: itemsList[newIndex].original,
      selectionIndex: newIndex
    })
  }

  onKeyDown = (e) => {
    const key = e.key
    console.log(key)
    switch (key) {
      case 'Escape':
        this.setState({...defaultState})
        break;
      case 'Enter':
        this.setState({
          itemsList: []
        })
        break;
      case 'ArrowDown':
        e.preventDefault()
        this.selectNext()
        break;
      case 'ArrowUp':
        e.preventDefault()
        this.selectPrev()
        break;
    }
  }

  handleInput = ({ target }) => {
    const {
      onTextChange
    } = this.props

    this.setState({
      searchValue: target.value,
      displayValue: target.value,
      selectionIndex: defaultState.selectionIndex
    })

    onTextChange(target.value)
  }

  filter = options => {
    const {
      searchValue
    } = this.state

    const fuzzyOptions = { pre: '<b>', post: '</b>' };
    const itemsList = fuzzy.filter(searchValue, options, fuzzyOptions)
    this.setState({ itemsList })
  }

  componentWillReceiveProps ({options}) {
    this.filter(options)
  }

  render ({ options }, { selectionIndex, itemsList, displayValue }) {
    return (
      <div>
        <div>
          <div style={styles.label}>Search for your movie</div>
          <input
            style={styles.input}
            type='text'
            value={displayValue}
            onKeyDown={this.onKeyDown}
            onInput={this.handleInput}
          />
        </div>
        <SuggestionsList
          itemsList={itemsList.map(res => res.string)}
          selectionIndex={selectionIndex}
        />
      </div>
    )
  }
}
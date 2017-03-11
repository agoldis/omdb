import { h, Component } from 'preact'

export default class SuggestionsList extends Component {
  render () {
    const {
      itemsList
    } = this.props

    if (itemsList.length === 0) {
      return null
    }

    return (
      <div>
        {itemsList.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    )
  }
}
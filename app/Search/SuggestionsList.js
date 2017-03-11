import { h, Component } from 'preact'
import SuggestionItem from './SuggestionItem'

const styles = {
  resultsList: {
    border: '1px solid lightgrey'
  }
}
export default class SuggestionsList extends Component {
  render ({ itemsList, selectionIndex }) {
    if (itemsList.length === 0) {
      return null
    }

    return (
      <div style={styles.resultsList}>
        {itemsList.map((item, index) => <SuggestionItem key={index} selected={selectionIndex === index} item={item} />)}
      </div>
    )
  }
}
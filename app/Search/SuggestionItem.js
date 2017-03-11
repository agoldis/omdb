import { h } from 'preact'

const styles = {
  selected: {
    color: 'red'
  }
}
export default function SuggestionItem ({ item, selected, searchValue }) {
  return <div style={selected ? styles.selected : null} dangerouslySetInnerHTML={{__html: item }}></div>
}

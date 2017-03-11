import { h } from 'preact'

const styles = {
  selected: {
    color: 'black',
    backgroundColor: 'lightgrey'
  },
  item: {
    color: 'grey',
    padding: '5px 10px',
  }
}

export default function SuggestionItem ({ item, selected, searchValue }) {
  const style = selected ? {...styles.item, ...styles.selected } : {...styles.item}
  return <div style={style} dangerouslySetInnerHTML={{__html: item }}></div>
}

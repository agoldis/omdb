import { h, Component } from 'preact'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    margin: '10px'
  }
}

export default class ResultsList extends Component {
  render ({results}) {
    return (
      <div style={styles.wrapper}>
        {results.map((r, index) => <div key={index} style={styles.item}>
            <img src={r.Poster} />
            <div><b>{r.Title}</b></div>
            <div>Year: {r.Year}</div>
            <div>Type: {r.Type}</div>
          </div>)}
      </div>
    )
  }
}
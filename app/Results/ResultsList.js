import { h, Component } from 'preact'
import EmptyPoster from './EmptyPoster'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    margin: '10px',
    maxWidth: '25vw'
  }
}

export default class ResultsList extends Component {
  render ({results}) {
    return (
      <div style={styles.wrapper}>
        {results.map((r, index) => {
          let image = <img src={r.Poster} />
          if (r.Poster === 'N/A') {
            image = <EmptyPoster />
          }
          return <div key={index} style={styles.item}>
            {image}
            <div><b>{r.Title}</b></div>
            <div>Year: {r.Year}</div>
            <div>Type: {r.Type}</div>
          </div>
        })}
      </div>
    )
  }
}
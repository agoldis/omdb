import { h, Component } from 'preact'
import EmptyPoster from './EmptyPoster'
import { route } from 'preact-router'
const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    margin: '10px',
    backgroundColor: 'white',
  },
  next: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  prev: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}

export default class ResultsList extends Component {
  state = {
    selected: null
  }

  renderNext = () => {
    const { pagination } = this.props
    const { showNext, onNextClicked } = pagination

    if (showNext) {
      return <div onClick={onNextClicked} style={styles.next}>next</div>
    } else {
      return null
    }
  }

  renderPrev = () => {
    const { pagination } = this.props
    const { showPrev, onPrevClicked } = pagination

    if (showPrev) {
      return <div onClick={onPrevClicked} style={styles.prev}>prev</div>
    } else {
      return null
    }
  }

  showDetails (itemId) {
    route(`/item/${itemId}`);
  }

  render ({results, pagination}, { selected }) {
    return (
      <div style={{position: 'relative'}}>
        {this.renderPrev()}
        <div style={styles.wrapper}>
          {results.map((r, index) => {
            let image = <img src={r.Poster} />
            if (r.Poster === 'N/A') {
              image = <EmptyPoster />
            }
            return <div key={index} style={styles.item} onClick={this.showDetails.bind(null, r.imdbID)}>
              {image}
              <div><b>{r.Title}</b></div>
              <div>Year: {r.Year}</div>
              <div>Type: {r.Type}</div>
            </div>
          })}
        </div>
        {this.renderNext()}
      </div>
    )
  }
}
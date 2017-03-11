import { h, Component } from 'preact'
import { route } from 'preact-router'
import { apiEvents } from 'app/utils'

const styles = {
  base: {
    position: 'fixed',
    width: '80vw',
    top: '50%',
    left: '10%',
    minHeight: '300px',
    zIndex: 3,
    backgroundColor: 'white',
    transition: 'transform 300ms',
    willChange: 'transform'
  },
  shown: {
    transform: 'scale(1, 1)'
  },
  hidden: {
    transform: 'scale(0, 0)'
  },
  close: {
    position: 'absolute',
    top: '-30px',
    right: 0,
    padding: '5px',
    cursor: 'pointer'
  },
  details: {
    padding: '10px'
  },
  title: {
    fontSize: '18px',
    fontWeigth: 600
  }
}

export default class CurrentItem extends Component {
  state = {
    open: false
  }

  setCurrentItem = (item) => {
    if (!item) {
      this.setState({
        currentItem: null
      })
    } else {
      omdb.getItem(item.imdbID)
      .then(fullItem => {
        this.setState({
          currentItem: {...fullItem, imdbID: item.imdbID}
        })
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.currentItem && !this.state.open) {
      this.setState({
        open: true
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.open && !nextProps.currentItem) {
      this.setState({
        open: false
      })
    }
  }

  renderItem = () => {
    const {
      currentItem
    } = this.props
    return <div style={{ display: 'flex' }}>
      <img src={currentItem.Poster} />
      <div style={styles.details}>
        <div style={styles.title}>{currentItem.Title}</div>
        <div>Year: {currentItem.Year}</div>
        <div>Type: {currentItem.Type}</div>
        <div>Rated: {currentItem.Rated}</div>
        <div>Released: {currentItem.Released}</div>
        <div>Runtime: {currentItem.Runtime}</div>
        <div>Language: {currentItem.Language}</div>
        <div>Director: {currentItem.Director}</div>
        <div>Writers: {currentItem.Writers}</div>
        <div>Actors: {currentItem.Actors}</div>
        <div>Plot: {currentItem.Plot}</div>
      </div>
    </div>
  }

  showList () {
    route('/') 
  }

  render ({currentItem}, {}) {
    const style = this.state.open ? {...styles.base, ...styles.shown} : {...styles.base, ...styles.hidden}

    return <div style={style}>
      <div onClick={this.showList} style={styles.close}>X</div>
      {currentItem ? this.renderItem() : null}
    </div>
  }
}

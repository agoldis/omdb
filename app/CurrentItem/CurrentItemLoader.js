import { h, Component } from 'preact'
import { omdb } from 'app/API'

export default class CurrentItemLoader extends Component {
  componentWillMount () {
    const {
      setCurrentItem,
      id
    } = this.props
    
    omdb.getItem(id)
    .then(setCurrentItem)
  }

  componentWillUnmount () {
    const {
      setCurrentItem
    } = this.props

    setCurrentItem(null)
  }
}

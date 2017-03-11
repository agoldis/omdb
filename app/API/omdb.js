import debounce from 'lodash/debounce'
import { agent } from 'app/utils'
import { apiEvents } from 'app/utils'

import {
  DEBOUNCE_USER_INPUT
} from 'app/config'

class OmdbAPI {
  static baseURL = 'http://www.omdbapi.com'

  _getItems (value) {
    return agent
      .get(OmdbAPI.baseURL)
      .query({
        s: value,
        r: 'json'
      })
      .end()
      .then(({ body, Response }) => {
        if (body.Response === 'True') {
          return body.Search
        } 
        return []
      })
      .then(results => apiEvents.emit('newResults', {results}))
  }
}

OmdbAPI.prototype.getItems = debounce(OmdbAPI.prototype._getItems, DEBOUNCE_USER_INPUT)

export default new OmdbAPI
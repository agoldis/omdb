import debounce from 'lodash/debounce'
import { agent } from 'app/utils'
import { apiEvents } from 'app/utils'

import {
  DEBOUNCE_USER_INPUT
} from 'app/config'

class OmdbAPI {
  static baseURL = 'http://www.omdbapi.com'

  _getItems (value, page = 1) {
    return agent
      .get(OmdbAPI.baseURL)
      .query({
        page,
        s: value,
        r: 'json'
      })
      .end()
      .then(({ body, Response }) => {
        if (body.Response === 'True') {
          return {
            results: body.Search,
            overallResults: body.totalResults
          }
        } 
        return {
          results: [],
          overallResults: 0
        }
      })
      .then(({results, overallResults}) => apiEvents.emit('newResults', {
          page,
          results,
          overallResults: parseInt(overallResults)
        })
      )
  }
}

OmdbAPI.prototype.getItems = debounce(OmdbAPI.prototype._getItems, DEBOUNCE_USER_INPUT)

export default new OmdbAPI
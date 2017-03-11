import { h, Component, cloneElement } from 'preact'

import { RESULTS_PER_PAGE } from 'app/config'

export default class PaginateResult extends Component {
  onPrevClicked = () => {
    const {
      onPageChanged,
      currentPage
    } = this.props

    const nextPage = currentPage - 1
    onPageChanged(nextPage)
  }

  onNextClicked = () => {
    const {
      onPageChanged,
      currentPage
    } = this.props

    const nextPage = currentPage + 1
    onPageChanged(nextPage)
  }

  getStatus = () => {
    const {
      overallResults,
      currentPage
    } = this.props

    if (overallResults === 0) {
      return {
        overallResults,
        start: 0,
        end: 0
      }
    }
    return {
      overallResults,
      start: (currentPage - 1) * RESULTS_PER_PAGE + 1,
      end: currentPage * RESULTS_PER_PAGE
    }
  }

  render ({ overallResults, currentPage, children }) {
    const paginationStatus = this.getStatus()

    const overallPages = Math.ceil(overallResults / RESULTS_PER_PAGE)
    const showPrev = currentPage !== 1 && overallResults > 0
    const showNext = currentPage < overallPages && overallResults > 0

    const passdownProps = {
      onNextClicked: this.onNextClicked,
      onPrevClicked: this.onPrevClicked,
      showNext,
      showPrev,
      ...paginationStatus
    }

    return cloneElement(children[0], {pagination: passdownProps})
  }
}
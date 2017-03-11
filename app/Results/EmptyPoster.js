import { h } from 'preact'
export default function EmptyPoster () {
  return (
    <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" x="0px"
      y="0px" width="300px" height="450px" viewBox="0 0 300 450" enable-background="new 0 0 300 450">
      <rect x="0" y="0" fill="#F8F8F8" width="300" height="450"/>
      <path stroke="grey" stroke-width='4px' fill="transparent" d="M 120 200 l 50 50" stroke-linecap="round" />
      <path stroke="grey" stroke-width='4px' fill="transparent" d="M 120 250 l 50 -50" stroke-linecap="round" />
    </svg>
  )
}

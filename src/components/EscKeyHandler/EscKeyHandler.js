import { Component } from 'react'

class EscKeyHandler extends Component {
  componentDidMount() {
    document.addEventListener('keyup', this.onKeyup, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyup, false)
  }

  onKeyup = event => {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.props.onClick()
    }
  }

  render() {
    return null
  }
}

export default EscKeyHandler

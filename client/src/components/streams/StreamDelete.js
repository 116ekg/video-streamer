import React from 'react'
import Modal from '../Modal'
import history from '../../history'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  handleDelete = () => {
    this.props.deleteStream(this.props.match.params.id)
  }

  renderActions = () => {
    if (!this.props.stream) {
      return null
    }
    return (
      <>
        <Link to='/' className='ui button'>Cancel</Link>
        <button className='ui button negative' onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  renderContent = () => {
    if (!this.props.stream) {
      return 'Loading...'
    }
    return `Are you sure you want to delete the stream titled: ${this.props.stream.title}`
  }

  render() {
    console.log(this.props)

    return (
      <Modal
        title={'Delete Stream'} 
        content={this.renderContent()} 
        actions={this.renderActions()} 
        onDismiss={() => history.push('/')}
      />
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
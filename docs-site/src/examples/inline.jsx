import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-hijri'

export default React.createClass({
  displayName: 'Inline',

  getInitialState () {
    return {
      startDate: moment()
    }
  },

  handleChange (date) {
    this.setState({
      startDate: date
    })
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker'}<br />
              {'inline'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
})

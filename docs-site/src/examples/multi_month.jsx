import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-hijri'

export default React.createClass({
  displayName: 'MultiMonth',

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
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br/>
              {'monthsShown={2} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            monthsShown={2}
            onChange={this.handleChange}
            selected={this.state.startDate} />
      </div>
    </div>
  }
})

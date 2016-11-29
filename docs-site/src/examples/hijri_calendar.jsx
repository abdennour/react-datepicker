import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment-hijri'

class HijriCalendar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({startDate: date})
  }

  render () {
    return <div className="row">
      <pre className="column example__code">
         <code className="jsx">
           {'<DatePicker'}<br />
               <strong>{'calendar="hijri"'}</strong><br />
               <strong>{'dateFormat="YYYY/MM/DD"'}</strong><br />
               {'selected={this.state.startDate}'}<br />
               {'onChange={this.handleChange} />'}
         </code>
       </pre>
      <div className="column">
        <DatePicker calendar="hijri" dateFormat="YYYY/MM/DD"  selected={this.state.startDate}
            onChange={this.handleChange}/>
      </div>
    </div>
  }

}

HijriCalendar.displayName = 'HijriCalendar'
export default HijriCalendar

import moment from 'moment-hijri'

const capitalize = (string = '') => [...string].map(    // convert to array with each item is a char of string by using spread operator (...)
  (char, index) => index ? char : char.toUpperCase()  // index true means not equal 0 , so (!index) is the first char which is capitalized by `toUpperCase()` method
 ).join('')                                             // return back to string

export function isSameDay (moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day')
  } else {
    return !moment1 && !moment2
  }
}

export function isDayInRange (day, startDate, endDate) {
  const before = startDate.clone().startOf('day').subtract(1, 'seconds')
  const after = endDate.clone().startOf('day').add(1, 'seconds')
  return day.clone().startOf('day').isBetween(before, after)
}

export function isDayDisabled (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) {
  return (minDate && day.isBefore(minDate, 'day')) ||
    (maxDate && day.isAfter(maxDate, 'day')) ||
    (excludeDates && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
}

export function allDaysDisabledBefore (day, unit, { minDate, includeDates } = {}) {
  const dateBefore = day.clone().subtract(1, unit)
  return (minDate && dateBefore.isBefore(minDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) ||
    false
}

export function allDaysDisabledAfter (day, unit, { maxDate, includeDates } = {}) {
  const dateAfter = day.clone().add(1, unit)
  return (maxDate && dateAfter.isAfter(maxDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) ||
    false
}

export function getEffectiveMinDate ({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day')))
  } else if (includeDates) {
    return moment.min(includeDates)
  } else {
    return minDate
  }
}

export function getEffectiveMaxDate ({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day')))
  } else if (includeDates) {
    return moment.max(includeDates)
  } else {
    return maxDate
  }
}

function defaultYearsRange (calendar) {
  return (calendar === 'hijri' ) ? ({min: 1300, max: 1500}):({min: 1900, max: 2100})
}
/**
* @param defaultMethod is on of 'date', 'month' or 'year'
* @param calendar is "hijri" or something else
*
* @return 'iDate','iMonth','iYear' if calendar='hijri'
*/
export function methodByCalendar (defaultMethod, calendar) {
  return ( calendar === 'hijri' ) ? `i${capitalize(defaultMethod)}` : defaultMethod
}

export function minYearByCalendar (minDate, calendar) {
  return minDate ? minDate[methodByCalendar('year', calendar)]() : defaultYearsRange().min
}

export function maxYearByCalendar (maxDate, calendar) {
  return maxDate ? maxDate[methodByCalendar('year', calendar)]() : defaultYearsRange().max
}

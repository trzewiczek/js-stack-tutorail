import { createStore } from 'redux'
import { reducer } from './reducer'
import { addTravel, removeTravel, rescheduleTravel } from './actions'

const store = createStore(reducer)

console.log('Right after store creation')
console.log(store.getState())

store.dispatch(addTravel(1, 'North Wales, UK', '2017-09-16'))
store.dispatch(addTravel(2, 'Mar-A-Lago, FL', '2021-01-20'))
store.dispatch(addTravel(3, 'Silesia, PL', '2018-06-01'))

console.log('After adding three travels')
console.log(store.getState())

store.dispatch(removeTravel(2))

console.log('After removing trip to Mar-A-Lago')
console.log(store.getState())

store.dispatch(rescheduleTravel(3, '2017-12-31'))

console.log('After rescheduling trip to Poland')
console.log(store.getState())

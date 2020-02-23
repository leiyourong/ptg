import { connect } from 'react-redux'
import { addNum } from './remember/action/index'
import Home from './home'

const mapStateToProps = (state) => {
  return {
    num: state.nums.num
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNum: (num) => dispatch(addNum(num))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

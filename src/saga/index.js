import { call, put } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'
import { getBooks, addBook } from '../services/index'

function* getItem(payload) {
  try {
    // call阻塞 fork不阻塞 cancel 取消fork的saga
    // call[..., ...] race只取快的
    const data = yield call(getBooks, payload)
    yield put({ type: 'GET_ITEM', data })
  } catch (error) {
    yield put({ type: 'GET_ITEM_ERROR' })
  }
}

function* addItem(payload) {
  const data = yield call(addBook, payload)
  yield put({ type: 'ADD_ITEM', data })
}

function* watchFetchRequests() {
  // take 只监听一次 
  yield takeLatest('GET_ITEM_REQUEST', getItem)
  yield takeEvery('ADD_ITEM_REQUEST', addItem)
}

export default function* rootSaga() {
  yield watchFetchRequests()
}

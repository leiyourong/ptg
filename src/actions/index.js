export const DETELE_ITEM = 'DETELE_ITEM'

export function deleteItem (payload) {
  return {
    type: DETELE_ITEM,
    payload
  }
}

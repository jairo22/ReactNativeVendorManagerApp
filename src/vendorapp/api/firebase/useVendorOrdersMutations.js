import {
  accept as acceptAPI,
  onDelete as onDeleteAPI,
  reject as rejectAPI,
} from './FirebaseOrdersClient'

const useVendorOrdersMutations = () => {
  const accept = order => {
    return acceptAPI('restaurant_orders',order)
  }

  const onDelete = orderID => {
    return onDeleteAPI('restaurant_orders',orderID)
  }

  const reject = order => {
  
    return rejectAPI('restaurant_orders',order)
  }

  return { accept, onDelete, reject }
}

export default useVendorOrdersMutations

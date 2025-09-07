import firestore from '@react-native-firebase/firestore'

const vendorOrdersTableName = 'restaurant_orders'

export const subscribeToVendorOrders = (
  vendorOrdersTableName,
  viewer,
  callback,
) => {
  // The current user (viewer) is the admin of a vendor, so they can manage all the orders placed for that vendor
  const ref = firestore()
    .collection('restaurant_orders')
    .where('vendorID', '==', viewer.vendorID)
    .orderBy('createdAt', 'desc')

    console.log(vendorOrdersTableName)

  return ref.onSnapshot(
    querySnapshot => {
      const orders = []
      querySnapshot?.forEach(doc => {
        const order = doc.data()
        orders.push({
          id: doc.id,
          ...order,
        })
      
      })
  
      callback?.(orders)
    },
    error => {
      console.warn(error)
    },
  )
}

export const accept = async (vendorOrdersTableName, order) => {
  return firestore()
    .collection('restaurant_orders')
    .doc(order.id)
    .update({ status: 'Order Accepted' })
}

export const reject = async (vendorOrdersTableName, order) => {
try{
  return firestore()
    .collection('restaurant_orders')
    .doc(order.id)
    .update({ status: 'Order Rejected' })

  }catch(error){
    console.log("Error Fetching data ",error);
}
}

export const onDelete = (vendorOrdersTableName, orderID) => {
  firestore()
    .collection('restaurant_orders')
    .doc(orderID)
    .delete()
    .then(result => console.warn(result))
}

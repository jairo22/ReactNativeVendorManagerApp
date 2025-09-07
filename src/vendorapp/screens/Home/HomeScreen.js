import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations, Button } from '../../../core/dopebase'
import dynamicStyles from './styles'
import Hamburger from '../../../components/Hamburger/Hamburger'
import { useVendorOrders, useVendorOrdersMutations } from '../../api'

function HomeScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const currentUser = useSelector(state => state.auth.user)

  const { orders } = useVendorOrders(currentUser)
  const { accept, reject } = useVendorOrdersMutations()

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: localized('Gestionar Pedidos'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer()
          }}
        />
      ),
    })
  })



  const onAccept = order => {
    accept(order)
  }

  const onReject = order => {
    
    reject(order)
  }



  const renderItem = ({ item }) => {
    const address = item.address
    const addressText = localized('Enviar a: ')
    return (
      <View style={styles.container}>
        <View>
          {item != null &&
            item.products != null &&
            item.products[0] != null &&
            item.products[0].photo != null &&
            item.products[0].photo.length > 0 && (
              <Image
                placeholderColor={theme.colors[appearance].grey9}
                style={styles.photo}
                source={{ uri: item.products[0].photo }}
              />
            )}
          <View style={styles.overlay} />
          <Text style={styles.address}>
            {`${addressText} ${address?.line1} ${address?.line2} ${address?.city} ${address?.postalCode}`}
          </Text>
        </View>
        {item.products.map(product => {
          return (
            <View style={styles.rowContainer} key={product.id}>
              <Text style={styles.count}>{product.quantity}</Text>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          )
        })}
        <View style={styles.actionContainer}>
          <Text style={styles.total}>
            {localized('Total: $')}
            {item.products
              .reduce((prev, next) => prev + next.price * next.quantity, 0)
              .toFixed(2)}
          </Text>
          {item.status === 'Order Placed' ? (
            <View style={styles.buttonsContainer}>
              <Button
                containerStyle={styles.actionButtonContainer}
                textStyle={styles.actionButtonText}
                onPress={() => onAccept(item)}
                text={localized('Aceptar')}></Button>
              <Button
                containerStyle={styles.rejectButtonContainer}
                textStyle={styles.rejectButtonText}
                onPress={() => onReject(item)}
                text={localized('Rechazar')}></Button>
            </View>
          ) : (
            <Text style={styles.statusText}>{item.status}</Text>
          )}
        </View>
      </View>
    )
  }
  return (
    <FlatList
      style={styles.screenContainer}
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      initialNumToRender={5}
    />
  )
}

export default HomeScreen
import React, { useLayoutEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { ListItem } from 'react-native-elements'
import { useActionSheet } from '@expo/react-native-action-sheet'
import {
  useTheme,
  useTranslations,
  EmptyStateView,
} from '../../../core/dopebase'
import dynamicStyles from './styles'
import { useSelector } from 'react-redux'
import {
  useVendorProducts,
  useSingleVendorCategories,
  useVendorProductsMutations,
} from '../../api'
import Hamburger from '../../../components/Hamburger/Hamburger'
import { AddProductView } from '../../components/AddProduct/AddProductView'

function ProductListScreen(props) {
  const { navigation } = props

  const currentUser = useSelector(state => state.auth.user)

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { showActionSheetWithOptions } = useActionSheet()

  const emptyStateConfig = {
    title: localized('Sin productos'),
    description: localized(
      'Actualmente no hay productos. Tus productos aparecerán aquí una vez que los agregues.',
    ),
  }

  const [refreshing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { loading, products } = useVendorProducts(currentUser.vendorID)
  const { categories } = useSingleVendorCategories()
  const { addProduct, deleteProduct, updateProduct } =
    useVendorProductsMutations()

  const showActionSheet = async index => {
    showActionSheetWithOptions(
      {
        title: `seguro quieres eliminar ${itemToDelete?.name}?`,
        options: [
          localized('Quitar Producto'),
          localized('Cancelar'),
          localized('Editar Producto'),
        ],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      index => {
        if (index == 0) {
          onDeleteProduct()
          return
        }
        if (index == 2) {
          setSelectedProduct(itemToDelete)
        }
      },
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Tus Productos'),
      headerRight: () => (
        <TouchableOpacity onPress={onOpenModal}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/create.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer()
          }}
        />
      ),
    })
  }, [navigation])

  const onOpenModal = () => {
    setSelectedProduct(null)
    setItemToDelete(null)
    setIsVisible(true)
  }

  const onAddProduct = product => {
    addProduct({
      vendorID: currentUser.vendorID,
      ...product,
    })
  }

  const onUpdate = product => {
    updateProduct(product)
  }

  const onDeleteProduct = () => {
    if (itemToDelete) {
      deleteProduct(itemToDelete.id, () => setItemToDelete(null))
    }
  }

  const onCancel = () => {
    setIsVisible(false)
    setSelectedProduct(null)
    setItemToDelete(null)
  }

  const onPress = product => {
    setSelectedProduct(product)
  }

 
  const renderProduct = ({ item }) => {
    return (
      <>
        <ListItem
          containerStyle={styles.productContainerStyle}
          onPress={() => onPress(item)}
          onLongPress={() => {
            setItemToDelete(item)
            showActionSheet()
          }}>
          <View style={styles.leftItemContainer}>
            <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.title}>
              <View style={styles.subtitleView}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </ListItem.Subtitle>
          </View>
          <Image style={styles.rightIcon} source={{ uri: item.photo }} />
        </ListItem>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {products.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <EmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
      {(isVisible || selectedProduct) && (
        <AddProductView
          onCancel={onCancel}
          categoryData={categories}
          addProduct={onAddProduct}
          initialProduct={selectedProduct}
          onUpdate={onUpdate}
        />
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ProductListScreen

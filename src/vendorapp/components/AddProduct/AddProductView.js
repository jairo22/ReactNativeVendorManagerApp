import React, { useEffect, useState } from 'react'
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity, 
  ScrollView,
  PermissionsAndroid, 
  Platform,
  Alert,
} from 'react-native'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  Button,
} from '../../../core/dopebase'
import dynamicStyles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import { Image } from 'expo-image'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { storageAPI } from '../../../core/media'
import ModalSelector from 'react-native-modal-selector'
import { useConfig } from '../../../config'


export function AddProductView(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const { initialProduct, categoryData } = props

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState({ title: localized('Select...') })
  const [price, setPrice] = useState('10')
  const [localPhotos, setLocalPhotos] = useState([])
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const { showActionSheetWithOptions } = useActionSheet()

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setDescription(initialProduct.description)
      setUploadedPhotos(initialProduct.photos)
      setPrice(initialProduct.price)
    }
  }, [])

  useEffect(() => {
    if (initialProduct && !config.isMultiVendorEnabled) {
      setCategory(
        categoryData.find(
          category => initialProduct.categoryID === category.id,
        ),
      )
    }
  }, [categoryData])

  const onPressAddPhotoBtn =() => {

    const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    const hasPermission =  PermissionsAndroid.check(permission);
    if (hasPermission) {/*
      Alert.alert('Alert Title', 'My Alert Msg', [

        
    

        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},


      ]);*/
    
      const options = {
        title: localized('Selecciona una foto'),
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      }
  
      ImagePicker.openPicker({
        cropping: false,
        multiple: false,
      })
        .then(response => {
          localPhotos.forEach(uri => {
         /*   if(localPhotos.uri=null){  Jairo Extra code */
              localPhotos.uri=localPhotos.path
         /*   }  */
          });
          
          console.log(localPhotos)
          setLocalPhotos([...localPhotos, response])
        })
        .catch(function (error) {
          console.log(error)
        })
    
    }
/*
    // More info on all the options is below in the API Reference... just some common use cases shown here
    */
  }

  const onRemoveLocalPhoto = index => {
    if (index == 0) {
      var array = [...localPhotos]
      array.splice(selectedPhotoIndex, 1)
      setLocalPhotos(array)
    }
  }

  const showActionSheet = async index => {
    await setSelectedPhotoIndex(index)

    showActionSheetWithOptions(
      {
        title: '',
        options: [localized('quitar foto'), localized('Cancelar')],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      index => {
        onRemoveLocalPhoto(index)
      },
    )
  }
 
  const photos = localPhotos.map((photo, index) => (
 <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index)
      }}>
      <Image style={styles.photo} source={{ uri: photo?.path  /*photo?.sourceURL*/ }} />
    </TouchableOpacity>
  ))
 
  const onlinePhotos = uploadedPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index)
      }}>
      <Image style={styles.photo} source={{ uri: photo }} />
    </TouchableOpacity>
  ))

  const onCancel = () => {
    props.onCancel()
  }

  const onPost = () => {
    if (!name) {
      alert(localized('Escribe un titulo.'))
      return
    }
    if (!description) {
      alert(localized('Escribe una descripción.'))
      return
    }
    if (!price) {
      alert(localized('Precio vacío.'))
      return
    }
    if (localPhotos?.length == 0 && uploadedPhotos?.length == 0) {
      alert(localized('Escoge al menos una foto.'))
      return
    }
    setLoading(true)

    let photoUrls = [...uploadedPhotos]
   
    const uploadPromiseArray = []
    localPhotos.forEach(file => {
      if(file?.uri == null){file.uri = file.path}
      if (!file?.uri?.startsWith('https://')) 
        uploadPromiseArray.push(
          new Promise((resolve, reject) => { 
            storageAPI.processAndUploadMediaFile(file).then(
              response => {
                if (response.downloadURL) {
                  photoUrls.push(response.downloadURL)
                }
                console.log(response) 
                resolve()

              },
              error => {
                
                console.log('promise')
                reject()
              },
            )
          }),
        )
    
    })

    
   
    Promise.all(uploadPromiseArray)
      .then(values => {
        var uploadObject = {
          name: name,
          price: price,
          photo: photoUrls.length > 0 ? photoUrls[0] : null,
          photos: photoUrls,
          description,
        }
       
        if (!config.isMultiVendorEnabled) {
          uploadObject.categoryID = category.id
        }
        if (initialProduct) {
          props.onUpdate({
            id: initialProduct.id,
            ...uploadObject,
          })
        } else {
          props.addProduct(uploadObject)
        }
        onCancel()
        setLoading(false)
      })
      .catch(reason => {
        onCancel()
        console.log('reason')
        console.log(reason)
        setLoading(false)
        alert(reason)
      })
  }

  return (
    <Modal
      visible={props.isVisible}
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={[styles.bar, styles.navBarContainer]}>
        <Text style={styles.headerTitle}>{localized('Agregar Producto')}</Text>
        <Button
          containerStyle={[styles.rightButton, styles.selectorRightButton]}
          textStyle={styles.rightButtonText}
          onPress={onCancel}
          text={localized('Cancelar')}
        />
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Titulo')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{localized('Descripción')}</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            onChangeText={text => setDescription(text)}
            value={description}
            placeholder="Start typing"
            placeholderTextColor={theme.colors[appearance].grey6}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{localized('Precio')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(text)}
              placeholderTextColor={theme.colors[appearance].grey6}
              underlineColorAndroid="transparent"
            />
          </View>
          {!config.isMultiVendorEnabled && (
            <ModalSelector
              touchableActiveOpacity={0.9}
              data={categoryData}
              sectionTextStyle={styles.sectionTextStyle}
              optionTextStyle={styles.optionTextStyle}
              optionContainerStyle={styles.optionContainerStyle}
              cancelContainerStyle={styles.cancelContainerStyle}
              cancelTextStyle={styles.cancelTextStyle}
              selectedItemTextStyle={styles.selectedItemTextStyle}
              backdropPressToClose={true}
              cancelText={localized('Cancelar')}
              initValue={category?.title ?? localized('Select...')}
              onChange={option => {
                setCategory({ id: option.id, title: option.title })
              }}>
              <View style={styles.row}>
                <Text style={styles.title}>{localized('Categoria')}</Text>
                <Text style={styles.value}>
                  {category?.title ?? localized('Select...')}
                </Text>
              </View>
            </ModalSelector>
          )}
          <Text style={styles.addPhotoTitle}>{localized('Agregar fotos')}</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            {photos}
            {onlinePhotos}
            <TouchableOpacity onPress={onPressAddPhotoBtn}>
              <View style={[styles.addButton, styles.photo]}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            containerStyle={styles.addButtonContainer}
            onPress={onPost}
            textStyle={styles.addButtonText}
            text={
              initialProduct
                ? localized('Actualizar Producto')
                : localized('Agregar Producto')
            }
          />
        )}
      </ScrollView>
    </Modal>
  )
}

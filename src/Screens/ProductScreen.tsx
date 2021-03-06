import React, { useContext, useEffect } from 'react'
import { View,Text,StyleSheet, ScrollView, TextInput, Button,Image} from 'react-native'
import { Picker } from '@react-native-community/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../Navigation/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({navigation, route} : Props) => {

    const {id = '', name = ''} = route.params;
    const {isLoading, categories} = useCategories();
    const {loadProductById, addProduct, updateProduct} = useContext(ProductsContext)

    const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    })


    useEffect(() => {
        navigation.setOptions({
            title: (nombre)
        })
    }, [nombre])

    useEffect(() => {
        loadProduct();
    }, [])

    const loadProduct = async () => {
        if(id.length === 0) return;
        const product = await loadProductById(id)
        // console.log({product})
        setFormValue(
            {_id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre}
        )
    }

    const saveOrUpdate = async () => {
        if(id.length > 0) {
            updateProduct(categoriaId, nombre, id)
            
        } else {
            const temp = categoriaId || categories[0]._id;
           const newProduct = await addProduct(temp, nombre)
           onChange(newProduct._id,'_id')
            
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Nombre del producto: </Text>
                <TextInput
                    placeholder="Producto"
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                <Text style={styles.label}>Categor??a: </Text>
                <Picker
                    selectedValue={categoriaId}
                    onValueChange={(itemValue: string) =>
                        onChange(itemValue, 'categoriaId')
                    }>
                    {
                        categories.map(c => (
                            <Picker.Item
                                label={c.nombre}
                                value={c._id}
                                key={c._id}
                            />
                        ))
                    }
                </Picker>

                <Button
                    title="Guardar"
                    onPress={saveOrUpdate}
                    color='#5856D6'
                />
                {
                    (_id.length > 0) && (
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                            <Button
                                title="C??mara"
                                onPress={() => {}}
                                color='#5856D6'
                            />
                            <View style={{marginRight: 10}}/>
                            <Button
                                title="Galer??a"
                                onPress={() => {}}
                                color='#5856D6'
                            />  
                        </View>
                    )
                }
                {
                    (img.length > 0 ) && (
                        <Image
                            source={{uri: img}}
                            style={{
                                marginTop: 20,
                                width: '100%', 
                                height: 300}}
                        />
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 10,
        marginHorizontal: 10,

    },
    label: {
        fontSize: 18
    },
    textInput:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 10
    }
});
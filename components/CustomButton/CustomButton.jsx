import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const CustomButton = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
        <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container :{
      paddingVertical : 15,
      paddingHorizontal : 20,
      backgroundColor : Colors.primaryLight,
      alignItems:'center',
      marginLeft:'auto',
      marginRight:'auto',
      borderRadius : 20,
    },
    text : {
      color : Colors.light
    },
})
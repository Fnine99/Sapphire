import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, useController, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  Platform,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';

import { theme } from 'theme';

// import Input from 'components/common/Imput';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import Icon from 'components/common/Icon';

import useAuth from 'hooks/useAuth';
import BackButton from 'components/common/BackButton';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("screen");

type User = {
  username: string,
  password: string
}

const Input = ({name, control, ...Props}:any) => {
  const { field } = useController({
    control,
    defaultValue:'',
    name
  })
  return (
    <TextInput 
      style={styles.textinput}
      onChangeText={field.onChange}
      value={field.value}
      {...Props} 
    />
  )
}

export default function Login() {

  const { firebaseEmailPasswordSignIn } = useAuth();
  // const { isLoggedIn, user } = useAuth();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();
  const onSubmit = async (data:any) => {
    const {username, password} = data;
    try {
      await firebaseEmailPasswordSignIn(username, password)
      // .then(setForm({...form, userPassword: null}));
    } catch (err) {
      console.error(err);
    }
  }
  const handleBackPress = () => {
    return navigation.goBack()
  }
  const handlePasswordLost = () => {
    return navigation.navigate('Email')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark'/>
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <View style={{flex:1, paddingHorizontal:20}}>
          <View style={{flexDirection:'row', paddingVertical:15, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.backbutton} onPress={handleBackPress}>
              <Icon type={'material'} name='chevron-left' size={25} color='#131313'/>
            </TouchableOpacity>
            <Text style={{color:'#131313', fontSize:18, fontWeight:'400'}}>
              Login
            </Text>
          </View>
          <View style={{top:40}}>
            <Text style={{color:'#240F51', fontSize:24, fontWeight:'bold', marginBottom: 4}}>Welcome back</Text>
            <Text style={{color:'#292B2D', fontSize:14, fontWeight:'300'}}>Hey you're back, fill in your details to get back in</Text>
          </View>
          <SafeAreaView style={{top:30 ,alignItems:'flex-end'}}>
            <View style={styles.input}>
              <Text style={styles.label}>Username</Text>
              <Input name={'username'} control={control} editable/>
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Password</Text>
              <Input name={'password'} control={control} editable secureTextEntry={true}/>
            </View>
            <TouchableOpacity onPress={handlePasswordLost}>
            <Text style={{ fontSize: 14, color: theme.background.primary, fontWeight:'400'}}>Forgot password?</Text>
            </TouchableOpacity> 
          </SafeAreaView>
        </View>
        <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
          <TouchableOpacity style={styles.submit} onPress={handleSubmit(onSubmit)}>
            <Text style={{ fontSize: 16, color:'#FFFFFF', fontWeight:'600'}}>Login</Text>
          </TouchableOpacity>
        </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:theme.background.secondary, flexDirection:'column'},
  backbutton:{position:'absolute', left:0, height:30, width:30, backgroundColor:'#FFFFFF', alignItems:'center', justifyContent:'center', borderRadius:25},
  input: {width:'100%', height:60, marginBottom:15, borderRadius:40, backgroundColor:'#FFFFFF', paddingHorizontal:20, paddingVertical:10},
  textinput: {flex:1, fontSize:14, fontWeight:'400', color:'#131313'},
  label: {color:'#7B8186', fontSize: 10},
  submit: {width:'40%', height:60, borderRadius:30, marginVertical:30, marginHorizontal:20, backgroundColor:theme.background.primary, alignItems:'center', justifyContent:'center', elevation: Platform.OS === 'android' ? 36 : undefined, shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 4},
  
  
  
  
  
  
  
  
  
  
  
  
  icon: {color:'white'},
  divider : {
    borderBottomColor: 'white', 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    width:ScreenWidth*0.25
  },
  dividerContainer: {
    flexDirection:'row', 
    justifyContent:'space-evenly',
    alignItems:'center', 
    marginVertical: 20,
    width: ScreenWidth * 0.8
  },
  button: {
    height: 37,
    width: ScreenWidth * 0.80,
    backgroundColor: theme.secondary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 10,
    elevation: 5,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: "#166080",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  socials: {
    width: ScreenWidth*0.8,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1/2,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignItems: 'center',   
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom: 10
  },
  buttonText: { },
  text: {
    color: theme.text.primary, 
    fontWeight:'bold', 
    fontSize:14, 
    fontStyle: 'normal', 
    fontFamily:'Helvetica'
  }
});
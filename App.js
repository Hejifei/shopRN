/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import Tab from './src/pages';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
} from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({navigation, route}) {
  const {params} = route;
  React.useEffect(() => {
    if (params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.post]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
      <Text>{JSON.stringify(navigation, null, 4)}</Text>
      <Button title="Go to Tab" onPress={() => navigation.navigate('Tab')} />
      <Button
        title="Go to PostScreen"
        onPress={() => navigation.navigate('PostScreen')}
      />
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({title: 'Updated!'})} // 修改导航title
      />
    </View>
  );
}

function DetailsScreen({navigation, route}) {
  const {id, otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(id)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Text>{JSON.stringify(navigation, null, 4)}</Text>
      <Text>{JSON.stringify(route, null, 4)}</Text>
      <Button
        title="Go to Detail"
        onPress={() =>
          navigation.push('Detail', {
            id: 86,
            otherParam: 'anything you want here',
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', {post: postText});
        }}
      />
    </>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // 通用option
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home Page',
            // 自定义导航栏标题样式
            headerStyle: {
              backgroundColor: '#969696',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
            headerLeft: () => (
              <Button
                onPress={() => alert('This is a Left button!')}
                title="Left"
                color="#fff"
              />
            ),
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          initialParams={{id: 666, otherParam: 'init params'}}
          options={({route}) => ({title: `ID: ${route.params.id}`})}
        />
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="PostScreen" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

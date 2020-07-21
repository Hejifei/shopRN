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
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {connect, Provider} from 'react-redux';
import {homeCountAdd, homeCountCut} from './src/action/home';
import {countSelector} from './src/selector/home';
import store from './src/store';

const Stack = createStackNavigator();

function HomeScreenComponent({
  navigation,
  route,
  count = 0,
  // homeCountAdd,
  // homeCountCut,
}) {
  const {params} = route;
  React.useEffect(() => {
    if (params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.post]);

  const onAdd = () => {
    homeCountAdd(count + 1);
  };
  const onMinus = () => {
    homeCountAdd(count - 1);
  };

  const onDel = () => {
    homeCountCut();
  };

  return (
    <View style={styles.detailWrapper}>
      <Text>Home Screen</Text>
      <Text>Post: {route.params?.post}</Text>
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

      <View style={styles.detailWrapper}>
        <Text>{count}</Text>
        <Button onPress={onAdd} title="+" />
        <Button onPress={onMinus} title="-" />
        <Button onPress={onDel} title="del" />
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    count: countSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeCountAdd,
    homeCountCut,
  };
}

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenComponent);

function DetailsScreen({navigation, route}) {
  const {id, otherParam} = route.params;
  return (
    <View style={styles.detailWrapper}>
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
        style={styles.inputWrapper}
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

const App = () => {
  return (
    <Provider store={store}>
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
              headerTitnColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <Button
                  onPress={() => console.log('This is a button!')}
                  title="Info"
                  color="#fff"
                />
              ),
              headerLeft: () => (
                <Button
                  onPress={() => console.log('This is a Left button!')}
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  detailWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    height: 200,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default App;

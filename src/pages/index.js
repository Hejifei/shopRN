/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, SearchBar, TabBar} from '@ant-design/react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';

const MenuTab = () => {
  const [selectedTab, SetSelectedTab] = useState('homeTab');
  const renderContent = (pageText) => {
    return (
      <View style={styles.searchWrapper}>
        <SearchBar placeholder="Search" showCancelButton />
        <Text>{pageText}</Text>
      </View>
    );
  };
  const onChangeTab = (tabName) => {
    SetSelectedTab(tabName);
  };

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5">
      <TabBar.Item
        icon={<Icon name="home" />}
        title="Home"
        selected={selectedTab === 'homeTab'}
        onPress={() => onChangeTab('homeTab')}>
        {/*{renderContent('Home Tab')}*/}
        <Home />
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="ordered-list" />}
        title="Shop"
        badge={2}
        selected={selectedTab === 'shopTab'}
        onPress={() => onChangeTab('shopTab')}>
        {renderContent('Shop Tab')}
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="like" />}
        title="Order"
        selected={selectedTab === 'orderTab'}
        onPress={() => onChangeTab('orderTab')}>
        {renderContent('Order Tab')}
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="user" />}
        title="User"
        selected={selectedTab === 'userTab'}
        onPress={() => onChangeTab('userTab')}>
        {renderContent('User Tab')}
      </TabBar.Item>
    </TabBar>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default MenuTab;

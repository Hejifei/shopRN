import React from 'react';
import {Text, Image, StyleSheet, View, Platform} from 'react-native';

function MoviceIntro({info, idx}) {
  const {name, price, imgUrl, countOfSeal} = info;
  return (
    <>
      <View style={[styles.container, {marginRight: idx % 2 === 0 ? 10 : 0}]}>
        <Image
          source={{uri: imgUrl || 'http://i.imgur.com/UePbdph.jpg'}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {name}
          </Text>
          <View style={styles.priceLine}>
            <Text style={styles.sign}>¥</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.payed}>¥ {countOfSeal}人已购买</Text>
          </View>
        </View>
      </View>
      {/*<View style={styles.bottomLine} />*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 8,
  },
  thumbnail: {
    height: 188,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  rightContainer: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 20,
    color: '#333',
  },
  priceLine: {
    // borderTop: 1,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 6,
    paddingTop: 6,
    lineHeight: 22,
    flexDirection: 'row',
    paddingBottom: 3,
  },
  sign: {
    // color: '#ff5500',
    color: 'red',
    fontSize: 12,
    marginRight: 5,
  },
  price: {
    color: '#ff5500',
    fontSize: 16,
    lineHeight: 17,
    marginRight: 10,
  },
  payed: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  bottomLine: {
    // height: 5,
    // backgroundColor: '#dedede',
    ...Platform.select({
      ios: {
        color: 'red',
      },
      android: {
        color: 'pink',
      },
    }),
  },
});

export default MoviceIntro;

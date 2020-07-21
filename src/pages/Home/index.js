/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {SearchBar, Carousel} from '@ant-design/react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import MoviceIntro from '../../components/movice_intro';

// const MOCKED_MOVIES_DATA = [
//   {
//     title: '标题',
//     year: '2015',
//     posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'},
//   },
// ];
// const REQUEST_URL =
//   'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

const Home = () => {
  // const [movies, setMovies] = useState();
  const [goodsData, setGoodsData] = useState({data: [], page: 0});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [bannerImgList] = useState([
    'https://img.alicdn.com/imgextra/i2/113/O1CN01Nzzm441ChnMmvBe7e_!!113-0-luban.jpg',
    'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg',
    'https://aecpm.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg',
    'https://gw.alicdn.com/imgextra/i4/94/O1CN01Z5aWbK1CZ5qAuMYRC_!!94-0-lubanu.jpg',
    'https://gw.alicdn.com/imgextra/i1/101/O1CN01cAYGlj1CcIcA3GE9U_!!101-0-lubanu.jpg',
    'https://gw.alicdn.com/imgextra/i1/34/O1CN01InSDaV1C7c4tG4UWH_!!34-0-lubanu.jpg',
    'https://gw.alicdn.com/imgextra/i4/178/O1CN010Z2kiL1DBZ6rQsCLx_!!178-0-lubanu.jpg',
  ]);

  // const fetchData = () => {
  //   fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log({
  //         responseData,
  //       });
  //       setMovies(responseData.movies);
  //     });
  // };

  const shopList = [
    {
      id: 1,
      name: '摩登主妇玻璃调味罐盐罐套装厨房调料罐调味盒玻璃料理盐罐组合装',
      price: 49,
      countOfSeal: 246,
      imgUrl:
        'https://gw.alicdn.com/bao/uploaded/i1/2452359127/O1CN01dXUMvg2HIDVF8FyFt_!!2452359127.jpg_500x500q90.jpg',
    },
    {
      id: 2,
      name: '日式zakka收纳盒桌面杂物盒玄关钥匙置物盒零钱收纳盒茶几收纳盘',
      price: 18,
      countOfSeal: 1003,
      imgUrl:
        'https://gw.alicdn.com/bao/uploaded/i2/2966860166/TB1yuGgepOWBuNjy0FiXXXFxVXa_!!0-item_pic.jpg_500x500q90.jpg',
    },
  ];

  const fetchGoodsData = async (page = 0) => {
    if (loading) {
      return;
    }
    if (page >= 5) {
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          const NewGoodsList = [];
          const perPage = 8;
          for (let i = 0; i < perPage; i++) {
            const goodsCopiedInfo = shopList[i % 2];
            const id = page * perPage + i;
            NewGoodsList.push({
              ...goodsCopiedInfo,
              id,
              name: id + goodsCopiedInfo.name,
            });
          }
          setGoodsData({
            page: page,
            data:
              page === 0 ? NewGoodsList : [...goodsData.data, ...NewGoodsList],
          });
          setLoading(false);
          setRefreshing(false);
          resolve();
        }, 1000);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchGoodsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoadingView = () => {
    return (
      <View style={styles.container}>
        <Text>正在加载电影数据……</Text>
      </View>
    );
  };

  if (!goodsData.data) {
    return renderLoadingView();
  }

  const onHorizontalSelectedIndexChange = (index) => {
    /* tslint:disable: no-console */
    console.log('轮播', index);
  };

  const getHeaderComponent = () => (
    <>
      <Carousel
        style={styles.wrapper}
        selectedIndex={0}
        autoplay={false}
        infinite
        afterChange={onHorizontalSelectedIndexChange}>
        {bannerImgList.map((url) => (
          <View key={url} style={[styles.containerHorizontal]}>
            <Image
              source={{
                uri: url,
              }}
              style={styles.bannerImg}
            />
          </View>
        ))}
      </Carousel>
    </>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchGoodsData();
  };

  const onEndReached = () => {
    fetchGoodsData(goodsData.page + 1);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/*<SafeAreaView>*/}
      <View style={styles.bgWrapper}>
        <SearchBar placeholder="搜索喜欢的商品" showCancelButton />
        <FlatList
          // data={movies}
          refreshControl={
            <RefreshControl
              tintColor={'#969696'}
              titleColor={'#969696'}
              enabled={true}
              title={'加载中...'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={10}
          onEndReached={onEndReached}
          data={goodsData.data || []}
          ListHeaderComponent={getHeaderComponent()}
          ListFooterComponent={() => (
            <Text style={styles.noMoreData}>没有更多数据！</Text>
          )}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.listWrapper}
          renderItem={({item, index}) => (
            <MoviceIntro key={item.id} info={item} idx={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/*</SafeAreaView>*/}
    </>
  );
};

const styles = StyleSheet.create({
  bgWrapper: {
    backgroundColor: 'white',
  },
  listWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 188,
    marginBottom: 49,
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    backgroundColor: '#fff',
    height: 132,
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  bannerImg: {
    // flex: 1,
    width: 414,
    backgroundColor: '#f2f2f2',
    height: 132,
  },
  noMoreData: {
    padding: 10,
    textAlign: 'center',
    color: '#969696',
  },
});

export default Home;

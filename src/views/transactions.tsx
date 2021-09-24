import React, {Fragment} from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import {Activities, NavBar, Container} from '@components';
import {recentActivities} from '../helpers/data';

const TransactionsScreen = () => {
  return (
    <Fragment>
      <NavBar center="Transactions" />
      <Container style={{paddingHorizontal:'3%'}}>
        <FlatList
          data={recentActivities}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Activities item={item} />}
          contentContainerStyle={{marginTop: 10}}
        />
      </Container>
    </Fragment>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({});

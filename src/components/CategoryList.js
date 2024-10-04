import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const CategoryItem = ({category, onClick}) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onClick}>
    <Text style={styles.categoryText}>{category.name}</Text>
  </TouchableOpacity>
);

const CategoryList = ({categories, onCategoryClick}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <CategoryItem
            category={item}
            onClick={() => onCategoryClick(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  categoryItem: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default CategoryList;

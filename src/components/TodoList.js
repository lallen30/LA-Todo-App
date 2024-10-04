import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onToggle,
  onAddNote,
  onAddSubTodo,
  onToggleSubTodo,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <TodoItem
            todo={item}
            onToggle={() => onToggle(item.id)}
            onAddNote={note => onAddNote(item.id, note)}
            onAddSubTodo={subTodo => onAddSubTodo(item.id, subTodo)}
            onToggleSubTodo={subTodoId => onToggleSubTodo(item.id, subTodoId)}
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
});

export default TodoList;

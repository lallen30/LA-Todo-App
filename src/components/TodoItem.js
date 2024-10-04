import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

const Checkbox = ({checked, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.checkbox}>
    {checked && <View style={styles.checkedBox} />}
  </TouchableOpacity>
);

const TodoItem = ({
  todo,
  onToggle,
  onAddNote,
  onAddSubTodo,
  onToggleSubTodo,
}) => {
  const [note, setNote] = useState('');
  const [subTodo, setSubTodo] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote('');
    }
  };

  const handleAddSubTodo = () => {
    if (subTodo.trim()) {
      onAddSubTodo(subTodo);
      setSubTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoMain}>
        <Checkbox checked={todo.completed} onPress={onToggle} />
        <Text style={[styles.todoText, todo.completed && styles.completed]}>
          {todo.text}
        </Text>
      </View>
      <View style={styles.todoDetails}>
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Notes:</Text>
          <FlatList
            data={todo.notes}
            renderItem={({item}) => <Text style={styles.noteText}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            onSubmitEditing={handleAddNote}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddNote}>
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subTodosSection}>
          <Text style={styles.sectionTitle}>Sub-todos:</Text>
          <FlatList
            data={todo.subTodos}
            renderItem={({item}) => (
              <View style={styles.subTodoItem}>
                <Checkbox
                  checked={item.completed}
                  onPress={() => onToggleSubTodo(item.id)}
                />
                <Text
                  style={[
                    styles.subTodoText,
                    item.completed && styles.completed,
                  ]}>
                  {item.text}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <TextInput
            style={styles.input}
            value={subTodo}
            onChangeText={setSubTodo}
            placeholder="Add a sub-todo"
            onSubmitEditing={handleAddSubTodo}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddSubTodo}>
            <Text style={styles.buttonText}>Add Sub-todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  todoMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  todoText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  todoDetails: {
    marginLeft: 32,
  },
  notesSection: {
    marginTop: 8,
  },
  subTodosSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  subTodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  subTodoText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default TodoItem;

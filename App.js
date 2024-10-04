import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryList from './src/components/CategoryList';
import TodoList from './src/components/TodoList';
import AddItemForm from './src/components/AddItemForm';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [todos, setTodos] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [categories, todos]);

  const loadData = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedTodos) setTodos(JSON.parse(storedTodos));
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(categories));
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const addCategory = name => {
    const newCategory = {
      id: Date.now(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const addTodo = (categoryId, text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      notes: [],
      subTodos: [],
    };
    setTodos({
      ...todos,
      [categoryId]: [...(todos[categoryId] || []), newTodo],
    });
  };

  const toggleTodo = (categoryId, todoId) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map(todo =>
        todo.id === todoId ? {...todo, completed: !todo.completed} : todo,
      ),
    });
  };

  const addNote = (categoryId, todoId, note) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map(todo =>
        todo.id === todoId ? {...todo, notes: [...todo.notes, note]} : todo,
      ),
    });
  };

  const addSubTodo = (categoryId, todoId, subTodoText) => {
    const newSubTodo = {
      id: Date.now(),
      text: subTodoText,
      completed: false,
    };
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map(todo =>
        todo.id === todoId
          ? {...todo, subTodos: [...todo.subTodos, newSubTodo]}
          : todo,
      ),
    });
  };

  const toggleSubTodo = (categoryId, todoId, subTodoId) => {
    setTodos({
      ...todos,
      [categoryId]: todos[categoryId].map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subTodos: todo.subTodos.map(subTodo =>
                subTodo.id === subTodoId
                  ? {...subTodo, completed: !subTodo.completed}
                  : subTodo,
              ),
            }
          : todo,
      ),
    });
  };

  const renderItem = ({item}) => {
    if (item.type === 'categories') {
      return (
        <View style={styles.categoriesSection}>
          <CategoryList
            categories={categories}
            onCategoryClick={setSelectedCategory}
          />
          <AddItemForm onAdd={addCategory} placeholder="Add a new category" />
        </View>
      );
    } else if (item.type === 'todos' && selectedCategory) {
      return (
        <View style={styles.todosSection}>
          <Text style={styles.categoryTitle}>
            {categories.find(c => c.id === selectedCategory).name}
          </Text>
          <TodoList
            todos={todos[selectedCategory] || []}
            onToggle={todoId => toggleTodo(selectedCategory, todoId)}
            onAddNote={(todoId, note) =>
              addNote(selectedCategory, todoId, note)
            }
            onAddSubTodo={(todoId, subTodo) =>
              addSubTodo(selectedCategory, todoId, subTodo)
            }
            onToggleSubTodo={(todoId, subTodoId) =>
              toggleSubTodo(selectedCategory, todoId, subTodoId)
            }
          />
          <AddItemForm
            onAdd={text => addTodo(selectedCategory, text)}
            placeholder="Add a new todo"
          />
        </View>
      );
    }
    return null;
  };

  const data = [
    {type: 'categories', id: 'categories'},
    {type: 'todos', id: 'todos'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LA Todos</Text>
      <Text style={styles.welcomeMessage}>
        Welcome to your personal Todo App! Start by adding a category, then you
        can add todos, notes, and sub-todos to each category.
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.mainContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 16,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
  },
  categoriesSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todosSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 16,
  },
});

export default App;

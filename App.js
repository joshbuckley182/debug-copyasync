import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const SQLITE_HOME_PATH = FileSystem.documentDirectory + "SQLite/";

async function checkDocumentDirectory() {
  console.log('checkDocumentDirectory')
  const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  console.log('Path:', FileSystem.documentDirectory);
  console.log('Files:', files);
  console.log();
}

async function checkSqliteDirectory() {
  console.log('checkSqliteDirectory')
  const files = await FileSystem.readDirectoryAsync(SQLITE_HOME_PATH);
  console.log('Path:', SQLITE_HOME_PATH);
  console.log('Files:', files);
  console.log();
}

async function removeSqliteDirectory() {
  console.log('removeSqliteDirectory')
  await FileSystem.deleteAsync(SQLITE_HOME_PATH);
  console.log('Done')
  console.log()
}

async function copyDatabase() {
  console.log('copyDatabase')
  const [db] = await Asset.loadAsync(require("./test.db"));
  const dbPath = `${SQLITE_HOME_PATH}test.db`;

  console.log("copy", {
    from: db.localUri,
    to: dbPath,
  });

  await FileSystem.copyAsync({
    from: db.localUri,
    to: dbPath,
  });

  console.log('Done')
  console.log()
}


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Check Document Directory" onPress={checkDocumentDirectory} />
      <Button title="Check SQLite Directory" onPress={checkSqliteDirectory} />
      <Button title="Remove SQLite Directory" onPress={removeSqliteDirectory} />
      <Button title="Copy Database" onPress={copyDatabase} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

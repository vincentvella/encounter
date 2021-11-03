import MMKVStorage from "react-native-mmkv-storage";

const storage = new MMKVStorage.Loader().initialize()

const getItem = storage.getString
const setItem = storage.setString
const removeItem = storage.removeItem

const Storage = {
  getItem,
  setItem,
  removeItem,
}

export default Storage

import MMKVStorage from "react-native-mmkv-storage";

const storage = new MMKVStorage.Loader().initialize()

const Storage = {
  getItem: (key: string) => storage.getString(key),
  setItem: (key: string, value: string) => storage.setString(key, value),
  removeItem: (key: string) => storage.removeItem(key),
}

export default Storage

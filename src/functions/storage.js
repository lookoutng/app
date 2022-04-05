// import { Storage } from '@capacitor/storage';
export { store, get, remove, storeObject, getObject }

const store = (key, value) => {
  localStorage.setItem(key,value)
}

const get = (key) => {
  return localStorage.getItem(key);
}

const getObject = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

const remove = (key) => {
   localStorage.removeItem(key);
}

const storeObject = (object) => {
  localStorage.setItem('user',JSON.stringify(object))
}



import axios from "axios"

const urlBooks =
  "https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447,ISBN:0201558025,ISBN:0385472579&jscmd=details&format=json"

export const getBooks = async () => axios.get(urlBooks)

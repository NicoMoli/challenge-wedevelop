import { render, screen } from "@testing-library/react"
import Login from "./components/Login"
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Books from "./components/Books"

import * as getBooksUtils from '../src/services/getBooks';

const books = {
  "data": {
    "ISBN:0385472579": {
      "bib_key": "ISBN:0385472579",
      "info_url": "https://openlibrary.org/books/OL1397864M/Zen_speaks",
      "preview": "noview",
      "preview_url": "https://openlibrary.org/books/OL1397864M/Zen_speaks",
      "thumbnail_url": "https://covers.openlibrary.org/b/id/240726-S.jpg",
      "details": {
        "publishers": ["Anchor Books"],
        "number_of_pages": 159,
        "subtitle": "shouts of nothingness",
        "contributors": [{
          "role": "Translator",
          "name": "Chan shuo"
        }, {
          "role": "Illustrator",
          "name": "Tsai Chih Chung"
        }, {
          "role": "Adaptation",
          "name": "Tsai Chih Chung"
        }, {
          "role": "Translator",
          "name": "Brian Bruya"
        }],
        "isbn_10": ["0385472579"],
        "pagination": "159 p. :",
        "covers": [240726],
        "lc_classifications": ["BQ9265.6 .T7313 1994"],
        "latest_revision": 10,
        "url": ["http://www.loc.gov/catdir/description/random046/93005405.html"],
        "key": "/books/OL1397864M",
        "authors": [{
          "key": "/authors/OL223368A",
          "name": "Zhizhong Cai"
        }],
        "publish_places": ["New York"],
        "contributions": ["Bruya, Brian, 1966-"],
        "subjects": ["Zen Buddhism -- Caricatures and cartoons."],
        "uri_descriptions": ["Publisher description"],
        "genres": ["Caricatures and cartoons."],
        "classifications": {},
        "source_records": ["marc:marc_openlibraries_sanfranciscopubliclibrary/sfpl_chq_2018_12_24_run02.mrc:125374412:1424", "amazon:0385472579", "marc:marc_loc_2016/BooksAll.2016.part22.utf8:152602043:889"],
        "title": "Zen speaks",
        "dewey_decimal_class": ["294.3/927"],
        "identifiers": {
          "librarything": ["192819"],
          "goodreads": ["979250"]
        },
        "created": {
          "type": "/type/datetime",
          "value": "2008-04-01T03:28:50.625462"
        },
        "languages": [{
          "key": "/languages/eng"
        }],
        "lccn": ["93005405"],
        "local_id": ["urn:sfpl:31223062535233"],
        "publish_date": "1994",
        "publish_country": "nyu",
        "last_modified": {
          "type": "/type/datetime",
          "value": "2020-11-16T19:15:46.977258"
        },
        "work_title": ["Chan shuo."],
        "works": [{
          "key": "/works/OL1866073W"
        }],
        "type": {
          "key": "/type/edition"
        },
        "uris": ["http://www.loc.gov/catdir/description/random046/93005405.html"],
        "revision": 10
      }
    }
  },
  "status": 200,
  "statusText": "",
  "headers": {
    "content-type": "application/json"
  },
  "config": {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "transformRequest": [null],
    "transformResponse": [null],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "headers": {
      "Accept": "application/json, text/plain, */*"
    },
    "method": "get",
    "url": "https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447,ISBN:0201558025,ISBN:0385472579&jscmd=details&format=json"
  },
  "request": {}
};


test("render Login component", () => {
  render(<Login />, { wrapper: MemoryRouter })

  const header = screen.getByText("Welcome")
  const userNameInput = screen.getByPlaceholderText("User Name")
  const passwordInput = screen.getByPlaceholderText("Password")
  const buttonSubmit = screen.getByTestId('submit-button')

  expect(header).toBeDefined()
  expect(userNameInput).toBeDefined()
  expect(passwordInput).toBeDefined()
  expect(buttonSubmit).toBeDefined()
})

test("render loading component in Books component", () => {
  const mockGetBooks = jest.spyOn(getBooksUtils, 'getBooks');
  mockGetBooks.mockResolvedValue();

  render(<Books />, { wrapper: MemoryRouter })
  const header = screen.getByText("Loading books list...")
  expect(header).toBeDefined()
})

test("render Books component", async () => {
  const mockGetBooks = jest.spyOn(getBooksUtils, 'getBooks');
  mockGetBooks.mockResolvedValue(books);

  render(<Books />, { wrapper: MemoryRouter })
  const header = await screen.findByText("List of Books:")
  const containerDiv = await screen.findByTestId("container-div")
  const buttonDescription = await screen.findByTestId("button-description")
  const buttonFavorites = await screen.findByTestId("button-favorites")
  const goToFavorites = await screen.findByTestId("go-to-favorites")

  expect(header).toBeDefined()
  expect(containerDiv).toBeDefined()
  expect(buttonDescription).toBeDefined()
  expect(buttonFavorites).toBeDefined()
  expect(goToFavorites).toBeDefined()
})

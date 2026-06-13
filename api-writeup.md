# API Documentation Write-up: Rick and Morty API

## API Overview
For this API Integration Project, I chose to use the **Rick and Morty API** (https://rickandmortyapi.com/). It is an open REST API based on the television show Rick and Morty. It provides access to data about hundreds of characters, images, locations, and episodes. 

I chose this API because it is completely free, requires no authentication (no API key necessary), and supports robust querying and pagination, making it perfect for demonstrating frontend API integration.

## Endpoint Used
* **Base URL:** `https://rickandmortyapi.com/api/character`
* **Method:** `GET`

## Features Implemented
1. **Fetching & Parsing:** 
   The application uses the native JavaScript `fetch()` API combined with `async/await` syntax to make a network request to the endpoint. The response is parsed as JSON.
2. **Search / Filtering:**
   By appending query parameters to the URL (e.g., `?name=rick`), the API filters the results. The app dynamically builds this URL based on the user's input in the search bar.
3. **Pagination:**
   The API returns data in chunks (20 characters per page) and provides information about the total number of pages. The app reads this metadata to construct "Next" and "Prev" buttons to load different pages (e.g., `?page=2`).
4. **State Management:**
   - **Loading State:** A spinner animation is displayed while the `fetch()` promise is pending.
   - **Error State:** If the user searches for a character that doesn't exist, the API returns a `404 Not Found` error. The `catch` block catches this and displays a friendly error message on the UI instead of breaking the app.
   
## Example Data Structure
When the API is called, it returns a JSON object containing `info` (for pagination) and `results` (an array of character objects):
```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```
The application extracts these specific properties (`name`, `status`, `species`, `image`) and injects them directly into the HTML Document Object Model (DOM) to create the visual cards.

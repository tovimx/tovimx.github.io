import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const ITEMS_API_URL = "https://jsonplaceholder.typicode.com/todos";
const DEBOUNCE_DELAY = 500;

function FetchDebounced() {
  const [items, setItems] = useState([]);
  const [isDebounced, setIsDebounced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getItems = async (inputValue = 0) => {
    setIsDebounced(false);
    setIsLoading(true);
    const url = inputValue ? `${ITEMS_API_URL}/${inputValue}` : ITEMS_API_URL;
    console.log(url);
    const response = await axios.get(url);
    if (response) {
      setIsLoading(false);
      setItems(response.data);
    }
  };

  useEffect(() => getItems(), []);
  console.log(items);

  const handleUserInput = (e) => {
    const inputValue = e.target.value;
    const debounceFunct = debounce(() => getItems(inputValue), DEBOUNCE_DELAY);
    debounceFunct();
    setIsDebounced(true);
  };
  return (
    <>
      <div className={isLoading ? "is-loading" : ""}>
        <input type="text" onChange={handleUserInput}></input>
      </div>
      {Object.keys(items).length && (
        <li className="list-item">{items.title}</li>
      )}
      {!isLoading && items.length ? (
        <ul className="items">
          {items.map((item) => (
            <li className="list-item">{item.title}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default FetchDebounced;

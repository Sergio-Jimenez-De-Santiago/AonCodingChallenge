"use client";
import { useEffect, useState } from "react";

export default function Products() {
    interface Item {
      id: number;
      name: string;
    }
    const [data, setData] = useState<any>([]);

    // Added empty dependency array to make sure the useEffect is only triggered on the initial load of the
    // page instead of every time data is updated, like it did before
    useEffect(() => {
      fetch('products.json')
        .then(response => response.json())
        .then(json => setData(json));
    }, []);

    return (
      <div>
        {data.length === 0 ? ( <p>Loading...</p> ) : (
        // Changed if condition because an empty array is not false, so !data would not work as intented.
        // Also included the buttons when "Loading..." is on screen as I think it looks better 
          <ul>
            {(data as Item[]).map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}

        <button onClick={() => {
          // Changed the id from 5 to data.length + 1 so that when adding more than 1 "Spaghetti" the ids 
          // don't clash. Also removed value="Spaghetti" because it does not serve any purpose
          const newdata = data.concat({id: data.length + 1, name: "Spaghetti"}); 
          setData(newdata);
          }}>
        Add Spaghetti
        </button><br></br>
        <button onClick={() => {
          const newdata = data.slice(0, -1); 
          setData(newdata);
          }}>
        Remove last item
        </button>
      </div>      
    );
  }


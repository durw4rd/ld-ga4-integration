import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import './App.css'

const supabase = createClient("https://coiovqvachjgqalgyyym.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaW92cXZhY2hqZ3FhbGd5eXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1NDI2MTksImV4cCI6MjAzMjExODYxOX0.BncgzplDDRu2Mm5zHigxKxFAKZi6xbbeSwKMVfUz4S0");

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App

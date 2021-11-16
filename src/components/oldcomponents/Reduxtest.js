import { useEffect } from "react"
import { useGetMoviesQuery } from "../services/movies";

const Reduxtest = () => {
  // get page 1
  const { data, error, isLoading } = useGetMoviesQuery(1);
  
  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <div>
      hi
      {error ? (
        <h1>oh no error</h1>
      ) : isLoading ? (
        <>loading</>
      ) : data ? (
        <h1>data loaded</h1>
      ) : null}
    </div>
  );
};

export default Reduxtest;

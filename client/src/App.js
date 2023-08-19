import "./app.css";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Layout />
      <Toaster 
        containerStyle={{
          top: 80,     // Adjust the top position as needed
          left: 20,    // Adjust the left position as needed
          bottom: 20,  // Adjust the bottom position as needed
          right: 20,   // Adjust the right position as needed
        }}
      />
    </>
    
  );
}

export default App;

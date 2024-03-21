import { configWeb3Modal } from "./connection"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Pools from "./components/Pools";
import '@radix-ui/themes/styles.css';


//web3 Modal configuration function call
configWeb3Modal();
function App() {


  return (
    <main className="w-full min-h-screen bg-white-950">
      <Header />
      <Pools />
      <ToastContainer />
    </main>
  )
}

export default App

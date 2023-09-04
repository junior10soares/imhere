import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent // ficar sobre o conteudo de home
      />
      <Home />
    </>

  )
}


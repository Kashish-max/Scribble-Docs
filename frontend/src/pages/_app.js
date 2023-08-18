import { ThemeProvider } from "@material-tailwind/react";
import { wrapper } from "@/store/store";
import "@/styles/globals.scss"

function App({ Component, pageProps }) {

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(App);
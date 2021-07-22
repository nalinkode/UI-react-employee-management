import React, { useState } from "react";
import "./style/App.css";
import Header from "./Component/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "react-toastify/dist/ReactToastify.css";
import { I18nProvider, LOCALES } from "./i18n";
import { FormattedMessage } from "react-intl";
import Footer from "./Component/Footer/Footer";

function App(props) {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  return (
    <I18nProvider locale={locale}>
      <Provider store={store}>
        <div>
          <Header sendToParent={setLocale}></Header>
          <Footer></Footer>
        </div>
      </Provider>
    </I18nProvider>
  );
}

export default App;

import React, {useState} from "react";
import Header from "./layout/Header";
import Content from "./layout/Content";
import Home from "./home";
import { defaultLanguage } from './utils/constants';
import { LanguageContext } from './utils/context';

const App = () => {
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

    return(
        <LanguageContext.Provider value={currentLanguage}>
            <Header setCurrentLanguage={setCurrentLanguage} />
            <Content>
                <Home />
            </Content>
        </LanguageContext.Provider>
    )
}

export default App;
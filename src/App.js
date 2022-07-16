import React from "react";
import './app.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Clothes } from './components/Clothes/Clothes';
import { Tech } from './components/Tech/Tech';
import { Nav } from './components/Nav/Nav'

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home to="/home" />} />
        <Route path='/home' element={<Home to="/"/>}></Route>
        <Route path='/clothes' element={<Clothes />}></Route>
        <Route path='/tech' element={<Tech />}></Route>
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
      </Routes>
    </BrowserRouter>
    )
  }
}

export { App }
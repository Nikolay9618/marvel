import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';



import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComicPage } from '../pages';


const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path='/comics/:id' element={<SingleComicPage />} />
                            <Route path='*' element={<ErrorPage />} />
                        </Routes>
                    </Suspense>

                </main>
            </div>

        </BrowserRouter>
    )
}


export default App;
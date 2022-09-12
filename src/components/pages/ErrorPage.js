import './ErrorPage.scss'

import { Link } from 'react-router-dom';

const ErrorPage = () => {

   return (
      <>
         <div className="container">
            <div className="error__row">
               <div className="error__text">Страница не найдена. <span>404</span></div>
               <Link to='/' className="error__btn">Вернуться на главную</Link>
            </div>
         </div>
      </>
   )
}

export default ErrorPage;
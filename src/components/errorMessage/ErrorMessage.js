import './errorMessage.scss'

const ErrorMessage = () => {
   return (
      <img className='center' src={process.env.PUBLIC_URL + '/logo192.png'} alt="Error" />
   )
}

export default ErrorMessage;
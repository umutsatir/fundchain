import '../styles/Error.css';

function Error() {
    return (
        <div className='error-container'>
            <h1 className='error-message'>404 - Page Not Found</h1>
            <p className='error-sub-message'>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}

export default Error;

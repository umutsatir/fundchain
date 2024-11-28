import '../styles/Error.css';

function Error() {

    return (
        
            <div className='error-container'>
                <h1 className='error-message'>ERROR</h1>
                <h1 className='error-404'>404</h1>
                <h1 className='error-message'>Page Not Found</h1>
                <p className='error-sub-message'>Sorry, the page you were looking for does not exist.</p>

                <div className="redirecting-signup">
                    <span className="signup-text">New to Fundchain?</span>
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </div>
            </div>
       

    );
}

export default Error;

import {Spinner} from 'react-bootstrap';

function Loading() {
    return(
        <div className="text-center mt-5 pt-5" >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
        </div>
    )
}

export default Loading;
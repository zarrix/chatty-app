import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from 'react-bootstrap';
import { Link } from "react-router-dom";

function LeftNavBar(props) {
    return(
        <div class="bg-white d-block pt-3 ml-3">
              <Link to={`/${props.id}`}><Image src={props.avatar} roundedCircle width="100" height="100" alt="" className="mx-auto d-block"/></Link>
              
              <h5 className="font-weight-bold text-center mt-3">Welcome, {props.lastName}</h5>
              <Link to={`/${props.id}`}><p class="text-center">See Profile</p></Link>
        </div>
    );
}

export default LeftNavBar;
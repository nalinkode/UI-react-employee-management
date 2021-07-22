import "./Header.css";
import logo from "../../assets/emp_logo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Employee from "../Employee/Employee";
import Home from "../Home/Home";
import AddEmployee from "../Employee/Add-Employee/AddEmployee";
import {FormattedMessage} from 'react-intl';
import { LOCALES } from "../../i18n";

function Header(props) {
  
  const handleInputChange = (e) => {
    switch (e.target.value) {
      case "GERMAN":
        props.sendToParent(LOCALES.GERMAN);
        break;
      case "FRENCH":
        props.sendToParent(LOCALES.FRENCH);
        break;
      case "ENGLISH":
        props.sendToParent(LOCALES.ENGLISH);
        break;
      case "MARATHI":
        props.sendToParent(LOCALES.MARATHI);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img className="logo" src={logo}></img><FormattedMessage id="header.employee-management"/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> <FormattedMessage id="header.home"/>
              </Link>
              <Link className="nav-item nav-link" to="/employee">
                <i className="fas fa-user-friends"></i> <FormattedMessage id="header.employee"/>
              </Link>
            </div>
          </div>

          <div class="form-inline">
            <div className="footer form-inline my-2 my-lg-0">
            <select
              className="form-control mr-sm-2"
              onChange={handleInputChange}
            >
              <option value="">Select Language</option>
              <option value="ENGLISH">English</option>
              <option value="FRENCH">French</option>
              <option value="GERMAN">German</option>
              <option value="MARATHI">Marathi</option>
            </select>
          </div>
          </div>
           
        </nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/employee" component={Employee}></Route>
          <Route exact path="/employee/add" component={AddEmployee}></Route>
          <Route path="/employee/edit/:empId" component={AddEmployee}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Header;

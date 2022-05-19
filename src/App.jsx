import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {useState, useEffect} from 'react';
import Chart from './Chart';

function App() {
  let initialInputValues = {
    email: "",
    password: "",
    confPassword: "",
    fullName: "",
    phone: "",
    terms: "",
  }
  const [checked, setChecked] = useState(true);
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const[isShowChart, setIsShowChart] = useState(false); 

  const handleChange = (event) => {
    const {name, value, defaultChecked} = event.target;
    setInputValues({ ...inputValues, [name]:value});
    if (event.target.type === "checkbox") {
      setChecked(!checked);
      setInputValues({ ...inputValues, [name]: defaultChecked});
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(inputValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      alert('form submitted successfully');
      setIsShowChart(true);
    }
  }, [formErrors, isSubmit]);

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;; 
const fullNameFormat = /^[a-zA-Z]{4,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/;
const phoneNumberFormat = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;


const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!(values.email.match(mailFormat))) {
      errors.email = "wrong email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!(values.password.match(passwordFormat))) {
      errors.password = "Password must contain 6 to 16 characters, at least one number, and at least one speacial character (!@#$%^&*)";
    }
    if (!values.confPassword) {
      errors.confPassword = "Confirm Password is required";
    } else if (values.confPassword !== values.password) {
      errors.confPassword = "Both passwords should match";
    }
    if (!values.fullName) {
      errors.fullName = "Name is required";
    } else if (!(values.fullName.match(fullNameFormat))) {
      errors.fullName = "name must be min 4 chars and contain letters and spaces only";
    }
    if (!values.phone) {
      errors.phone = "Phone Number is required";
    } else if (!(values.phone.match(phoneNumberFormat))) {
      errors.phone = "write in correct format: 123-456-7890";
    }
    if(values.terms) {
      errors.terms  = "You need to accept the terms"
    }
    
    return errors;
  }

  function displayMainpage() {
    return (
    <div className="container">
      <div className="container__hero">
        <div className="container__heroText">
          <span>Choose a date range</span>
          <p>Lorem ipsum dolor sit amet, consectetur adispiscing elit. 
            Mauris imperdiet bibendum.
          </p>
        </div>
      </div>
      <div className="container__mainContent">
        <div className="wrapper">
          <h1>Create an account</h1>
          <form className="wrapper__form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Your email address</label>
              <input type="email" name="email" onChange={handleChange}/>
              <p>{formErrors.email}</p>
            </div>
            <div>
              <label htmlFor="password">Your password</label>
              <input type="password" name="password" onChange={handleChange}/>
              <p>{formErrors.password}</p>
            </div>
            <div>
              <label htmlFor="confPassword">Confirm your password</label>
              <input type="password" name="confPassword" onChange={handleChange}/>
              <p>{formErrors.confPassword}</p>
            </div>
            <div>
              <label htmlFor="fullName">Your full name</label>
              <input type="text" name="fullName" onChange={handleChange}/>
              <p>{formErrors.fullName}</p>
            </div>
            <div>
              <label htmlFor="phone">Your phone number</label>
              <input type="text" name="phone" onChange={handleChange} />
              <p>{formErrors.phone}</p>
            </div>
            <div>
              <input className="form-check-input" type="checkbox" name="terms" defaultChecked={checked} onChange={handleChange}/>
              <label htmlFor="terms">I have read and agree to the Terms and Conditions</label>
              <p>{formErrors.terms}</p>
            </div>
            <Button type="submit">Create account</Button>
          </form>
        </div>
      </div>
      </div>
    );
    }

    if (!isShowChart ) {
      return displayMainpage();
    } else {
      return <Chart />
    }
}

export default App;

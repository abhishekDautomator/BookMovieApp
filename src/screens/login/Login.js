import React,{useState} from "react";
import Modal from "react-modal";
import axios from 'axios';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl, Button, TextField, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import "./Login.css";
import { useForm, Controller } from "react-hook-form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialState = { 
  firstName: "", 
  lastName: "",  
  email: "",
  password: "",
  contactNumber: "" 
};

export default function Login({show, setShow}) {

  const [data, setData] = useState(initialState);

  const signUpURL = "http://localhost:8085/api/v1/signup";

  const Registration = (e) => {  
    e.preventDefault();
    const data1 = { 
      firstName:data.firstName, 
      lastName:data.lastName, 
      email:data.email, 
      password: data.password, 
      contactNumber: data.contactNumber
    }; 

    axios.post(signUpURL, {
      headers:{
        "Accept": "application/json;charset=UTF-8"
      },
      data1
    })  
      .then((result) => {   
        console.log(result.data);  
        if (result.status === 'invalid')  
          alert('Invalid User');  
        else  
          alert('Registered');  
      })  
  } 

  const customStylesTextArea = {
      margin:"10px 0 10px"
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChange = (e) => {  
    e.persist();  
    setData({ ...data, [e.target.name]: e.target.value });  
  } 

  const [modalIsOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal(event, reason) {
    setShow(false);
  }

  return (
    <div>
      {
      show ?
      <Modal
        isOpen={show}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        disableBackdropClick
      > 
        <Tabs value={value} onChange={handleChange}>
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <TabPanel value={value} index={0}>
        <form>
          <div className="form">
            <div className="form-controller">
              <FormControl>
                  <TextField 
                  style={customStylesTextArea} 
                  required 
                  label="Username"
                  name="Username"
                  onChange={onChange}
                  />
                  <TextField 
                  style={customStylesTextArea} 
                  required 
                  label="Password"
                  name="Password"
                  onChange={onChange}
                  />
                </FormControl>
            </div>
            <div className="form-button">
              <Button color="primary" variant="contained">
                LOGIN
              </Button>
            </div>
          </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form onSubmit={Registration}>
          <div className="form">
            <div className="form-controller">
              <FormControl>
                <TextField 
                style={customStylesTextArea} 
                required 
                label="First Name" 
                name="firstName"
                onChange={onChange}
                value={data.firstName}
                />
                <TextField 
                style={customStylesTextArea} 
                required 
                label="Last Name"
                name="lastName"
                onChange={onChange}
                value={data.lastName} 
                />
                <TextField 
                style={customStylesTextArea} 
                required 
                label="Email"
                name="email"
                onChange={onChange}
                value={data.email}  
                />
                <TextField 
                style={customStylesTextArea} 
                required 
                label="Password"
                name="password"
                onChange={onChange}
                value={data.password}  
                />
                <TextField 
                style={customStylesTextArea} 
                required 
                label="Contact No."
                name="contactNumber"
                onChange={onChange}
                value={data.contactNumber} 
                />
              </FormControl>
            </div>
            <div className="form-button">
              <Button type="submit" color="primary" variant="contained">
                REGISTER
              </Button>
            </div>
          </div>
          </form>
        </TabPanel>
      </Modal>
      :
      null
      }
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <div className="form">{children}</div>;
}

import React,{useState} from "react";
import Modal from "react-modal";
import { Switch, Link, BrowserRouter as Router, Route } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl, Button, TextField, Grid } from "@material-ui/core";
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

export default function Login() {

  const customStylesTextArea = {
      margin:"10px 0 10px"
  };

   const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modalIsOpen, setIsOpen] = useState(true);
 

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="form">
            <div className="form-controller">
                <FormControl>
                  <TextField 
                  style={customStylesTextArea} 
                  required 
                  label="Username"
                  />
                  <TextField 
                  style={customStylesTextArea} 
                  required 
                  label="Password"
                  />
                </FormControl>
            </div>
            <div className="form-button">
              <Button color="primary" variant="contained">
                LOGIN
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="form">
            <div className="form-controller">
              <FormControl>
                <TextField style={customStylesTextArea} required label="First Name" />
                <TextField style={customStylesTextArea} required label="Last Name" />
                <TextField style={customStylesTextArea} required label="Email" />
                <TextField style={customStylesTextArea} required label="Password" />
                <TextField style={customStylesTextArea} required label="Contact No." />
              </FormControl>
            </div>
            <div className="form-button">
              <Button color="primary" variant="contained">
                REGISTER
              </Button>
            </div>
          </div>
        </TabPanel>
      </Modal>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <div className="form">{children}</div>;
}

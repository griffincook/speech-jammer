import React, { useState } from "react";
import './App.css';
import {Button, Jumbotron, Tabs, Tab} from 'react-bootstrap';
import RapGod from "./rapGod/rapGod";
import Subterranean from "./subterranean/subterranean";
import ToBe from './toBe/toBe'

function App() {
  let audio = {};
  const [buttonName, setButtonName] = useState("Start Jamming");

  const toggleAudio = async function(constraints) {
    if (!audio.srcObject) {
      try {
        audio.srcObject =  await navigator.mediaDevices.getUserMedia(constraints);
        setButtonName("Stop Jamming");
      } catch (err) {
        console.log(err);
      }
    } else {
      audio.srcObject = undefined;
      setButtonName("Start Jamming");
    }
  };

  return (
    <div>
      <audio ref={audioTag => {audio = audioTag}} autoPlay />
      <Jumbotron>
        <h1>Welcome to Speech Jammer!</h1>
        <p>Please make sure you are wearing <b>headphones</b> before jamming to avoid feedback and get the best experience.</p>
        <p>Try reciting Eminem's Rap God, Bob Dylan's Subterranean Homesick Blues, or Shakespeare's famous "To be, or not to be" soliloquy.</p>
        <Button onClick={() => {toggleAudio({audio: true, video: false})}}>{buttonName}</Button>
      </Jumbotron>
      <Tabs defaultActiveKey="rapGod">
        <Tab eventKey="rapGod" title="Rap God">
          <RapGod />
        </Tab>
        <Tab eventKey="subterranean" title="Subterranean Homesick Blues">
          <Subterranean />
        </Tab>
        <Tab eventKey="toBe" title="To be, or not to be">
          <ToBe />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

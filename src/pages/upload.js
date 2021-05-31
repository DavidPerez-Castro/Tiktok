import React, { Component } from "react";
//import {useState} from 'react'
import { storage } from "../firebase";

import TutorialDataService from "../services/tutorial.service";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";


  
export default class AddTutorial extends Component {

  constructor(props) {
    super(props);
    this.onChangeChannel = this.onChangeChannel.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    //this.onChangeSongname = this.onChangeSongname.bind(this);
    //this.onChangeComments = this.onChangeComments.bind(this);
    //this.onChangeLikes = this.onChangeLikes.bind(this);
    //this.onChangeShares = this.onChangeShares.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);


    this.state = {
      channel: "",
      description: "",
      //songName: "",
      //comments: "",
      //likes: "",
      //shares: "",
      published: false,

      submitted: false,
      file: "",
      name: "",
      fileurl: "",
      redirect: null,
      userReady: false,
      currentUser: { username: "" }

    };
    
  }

  /* storage */
  

  onChangeChannel(e) {
    this.setState({
      channel: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  /**onChangeSongname(e) {
    this.setState({
      songName: e.target.value,
    });
  }**/

  /**onChangeComments(e) {
    this.setState({
      comments: e.target.value,
    });
  }**/

  /**onChangeLikes(e) {
    this.setState({
      likes: e.target.value,
    });
  }**/

  /**onChangeShares(e) {
    this.setState({
      shares: e.target.value,
    });
  }**/

  saveTutorial() {
    let data = {
      channel: this.state.channel,
      description: this.state.description,
      //songName: this.state.songName,
      //comments: this.state.comments,
      //likes: this.state.likes,
      //shares: this.state.shares,
      published: false,
      fileurl: this.state.fileurl
    };

    TutorialDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      channel: "",
      description: "",
      //songName: "",
      //comments: "",
      //likes: "",
      //shares: "",
      published: false,

      submitted: false,
    });
  }

  handleChange(e) {
    alert("e: " + e.target.files[0]);
    alert("e: " + e.target.files[0].name);

    this.setState({
        file: e.target.files[0],
        name: e.target.files[0].name
      });
  }

  handleUpload(e) {
    let myname = this.state.name;
    alert("uploading..." + myname);
    e.preventDefault();
    const uploadTask = storage.ref(`/videos/${this.state.name}`).put(this.state.file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("videos")
        .child(this.state.name)
        .getDownloadURL()
        .then((url) => {
          //this.setFile(null);
          this.setState({fileurl: url});
        });
    });
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (

        
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h4>Upload a Video</h4> 
            <div className="form-group">
              <label htmlFor="channel">Title</label>
              <input
                type="text"
                className="form-control"
                id="channel"
                required
                value={this.state.channel}
                onChange={this.onChangeChannel}
                name="channel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
     
     <div className="App">

      <form onSubmit={this.handleUpload}>
        <input type="file" onChange={this.handleChange} />
        <button >upload</button>
      </form>
      {this.state.fileurl}
      <img src={this.state.fileurl} alt="" />
    </div>
     
      </div>
    );
  }
}

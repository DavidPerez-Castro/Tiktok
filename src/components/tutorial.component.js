import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeChannel = this.onChangeChannel.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        //this.onChangeSongname = this.onChangeSongname.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: {
                id: null,
                channel: "",
                description: "",
                //songName: "",
                published: false,
                fileurl: ""
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { tutorial } = nextProps;
        if (prevState.currentTutorial.id !== tutorial.id) {
            return {
                currentTutorial: tutorial,
                message: ""
            };
        }

        return prevState.currentTutorial;
    }

    componentDidMount() {
        this.setState({
            currentTutorial: this.props.tutorial,
        });
    }

    onChangeChannel(e) {
        const channel = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    channel: channel,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description,
            },
        }));
    }

    onChangeSongname(e) {
        const songName = e.target.value;

        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                songName: songName,
            },
        }));
    }

    updatePublished(status) {
        TutorialDataService.update(this.state.currentTutorial.id, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateTutorial() {
        const data = {
            channel: this.state.currentTutorial.channel,
            description: this.state.currentTutorial.description,
            //songName: this.state.currentTutorial.songName,
        };

        TutorialDataService.update(this.state.currentTutorial.id, data)
            .then(() => {
                this.setState({
                    message: "The tutorial was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteTutorial() {
        TutorialDataService.delete(this.state.currentTutorial.id)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentTutorial } = this.state;
    
        return (
          <div>
            <h4>Tutorial</h4>
            {currentTutorial ? (
              <div className="edit-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="channel">Channel</label>
                    <input
                      type="text"
                      className="form-control"
                      id="channel"
                      value={currentTutorial.channel}
                      onChange={this.onChangeChannel}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentTutorial.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label>Video:</label>
                    {currentTutorial.fileurl}
                    <img src={currentTutorial.fileurl} alt="" />
                  </div>
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>
                </form>
    
                {currentTutorial.published ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(true)}
                  >
                    Publish
                  </button>
                )}
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteTutorial}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateTutorial}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        );
      }

}
import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import Tutorial from "./tutorial.component";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class TutorialsList extends Component {

    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };

        this.unsubscribe = undefined;

    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        this.unsubscribe = TutorialDataService.getAll().orderBy("channel", "asc").onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let tutorials = [];

        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            tutorials.push({
                id: id,
                channel: data.channel,
                description: data.description,
                //songName: data.songName,
                published: data.published,
                fileurl: data.fileurl
            });
        });

        this.setState({
            tutorials: tutorials,
        });
    }

    refreshList() {
        this.setState({
            currentTutorial: null,
            currentIndex: -1,
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,
        });
    }

    render() {
        const { tutorials, currentTutorial, currentIndex } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
    
        return (
          <div className="list row">
            <div className="col-md-6">
              <h4>Video List</h4>
    
              <ul className="list-group">
                {tutorials &&
                  tutorials.map((tutorial, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTutorial(tutorial, index)}
                      key={index}
                    >
                      {tutorial.channel}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentTutorial ? (
                <Tutorial
                  tutorial={currentTutorial}
                  refreshList={this.refreshList}
                />
              ) : (
                <div>
                  <br />
                  <p>Please click on a Video...</p>
                </div>
              )}
            </div>
          </div>
        );
      }

}

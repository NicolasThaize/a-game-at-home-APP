import React from "react";
import Session from "./Session";

class HomeSessions extends React.Component {
  state = {
    sessions: [
      {
        id: 1,
        name: "Nom 1",
        description: "Ceci est une description de bg",
        start_date: new Date(),
        end_date: new Date()
      },
      {
        id: 2,
        name: "Nom 2",
        description: "Ceci est une description de bg hahahaha",
        start_date: new Date(),
        end_date: new Date()
      },
      {
        id: 3,
        name: "Nom 3",
        description: "Ceci est une description de bg ouais",
        start_date: new Date(),
        end_date: new Date()
      }
    ]
  }
  render() {
    const { sessions } = this.state;
    return(
      <div className="columns sessionsWidth">
        { sessions.map(session => (
          <Session session={session} key={session.id}/>
        ))}
      </div>
    )
  }
}

export default HomeSessions;

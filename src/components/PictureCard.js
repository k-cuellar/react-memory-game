import React from "react";

const PictureCard = props => (
  <div className="col-md-3">
    <div className="card" onClick={()=> props.removeFriend(props.id)}>
      <div className="card-img memory">
        <img className="img-fluid" alt={props.name} src={props.image} />
      </div>
    </div>
  </div>
);

export default PictureCard;
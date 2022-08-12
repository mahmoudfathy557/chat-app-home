import React, { useEffect, useRef } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const renderTooltip = (user) => { 
   
  return(
 
  <Tooltip id="button-tooltip"    >
    {user.name}
  </Tooltip>
)};

const OverlayTooltip = ({ children,user }) => {

  
 
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(user)}
  
    >
      {children}
    </OverlayTrigger>
  );
};

export default OverlayTooltip;

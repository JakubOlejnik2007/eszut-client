import {register} from "../../utils/push-notifications/push";

export const About = () => {

  const handleClick = () => {
    register();
  }

  return (
    <div className='page'>
      <button onClick={handleClick}>asyhda</button>
      <h2>About sadpage</h2>
      <p>This is the text for the about page</p>
    </div>
  );
};

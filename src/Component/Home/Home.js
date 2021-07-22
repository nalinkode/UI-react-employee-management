import './Home.css'
import ems from '../../assets/EMS.png';


function Home() {
    return (
      <div className="container"> 
      
        <img className="img-fluid" src={ems}></img>       

        {/* <p>The project covers :</p>
        <ul>
          <li> Add the employee</li>
          <li> Edit the employee</li>
          <li> Delete the employee</li>
          <li> Support mobile view</li>
        </ul> */}
      </div>
    );
  }
  
  export default Home;
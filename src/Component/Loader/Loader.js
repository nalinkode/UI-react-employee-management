import React from 'react';
import './loader.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import spinner from '../../assets/spinner-loader-animation.gif';

class LoaderComponent extends React.Component {

    render() {
        return(
        <div style={{position:'absolute', top:'40%',left:'45%'}}>
          <img style={{width: '140px', objectFit: 'scale-down',  position:'absolute',opacity:'0.95', 
          align: 'middle' }} 
          src= {spinner}/>
        </div>
        )
       }
}


export default LoaderComponent;
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

  //Helper Method
  renderContent(){
    switch (this.props.auth){
      case null:
        return;
      case false:
        return(
          <li><a href='/auth/google'>Login with Google</a></li>
        );
      default:
        let tempcredit = this.props.auth.credits;//code not working
        if(tempcredit===undefined){
          tempcredit = 0;
        }
        //console.log(tempcredit);
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{ margin:'0 10px' }}>
            credits:{tempcredit}
          </li>,
          <li key="3"><a href="/api/logout">logout</a></li>
        ]
    }
  }

    render() {
        return (
          <nav>
            <div className="nav-wrapper">
                <Link
                to={this.props.auth ? './surveys' : '/'}
                className="left brand-logo"
                >
                  WiseCrack
                </Link>
                <ul className="right">
                  {this.renderContent()}
                </ul>
            </div>
          </nav>
        );
    }
}

/*function mapStateToProps({auth}){
return { auth };
}*/

function mapStateToProps(state) {
  //console.log(state.auth);
  return{ auth:state.auth }
}

export default connect(mapStateToProps)(Header);

import React,{ Component } from 'react';
import { connect } from 'react-redux';

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
        return <li><a href="/api/logout">logout</a></li>;
    }
  }

    render() {
        return (
          <nav>
            <div className="nav-wrapper">
                <a className="left brand-logo">
                    WiseCrack
                </a>
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
  return{ auth:state.auth }
}

export default connect(mapStateToProps)(Header);

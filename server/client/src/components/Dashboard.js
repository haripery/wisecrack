import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn btn-floating btn-large pulse red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

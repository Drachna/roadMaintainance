import './App.css';
import Complaint from './components/Complaints/UserComplaints/UserComplaintForm'
import Home from './components/Layouts/LandingPage/Home';
import ProvideUpdate from './components/Complaints/ProvideUpdate/ProvideUpdateContainer'
import {  Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register/Register'
import ShowComplaintsTable from './components/Complaints/ShowComplaints/ShowComplaintsTable'
import ComplainContextProvider from './Contexts/Complains/complainsContext'
import AuthContextProvider from './Contexts/Authentication/AuthContext'
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ComplainContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/viewComplains" component={ShowComplaintsTable}></Route>
              <Route path="/lodgeComplain" component={Complaint}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/getComplain" component={ProvideUpdate}></Route>
            </Switch>
          </Router>
        </ComplainContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

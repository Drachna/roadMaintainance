import './App.css';

// import ShowComplains from './components/ShowComplains'
import Complaint from './components/Complaints/UserComplaints/UserComplaintForm'
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import ProvideUpdate from './components/Complaints/ProvideUpdate/ProvideUpdateContainer'
import Map from './components/Complaints/UserComplaints/map'
// import ShowComplainsTable from './components/Complaints/ShowComplaints/ShowsTable'
import ProgressChart from './components/Stats/ProgressChart'
import Upvote from './components/Complaints/Upvote/Upvote'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './components/Register/Register'
import Expt from './components/Complaints/ShowComplaints/ShowComplaintsTable'
import ComplainContextProvider from './Contexts/Complains/complainsContext'
import ComplainHistory from './components/Complaints/ShowComplaints/ShowComplaintHistory'
import AuthContextProvider from './Contexts/Authentication/AuthContext'
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <ComplainContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>     
            <Route path="/viewComplains" component={Expt}></Route>
            <Route path="/lodgeComplain" component={Complaint}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/getComplain" component={ProvideUpdate}></Route>
          </Switch>
        </BrowserRouter>
      </ComplainContextProvider>
      </AuthContextProvider>

        {/* <Route path="/login" component={Login} /> */}
{/* 
      <AuthContextProvider>
        <Login/>
      </AuthContextProvider> */}
      {/* <ComplainHistory/> */}

      {/* <Register></Register> */}
      {/* <ShowComplainsTable />  */}
      {/* <Upvote/> */}
      {/* <Home/> */}
      {/* <Complaint/> */}
      {/* <ProvideUpdate/> */}
      {/* <Map/> */}
      {/* <ShowComplains/> */}
      {/* <ComplainContextProvider>
        <Complaint/>
      </ComplainContextProvider> */}
      {/* </ComplainContextProvider> */}
       {/* <ProgressChart status={{
      x: ["Pending", "Level-1", "Level-2", "Completed"],
      y: [12, 5, 3, 8],
     }}/> */}

     
    </div>
  );
}

export default App;

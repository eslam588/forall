import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/layout/Layout';
import SignIn from './Components/SignIn/SignIn';
import './styles/signin.css';
import './styles/home.css';
import './styles/contractors.css';
import './styles/Teams.css';
import './styles/profile.css';
import Home from './Components/Home/Home';
import { SignStore } from './Store/signInData/SigninStore';
import { HomeAllData } from './Store/HomeData/HomeData';
import Contractors from './Components/contractors/Contractors';
import { ContractorsData } from './Store/ContractorsData/ContractorsData';
import SingleContractor from './Components/singleContractor/SingleContractor';
import GenralManger from './Components/Teams/GeneralManger/GenralManger';
import { TeamsData } from './Store/Teams/Teams';
import MarketingMangers from './Components/Teams/MarketingMangers/MarketingMangers';
import TeamLeaders from './Components/Teams/TeamLeaders/TeamLeaders';
import SuperVisors from './Components/Teams/SuperVisours/SuperVisors';
import Agents from './Components/Teams/Agents/Agents';
import UserView from './Components/UserView/UserView';
import Profile from './Components/Profile/Profile';
import { ProfileData } from './Store/ProfileData/profileData';
import AgencyView from './Components/Agencies/AgencyView';


function App() {
  return (
    <>
     <SignStore>
        <HomeAllData>
          <ContractorsData>
            <TeamsData>
              <ProfileData>
                <Routes>
                  <Route path='/' element={<SignIn />} />
                  <Route path='home' element={<Layout />} >
                    <Route path='dashboard' element={<Home />} />
                    <Route path='contractors' element={<Contractors />} />
                    <Route path='contractor/:id' element={<SingleContractor />} />
                    <Route path='GM' element={<GenralManger />} />
                    <Route path='userView/:id/:type' element={<UserView />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='Agency/:id/:type' element={<AgencyView />} />
                  </Route>
                  <Route path='*' element={<SignIn />} />
                </Routes>
              </ProfileData>
            </TeamsData>
          </ContractorsData>
        </HomeAllData> 
    </SignStore>
    <Toaster position='top-center' />
    </>
  );
}

export default App;

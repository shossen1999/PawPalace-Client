import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from './../Layout/Main';
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Login from "../pages/Authentication/Login/Login";
import Dashboard from './../Layout/Dashboard';
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import PetListing from "../pages/PetListing/PetListing";
import PetDetails from "../pages/PetListing/Components/PetDetails";
import MyAddedPet from "../pages/Dashboard/AddPet/MyAddedPet/MyAddedPet";
import UpdatePet from './../pages/Dashboard/UpdatePet/UpdatePet';
import AdoptionRequest from "../pages/Dashboard/AdoptionRequest/AdoptionRequest";
import Users from "../pages/Dashboard/Users/Users";
import CreateDonationCampaign from "../pages/Dashboard/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "../pages/Dashboard/MyDonationCampaigns/MyDonationCampaigns";
import UpdateCampaign from "../pages/Dashboard/UpdateCampaign/UpdateCampaign";
import DonationCampaign from "../pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../pages/DonationCampaign/Components/DonationDetails";
import AllDonations from "../pages/Dashboard/AllDonations/AllDonations";
import AllPets from "../pages/Dashboard/AllPets/AllPets";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import SendEmailForm from "../components/SendEmailForm";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element:<Home></Home>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path: "/pet-listing",
          element: <PetListing></PetListing>
        },
        {
          path: "/petDetails/:id",
          element: <PetDetails></PetDetails>,
          loader: ({ params }) => fetch(`http://localhost:5000//pet/${params.id}`)
        },
        {
          path: "/donation-campaign",
          element:<DonationCampaign></DonationCampaign>
        },
        {
          path: "/donationDetails/:id",
          element: <DonationDetails></DonationDetails>,
          loader: ({ params }) => fetch(`http://localhost:5000//donation-camp/${params.id}`)
        },
       {
        path:"/send-email",
        element:<SendEmailForm></SendEmailForm>
       }

      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
          // all routes
      {
        path: 'addPet',
        element: <AddPet></AddPet>
      },
      
      {
        path: 'myPets',
        element:<MyAddedPet></MyAddedPet>
      },
      {
        path: 'updatePet/:id',
        element:<UpdatePet></UpdatePet>,
        loader: ({ params }) => fetch(`http://localhost:5000//pet/${params.id}`)
      },
      
      {
        path: 'adoptionRequests',
        element: <AdoptionRequest></AdoptionRequest>
      },
      {
        path: 'createCampaign',
        element: <CreateDonationCampaign></CreateDonationCampaign>
      },
      {
        path: 'myDonationCampaigns',
        element: <MyDonationCampaigns></MyDonationCampaigns>
      },
      {
        path: 'updateCampaign/:id',
        element: <UpdateCampaign></UpdateCampaign>,
        loader: ({ params }) => fetch(`http://localhost:5000//donation-camp/${params.id}`)
      },

      //Admin routes
      {
        path: 'users',
        element:<AdminRoutes><Users></Users></AdminRoutes>
      },
      
     
      {
        path: 'allDonations',
        element: <AdminRoutes><AllDonations></AllDonations></AdminRoutes>
      }
      ,
      {
        path: 'allPets',
        element: <AdminRoutes><AllPets></AllPets></AdminRoutes>
      },
      ]
    }
  ]);

  export default router;
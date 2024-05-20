import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import SessionMaster from "../SessionManager";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "../components/loading";
import { useRouter } from "next/router";
import { set } from "zod";
import Image from "next/image";

const ProfileList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const router = useRouter();

  // if(!Cookies.get('userEmail')){
  //   router.push('/login')
  // }else{
  //   setEmail(Cookies.get('userEmail'))

  // }

  const handleProfileClick = (profileId, itemName) => {
    SessionMaster.set("profileId", profileId);
    SessionMaster.set("profileName", itemName);
    Cookies.set('profileId', profileId);
    Cookies.set('profileName', itemName);


    router.push("/");
  };

  const handleLogout = () => {
    SessionMaster.set("profileId", '');
    SessionMaster.set("userEmail", '');
    SessionMaster.set("profileName", '');
    Cookies.remove('profileId');
    Cookies.remove('userEmail');
    Cookies.remove('profileName');
    router.push('/login')

  }
  


  useEffect(() => {

    
    const email = Cookies.get('userEmail');
    // Function to fetch inventory data
    const fetchProfiles = async () => {
      if (!email) {
        setError("No email provided.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/get-profiles?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const data = await response.json();
        
        setItems(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []); // Empty dependency array to run the effect only once

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (error) return (<>
   
              <div className="card">
              <div className="card-header border-0 pb-0">
                  

                  <h4 className="mb-2 card-title">Select your profile</h4>
                 
             
              <div className="d-block justify-content-end">
                  <button onClick={handleLogout} className="btn justify-content-end btn-danger btn-sm text-uppercase">Logout</button></div>
                </div>
                <div className="card-body">
                  

                      <div className="user-bx">
                        <div>
                          <h6 className="user-name">No Profiles Found</h6>
                        </div>
                      </div>

           

                  <div className="format-slider"></div>
                </div>
                <div className="card-footer border-0 pt-0">
                  <Link
                    href="/create-profile"
                    className="btn btn-primary border-dark d-block btn-lg text-uppercase"
                  >
                    Add Profile
                  </Link>
                </div>
              </div>
      
  



  </>);

  return (
    <>
   



              <div className="card border  border-dark">
                <div className="card-header border-0 pb-0">
                  

                    <h4 className="mb-2 card-title">Select your profile</h4>
                  
               
                <div className="d-block justify-content-end">
                    <button onClick={handleLogout} className="btn border-dark justify-content-end btn-danger btn-sm text-uppercase">Logout</button></div>
                  </div>
                <div className="card-body">
                  {items.length > 0 ? (
                    items.map((item, index) => {
                      return (
                        <div key={item.key} className="w-100 border-dark-subtle col-sm-6 mb-4">
                          <div
                            className="user-bx w-100"
                            onClick={() =>
                              handleProfileClick(item.profileId, item.name)
                            }
                          >
                            <Image src="/images/profile/small/pic1.png" alt="" height="25"  width="25" />
                            <div>
                              <h6 className="user-name">{item.name}</h6>
                              <span className="meta">ID: {item.profileId}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-sm-6 mb-4">
                      <div className="user-bx">
                        <div>
                          <h6 className="user-name">No Profiles Found</h6>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="format-slider"></div>
                </div>
                <div className="card-footer border-0 pt-0">
                <Link
                    href="/create-profile"
                    className="btn border-dark d-block btn-lg text-uppercase"
                  >
                    Add Profile
                  </Link>
                </div>
              </div>
      
      </>

  );
};

export default ProfileList;

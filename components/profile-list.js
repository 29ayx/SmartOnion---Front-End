import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import SessionMaster from "../SessionManager";
import Link from "next/link";

import Loading from "../components/loading";
import { useRouter } from "next/router";

const ProfileList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleProfileClick = (profileId, itemName) => {
    SessionMaster.set("profileId", profileId);
    SessionMaster.set("profileName", itemName);

    router.push("/");
  };

  const handleLogout = () => {
    SessionMaster.set("profileId", '');
    SessionMaster.set("userEmail", '');
    router.push('/login')

  }

  useEffect(() => {
    const email = SessionMaster.get("userEmail");
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
   <div className="container-fluid pl-4 pr-4">
        <div className="row">
          <div className="col-xl-7  col-xxl-12 col-md-7">
            <div className="row">
              <div className="card">
              <div className="card-header border-0 pb-0">
                  

                  <h4 className="mb-2 card-title">Select your profile</h4>
                 
             
              <div className="d-block justify-content-end">
                  <button onClick={handleLogout} className="btn justify-content-end btn-danger btn-sm text-uppercase">Logout</button></div>
                </div>
                <div className="card-body">
                  
                    <div className="col-sm-6 mb-4">
                      <div className="user-bx">
                        <div>
                          <h6 className="user-name">No Profiles Found</h6>
                        </div>
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
            </div>
          </div>
        </div>
      </div>
  



  </>);

  return (
    <>
   


<div className="container-fluid">
        <div className="row ">
          <div className="col-xl-7  col-xxl-12 col-md-7">
            <div className="row">
              <div className="card border border-dark">
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
                            <img src="/images/profile/small/pic1.jpg" alt="" />
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
            </div>
          </div>
        </div>
      </div>
      </>

  );
};

export default ProfileList;

import React, { useState } from "react";
import { searchInstructor } from "../../api/instructor";
import { useNotification  , useSearch} from "../../hooks";
import { renderItem } from "../../utils/helper";
import LiveSearch from "../LiveSearch";


const defaultTeamInfo = {
  profile: {},
  leadInstructor: false,
};
export default function TeamForm({ onSubmit }) {
  const [teamInfo, setTeamInfo] = useState({ ...defaultTeamInfo });
  const [profiles, setProfiles] = useState([]);
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch } = useSearch();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadInstructor")
      return setTeamInfo({ ...teamInfo, leadInstructor: checked });

    setTeamInfo({ ...teamInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setTeamInfo({ ...teamInfo, profile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { profile } = teamInfo;
    
    if (!profile.name)
      return updateNotification("error", "Team profile is missing!");

    onSubmit(teamInfo);
    setTeamInfo({ ...defaultTeamInfo, profile: { name: "" } });
    resetSearch();
    setProfiles([]);
  };




  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = teamInfo;
    profile.name = value;
    setTeamInfo({ ...teamInfo, ...profile });
    handleSearch(searchInstructor, value, setProfiles);
  };


  const { leadInstructor, profile } = teamInfo;
  return (
    <div className="flex items-center space-x-2">
  
  <LiveSearch
        placeholder="Search profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange= {handleProfileChange}
      />

      <input
     
        type="checkbox"
        name="leadInstructor"
        className="w-4 h-4"
        checked={leadInstructor}
        onChange={handleOnChange}
        title="Set as lead Instructor"
      />
      
   
     
  
      <button
      type="button "
        onClick={handleSubmit}
        className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
      >
        Add
      </button>
    </div>
  );
}

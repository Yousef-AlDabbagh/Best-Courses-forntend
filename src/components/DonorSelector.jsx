import React, { useState } from "react";
import { searchInstructor } from "../api/instructor";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
import Label from "./Label";
import LiveSearch from "./LiveSearch";

export default function DonorSelector({ onSelect }) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchInstructor, value, setProfiles);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <div>
      <Label htmlFor="donor">Donor</Label>
      <LiveSearch
        name="donor"
        value={value}
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
      />
    </div>
  );
}

//  user should seperate tha tags with comma 


import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TagsInput({ name, value, onChange }) {

  const [tag, setTag] = useState("");

  // an array to store the tags that we want to render inside the form 
  const [tags, setTags] = useState([]);

  const input = useRef();
  const tagsInput = useRef();

// handle on change without comma  
  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);

    onChange(tags);
  };


// handle key down only if the user type comma or enter 
  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;


      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      //reset input field 
      setTag("");
    }
// handle back space 
    if (key === "Backspace" && !tag && tags.length) {
        //filter out the last tag and remove it with backspace 
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };
 // remove tags  when clicking on it 
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };


  // styling input field when focus 
  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };

  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove("dark:border-white", "border-primary");
  };

  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  useEffect(() => {
    // launch callback whenever tags changes
    input.current?.scrollIntoView(false);
  }, [tag]);

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        //overflow-x-auto to stop the overflow 
        // we will have scroll bar instead of overflow 
        className="border-2 bg-transparent dark:border-dark-subtle
         border-light-subtle px-2 h-10 rounded w-full
          text-white flex items-center space-x-2 overflow-x-auto
           custom-scroll-bar transition"
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={input}
          type="text"
          id={name}
          className="h-full flex-grow bg-transparent outline-none dark:text-white text-primary"
          placeholder="Tag one, Tag two"
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
}

const Tag = ({ children, onClick }) => {
  return (
    // Whitespace-nowrap = it will make the tag in single line 
    <span className="dark:bg-white bg-primary dark:text-primary text-white
     flex items-center text-sm px-1 whitespace-nowrap">
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};

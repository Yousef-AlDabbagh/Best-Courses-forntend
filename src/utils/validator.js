export const validateCourse = (courseInfo) => {
    const {
        title,
        overView,
        releseDate,
        team,
        tags,
        genres,
        type,
        language,
        status,
      } = courseInfo;
  
    if (!title.trim()) return { error: "Title is missing!" };
    if (!overView.trim()) return { error: "Over View is missing!" };
    if (!language.trim()) return { error: "Language is missing!" };
    if (!releseDate.trim()) return { error: "Relese date is missing!" };
    if (!status.trim()) return { error: "Status is missing!" };
    if (!type.trim()) return { error: "Type is missing!" };
  
    // validation for genres we are checking if genres is an array or not
    if (!genres.length) return { error: "Genres are missing!" };
    // we are checking genres needs to field with string value
    for (let gen of genres) {
      if (!gen.trim()) return { error: "Invalid genres!" };
    }
  
    // validation for tags we are checking if tags is an array or not
    if (!tags.length) return { error: "Tags are missing!" };
    // we are checking tags needs to field with string value
    for (let tag of tags) {
      if (!tag.trim()) return { error: "Invalid tags!" };
    }
  
    // validation for team we are checking if  an array or not
    if (!team.length) return { error: "Team is missing!" };
    // we are checking tags needs to field with string value
    for (let t of team) {
      if (typeof t !== "object") return { error: "Invalid team!" };
    }
  
    return { error: null };
  };
  
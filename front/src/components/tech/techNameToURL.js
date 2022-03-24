//기술 명에 따른 아이콘 url 파싱
const techNameToURL = (techName) => {
  //소문자 변환
  //공백제거.
  //objective-c >> objectivec
  //csharp 예외처리
  //c# > csharp 등등 계속 업데이트.

  if (!techName) return "";
  else {
    let newName = techName.toLowerCase().replace(/(\s*)/g, "");

    if (newName === "c#" || newName === "csharp") {
      newName = "csharp";
    } else if (newName === "c++") {
      newName = "cplusplus";
    } else if (newName === "js") {
      newName = "javascript";
    } else if (newName === "mui") {
      newName = "materialui";
    } else if (newName === "awc") {
      newName = "amazonwebservices";
    } else if (newName === "visualstudiocode" || newName === "visualstudio") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg";
    } else if (newName === "objective-c") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg";
    }

    const urlStr = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${newName}/${newName}-original.svg`;

    return urlStr;
  }
};

export default techNameToURL;
